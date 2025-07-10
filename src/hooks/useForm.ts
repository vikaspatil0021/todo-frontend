import { useState } from "react";

type DefaultValues = {
    name?: string,
    email: string,
    password: string;
}

type FieldValues = keyof DefaultValues;

type FieldValidators = {
    [K in keyof DefaultValues]: (val: string) => string | boolean;
};

type Errors = {
    [K in keyof DefaultValues]: string | null;
};


export default function useForm(defaultValues: DefaultValues, validators: FieldValidators) {

    const [values, setValues] = useState<DefaultValues>(defaultValues);
    const [errors, setErrors] = useState<Errors>(
        Object.keys(defaultValues).reduce((acc, key) => {
            acc[key as keyof DefaultValues] = null;
            return acc;
        }, {} as Errors)
    );

    const validateField = (field: FieldValues, value: string) => {
        const validator = validators[field];

        const result = validator!(value);
        setErrors((prev) => ({
            ...prev,
            [field]: typeof result === "string" ? result : null,
        }));

        return result;
    };


    const handleChange = (field: FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleBlur = (field: FieldValues) => (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        validateField(field, value);
    };

    const handleSubmit = (fn: (args: DefaultValues) => void) => (E: React.FormEvent<HTMLFormElement>) => {
        E.preventDefault();

        let hasError = false;

        Object.keys(validators).forEach((key) => {
            const error_msg = validateField(key as FieldValues, values[key as FieldValues] as string);
            
            if (typeof error_msg == "string") hasError = true;
        });

        if (!hasError) {
            fn(values);
            return;
        }

    }


    const register = (field: FieldValues) => ({
        name: field,
        value: values[field],
        onChange: handleChange(field),
        onBlur: handleBlur(field),
    });


    return {
        register,
        errors,
        handleSubmit
    }
}