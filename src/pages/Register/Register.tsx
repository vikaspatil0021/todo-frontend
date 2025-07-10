import "./../common.css"

import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import API from "../../config/axios";

const validation = {
    name(val: string) {
        if (val?.length === 0) return "Name is required";
        if (val?.length < 3) return "Min 3 characters";
        return true
    },
    email(val: string) {
        if (!val || val.trim().length === 0) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return "Please enter a valid email address";
        return true;
    },

    password(val: string) {
        if (!val || val.trim().length === 0) return "Password is required";
        if (val.length < 8) return "Password must be at least 8 characters long";
        if (!/[A-Z]/.test(val)) return "Password must include at least one uppercase letter";
        if (!/[a-z]/.test(val)) return "Password must include at least one lowercase letter";
        if (!/[0-9]/.test(val)) return "Password must include at least one number";
        if (!/[@$!%*?&#]/.test(val)) return "Password must include at least one special character";
        return true;
    }
}

export default function Register() {
    // custom form handler hook
    const { register, errors, handleSubmit } = useForm({
        name: "",
        email: "",
        password: ''
    }, validation);

    const onSubmitHandler = (values: { name?: string, email: string, password: string }) => {

        API.post('/api/auth/register', values)
            .then((res) => {
                console.log(res.data);
                window.location.pathname = "/board"
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <>
            <div className="form-container">
                <div className="form-box">
                    <h2 className="form-title">Register your account</h2>
                    <p className="form-subtitle">Enter your email below to register your account</p>

                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div>
                            <label className="form-label">Name</label>
                            <input type="text" {...register("name")} className="form-input" placeholder="user" />
                            {errors.name &&
                                <div className="form-error">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="form-label">Email</label>
                            <input type="email"  {...register("email")} className="form-input" placeholder="user@gmail.com" />
                            {errors.email &&
                                <div className="form-error">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input type="password"  {...register("password")} className="form-input" placeholder="*****" />
                            {errors.password &&
                                <div className="form-error">{errors.password}</div>}

                        </div>

                        <button className="form-btn">Register</button>
                    </form>

                    <p className="form-text">
                        Already have an account?
                        <Link to="/login" className="form-link">Login</Link>
                    </p>
                </div>

            </div>
        </>
    );
}