import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function Ingredient({ name, quantity, unit, portionModificator, }) {
    const fixedQuantity = quantity ? (Number.isInteger(quantity * portionModificator) ?
        quantity * portionModificator :
        (quantity * portionModificator).toFixed(1)) : "";
    return (_jsx("li", { className: "ingredient", children: _jsxs("span", { className: "ingredient__text", children: [_jsxs("span", { className: "ingredient__name", children: [name, ": "] }), _jsxs("span", { className: "ingredient__quantity", children: [fixedQuantity, " ", unit != "none" ? unit : ""] })] }) }, name));
}
//# sourceMappingURL=Ingredient.js.map