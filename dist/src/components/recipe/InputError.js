import { jsx as _jsx } from "react/jsx-runtime";
export default function InputError({ text, errorInputRef, id = "" }) {
    return (errorInputRef && typeof text == "string" ?
        _jsx("span", { ref: errorInputRef, className: "input-error", children: text }, id) :
        _jsx("span", { className: "input-error", children: text }, id));
}
//# sourceMappingURL=InputError.js.map