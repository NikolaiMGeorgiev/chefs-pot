import "../styles/forms.css";
import "../styles/log-in-register.css"

import { useNavigate } from "react-router-dom";
import { getSinglePasswordError } from "../helpers/validation";
import ValidatedForm from "./common/ValidatedForm";
import InputError from "./recipe/InputError";
import InputWithLabel from "./common/InputWithLabel";

export default function RegisterForm() {
    const data = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    };
    const navigator = useNavigate();

    return (
        <div className="centered-page__wrapper">
            <div id="register-container" className="form-container ">
                <h1>Register</h1>
                <ValidatedForm
                    formId="register-form"
                    className="centered-form"
                    initialData={data}
                    handleResponse={() => navigator("/register/success")}
                    Component={Register}
                />
                <p className="text-link__container">
                    Have a registereration? Log in <span className="text-link" onClick={() => navigator("/login")}>here</span>.
                </p>
            </div>
        </div>
        
    )
}

function Register({ data, errors, onValueChange }) {
    return (
        <>
            <InputWithLabel 
                name="firstName"
                value={data.firstName}
                labelText="First Name"
                errorText={errors.firstName}
                onValueChange={onValueChange}
            />
            <InputWithLabel 
                name="lastName"
                value={data.lastName}
                labelText="Last Name"
                errorText={errors.lastName}
                onValueChange={onValueChange}
            />
            <InputWithLabel 
                name="username"
                value={data.username}
                labelText="Username"
                errorText={errors.username}
                onValueChange={onValueChange}
            />
            <InputWithLabel 
                name="email"
                type="email"
                value={data.email}
                labelText="Email"
                errorText={errors.email}
                onValueChange={onValueChange}
            />
            <InputWithLabel 
                name="password"
                type="password"
                value={data.password}
                labelText="Password"
                errorText={getSinglePasswordError(errors.password)}
                onValueChange={onValueChange}
            />
            <button type="submit" className="button">Register</button>
        </>
    )
}