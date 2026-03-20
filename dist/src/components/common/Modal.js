import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/modal.css";
export default function Modal({ type, title, message, onCancel, submitText = "OK", onSubmit = (f) => f }) {
    let footer = _jsx(_Fragment, {});
    if (type == "alert") {
        footer = (_jsx("div", { id: "modal__footer", children: _jsx("button", { id: "modal-submit-btn", onClick: onCancel, children: "OK" }) }));
    }
    else if (type == "modal") {
        footer = (_jsxs("div", { id: "modal__footer", children: [_jsx("button", { id: "modal-submit-btn", onClick: onSubmit, children: submitText }), _jsx("button", { id: "modal-cancel-btn", onClick: onCancel, children: "Cancel" })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: "modal__background" }), _jsx("div", { id: "modal", children: _jsxs("div", { id: "modal__container", children: [_jsx("button", { id: "modal__close-btn", onClick: onCancel, children: "X" }), _jsx("h2", { children: title }), _jsx("p", { id: "modal__body", children: message }), footer] }) })] }));
}
//# sourceMappingURL=Modal.js.map