import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import SuccessPage from "./common/SuccessPage";
export default function RegisterSuccessPage({ onActionBtnSubmit }) {
    const navigator = useNavigate();
    return (_jsx(SuccessPage, { title: "Welcome", message: "Registration was successful. Log in to your profile to start exploring our inspiring recipes.", heroImage: "/images/success-register-hero.png", actionBtnText: "Log In", onActionBtnSubmit: () => navigator("/login") }));
}
//# sourceMappingURL=RegisterSuccessPage.js.map