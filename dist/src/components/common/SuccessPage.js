import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/success-page.css";
export default function SuccessPage({ title, message, heroImage = "", actionBtnText, onActionBtnSubmit }) {
    return (_jsxs("div", { id: "success-page", children: [_jsx("h1", { children: title }), _jsx("img", { id: "success-page__hero", src: heroImage }), _jsx("p", { children: message }), _jsx("div", { id: "success-page__footer", children: _jsx("button", { type: "button", onClick: onActionBtnSubmit, children: actionBtnText }) })] }));
}
//# sourceMappingURL=SuccessPage.js.map