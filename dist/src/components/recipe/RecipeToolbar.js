import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipe-toolbar.css";
import QuantitySelector from "./QuantitySelector";
export default function RecipeToolbar({ portions, isOwn, onPortionChange, onEditClick }) {
    return (_jsxs("div", { id: "ingredients-toolbar", children: [_jsx(QuantitySelector, { portions: portions, onPortionChange: onPortionChange }), _jsx("button", { id: "ingredients-toolbar__modify-btn", className: "button", onClick: onEditClick, children: isOwn ? "Edit recipe" : "Modify recipe" })] }));
}
//# sourceMappingURL=RecipeToolbar.js.map