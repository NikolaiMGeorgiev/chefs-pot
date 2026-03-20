import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../styles/forms.css";
import "../styles/log-in-register.css";
import { useNavigate } from "react-router-dom";
import { getSinglePasswordError } from "../helpers/validation";
import ValidatedForm from "./common/ValidatedForm";
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
    return (_jsx("div", { className: "centered-page__wrapper", children: _jsxs("div", { id: "register-container", className: "form-container ", children: [_jsx("h1", { children: "Register" }), _jsx(ValidatedForm, { formId: "register-form", className: "centered-form", initialData: data, handleResponse: () => navigator("/register/success"), Component: Register }), _jsxs("p", { className: "text-link__container", children: ["Have a registereration? Log in ", _jsx("span", { className: "text-link", onClick: () => navigator("/login"), children: "here" }), "."] })] }) }));
}
function Register({ data, errors, onValueChange }) {
    return (_jsxs(_Fragment, { children: [_jsx(InputWithLabel, { name: "firstName", value: data.firstName, labelText: "First Name", errorText: errors.firstName, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "lastName", value: data.lastName, labelText: "Last Name", errorText: errors.lastName, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "username", value: data.username, labelText: "Username", errorText: errors.username, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "email", type: "email", value: data.email, labelText: "Email", errorText: errors.email, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "password", type: "password", value: data.password, labelText: "Password", errorText: getSinglePasswordError(errors.password), onValueChange: onValueChange }), _jsx("button", { type: "submit", className: "button", children: "Register" })] }));
}
//# sourceMappingURL=Register.js.map