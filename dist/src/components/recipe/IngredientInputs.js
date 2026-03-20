import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Selector from "../common/Selector";
import units from "../../units";
import PlusIcon from "../icons/PlusIcon";
import ExIcon from "../icons/ExIcon";
export default function IngredientInputs({ name, quantity, unit, type, row, isOnlyRow, onItemAdd, onItemRemove, onValueChange }) {
    const unitSelectorAttrs = {
        placeholder: "Select unit"
    };
    return (_jsxs("div", { className: "ingredient", children: [_jsxs("label", { className: "labeled-input name-label", children: [_jsx("span", { children: "Name:" }), _jsx("input", { name: `${type}-name`, className: "ingredient-name", placeholder: "Name", type: "text", value: name, onChange: (e) => onValueChange(row, "name", e.target.value), autoComplete: "off" })] }), _jsxs("label", { className: "labeled-input", children: [_jsx("span", { children: "Quantity:" }), _jsx("input", { name: `${type}-quantity`, className: "ingredient-quantity", placeholder: "Quantity", type: "number", value: quantity, onChange: (e) => onValueChange(row, "quantity", e.target.value), autoComplete: "off" })] }), _jsxs("label", { className: "labeled-input", children: [_jsx("span", { children: "Unit:" }), _jsx(Selector, { items: units, attributes: unitSelectorAttrs, name: `${type}-unit`, value: unit, onChange: (value) => onValueChange(row, "unit", value) })] }), _jsx("button", { className: "add-row-btn", type: "button", onClick: () => onItemAdd(row), children: _jsx(PlusIcon, {}) }), _jsx("button", { className: isOnlyRow ? "remove-row-btn invisible" : "remove-row-btn", type: "button", onClick: () => { isOnlyRow ? null : onItemRemove(row); }, children: _jsx(ExIcon, {}) })] }, row));
}
//# sourceMappingURL=IngredientInputs.js.map