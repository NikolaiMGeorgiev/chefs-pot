import "../styles/forms.css";
import "../styles/log-in-register.css"

import { useNavigate } from "react-router-dom"
import ValidatedForm from "./common/ValidatedForm";
import { getSinglePasswordError } from "../helpers/validation";
import InputError from "./recipe/InputError";
import InputWithLabel from "./common/InputWithLabel";

export default function LoginForm() {
    const navigator = useNavigate();
    const data = {
        username: "",
        password: ""
    };

    return (
        <div className="centered-page__wrapper">
            <div id="login-container" className="form-container">
                <h1>Log In</h1>
                <ValidatedForm 
                    formId="login-form"
                    initialData={data} 
                    handleResponse={() => navigator("/")} 
                    Component={LogIn}
                />
                <p className="text-link__container">
                    Not registerered? Register <span className="text-link" onClick={() => navigator("/register")}>here</span>.
                </p>
            </div>
        </div>
        
    );
}

function LogIn({ data, errors, onValueChange }) {
    return (
        <>
            <InputWithLabel 
                name="username"
                value={data.usernam}
                labelText="Username"
                errorText={errors.username}
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
            <div className="form-buttons-container">
                <button type="submit" className="button">Log In</button>
            </div>
        </>
    )
}