import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ExIcon from "../icons/ExIcon";
import PlusIcon from "../icons/PlusIcon";
export default function StepInputs({ id, text, row, isOnlyRow, onItemAdd, onItemRemove, onValueChange }) {
    return (_jsx("li", { children: _jsxs("div", { className: "step-wrapper", children: [_jsx("textarea", { name: "step", placeholder: "Step instructions", value: text, onChange: (e) => onValueChange(row, "step", e.target.value) }), _jsx("button", { className: "add-row-btn", type: "button", onClick: () => onItemAdd(row), children: _jsx(PlusIcon, {}) }), _jsx("button", { className: isOnlyRow ? "remove-row-btn invisible" : "remove-row-btn", type: "button", onClick: () => { isOnlyRow ? null : onItemRemove(row); }, children: _jsx(ExIcon, {}) })] }) }, id));
}
//# sourceMappingURL=StepInputs.js.map