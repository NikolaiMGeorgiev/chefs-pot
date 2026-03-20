import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import InputError from "../recipe/InputError";
export default function InputWithLabel({ name, id = name, value, type = "text", labelText, errorText, onValueChange, }) {
    return (_jsxs("div", { className: "input-control", children: [_jsxs("label", { children: [_jsxs("span", { children: [labelText, ":"] }), _jsx("input", { type: type, name: name, id: id, value: value, onChange: (e) => onValueChange(name, e.target.value), autoCorrect: "off", autoComplete: "off" })] }), _jsx(InputError, { text: errorText })] }));
}
//# sourceMappingURL=InputWithLabel.js.map