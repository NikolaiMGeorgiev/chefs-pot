import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../styles/forms.css";
import "../styles/log-in-register.css";
import { useNavigate } from "react-router-dom";
import ValidatedForm from "./common/ValidatedForm";
import { getSinglePasswordError } from "../helpers/validation";
import InputWithLabel from "./common/InputWithLabel";
export default function LoginForm() {
    const navigator = useNavigate();
    const data = {
        username: "",
        password: ""
    };
    return (_jsx("div", { className: "centered-page__wrapper", children: _jsxs("div", { id: "login-container", className: "form-container", children: [_jsx("h1", { children: "Log In" }), _jsx(ValidatedForm, { formId: "login-form", initialData: data, handleResponse: () => navigator("/"), Component: LogIn }), _jsxs("p", { className: "text-link__container", children: ["Not registerered? Register ", _jsx("span", { className: "text-link", onClick: () => navigator("/register"), children: "here" }), "."] })] }) }));
}
function LogIn({ data, errors, onValueChange }) {
    return (_jsxs(_Fragment, { children: [_jsx(InputWithLabel, { name: "username", value: data.usernam, labelText: "Username", errorText: errors.username, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "password", type: "password", value: data.password, labelText: "Password", errorText: getSinglePasswordError(errors.password), onValueChange: onValueChange }), _jsx("div", { className: "form-buttons-container", children: _jsx("button", { type: "submit", className: "button", children: "Log In" }) })] }));
}
//# sourceMappingURL=LogIn.js.map