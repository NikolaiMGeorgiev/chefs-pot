import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/quantity-selector.css";
export default function QuantitySelector({ portions, onPortionChange }) {
    const quantities = [2, 3, 4, 6, 8];
    return (_jsxs("div", { id: "quantity-selector", children: [_jsx("span", { id: "quantity-selector__text", children: "Portions:" }), _jsx("div", { id: "quantity-selector__container", children: quantities.map(quantity => _jsxs("button", { className: portions == quantity ? "button qunatity-btn selected" : "button qunatity-btn", onClick: () => onPortionChange(quantity), type: "button", children: ["x", quantity] })) })] }));
}
//# sourceMappingURL=QuantitySelector.js.map