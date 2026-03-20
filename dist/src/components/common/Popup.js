import { jsx as _jsx } from "react/jsx-runtime";
import "../../styles/popup.css";
export default function Popup({ message, setShow }) {
    setTimeout(() => {
        setShow(false);
    }, 4000);
    return (_jsx("div", { className: "popup__wrapper", children: _jsx("div", { className: "popup__container", children: _jsx("p", { className: "popup", children: message }) }) }));
}
//# sourceMappingURL=Popup.js.map