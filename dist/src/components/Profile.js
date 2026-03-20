import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../styles/forms.css";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataLoader } from "./common/DataLoader";
import { HOST, HSOT_PORT } from "../../config";
import ValidatedForm from "./common/ValidatedForm";
import InputWithLabel from "./common/InputWithLabel";
export default function ProfileLoader() {
    const [data, setData] = useState({});
    return (_jsx(DataLoader, { setData: setData, url: `${HOST}:${HSOT_PORT}/api/profile`, children: _jsx("div", { id: "profile-form__container", className: "centered-page__wrapper", children: _jsx("div", { className: "form-container", children: _jsx(ValidatedForm, { formId: "profile-form", initialData: data, handleResponse: (f) => f, Component: Profile }) }) }) }));
}
function Profile({ data, errors, onValueChange }) {
    const navigator = useNavigate();
    if (!data) {
        navigator("/login");
    }
    const handleLogout = () => {
        fetch(`${HOST}:${HSOT_PORT}/logout`, {
            method: "POST",
        })
            .then(response => {
            if (!response.ok) {
                throw new Error("Unsuccessful logout.");
            }
            navigator("/login");
        })
            .catch(error => {
            console.error(error);
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Profile" }), _jsxs("div", { id: "profile-form__data-container", children: [_jsxs("div", { id: "profile-form__image-container", children: [_jsx("img", { id: "profile-img", src: "/images/avatar.png" }), _jsx("button", { id: "avatar-btn", type: "button", className: "button", children: "Change avatar" })] }), _jsxs("div", { id: "profile-form__input-container", children: [_jsx(InputWithLabel, { name: "username", value: data.username, labelText: "Username", errorText: errors.username, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "email", type: "email", value: data.email, labelText: "Email", errorText: errors.email, onValueChange: onValueChange })] })] }), _jsxs("div", { className: "form-buttons-container", children: [_jsx("button", { className: "button", type: "submit", children: "Save Changes" }), _jsx("button", { id: "logout-btn", className: "button", onClick: handleLogout, type: "button", children: "Log Out" })] })] }));
}
//# sourceMappingURL=Profile.js.map