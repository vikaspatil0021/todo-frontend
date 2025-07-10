import "./../common.css"

import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import API from "../../config/axios";

const validation = {
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

export default function Login() {

    // custom form handler hook
    const { register, errors, handleSubmit } = useForm({
        email: "",
        password: ''
    }, validation);

    const onSubmitHandler = (values: { email: string, password: string }) => {
        
        API.post('/api/auth/login', values)
            .then((res) => {
                console.log(res.data)
                window.location.pathname = "/board"
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <>
            <div className="form-container">
                <div className="form-box">
                    <h2 className="form-title">Login to your account</h2>
                    <p className="form-subtitle">Enter your email below to login to your account</p>

                    <form onSubmit={handleSubmit(onSubmitHandler)}>

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

                        <button className="form-btn">login</button>
                    </form>

                    <p className="form-text">
                        Don't have an account?
                        <Link to="/register" className="form-link">Register</Link>
                    </p>
                </div>

            </div>
        </>
    );
}