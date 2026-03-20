import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipe-toolbar.css";
export default function RecipeToolbarEdit({ portions, onCancelEdit, onValueChange }) {
    return (_jsxs("div", { id: "ingredients-toolbar", children: [_jsx("div", { children: _jsxs("label", { children: [_jsx("span", { children: "Portions:" }), _jsx("input", { type: "number", name: "portions", id: "ingredients-toolbar__portions", value: portions, onChange: e => onValueChange("portions", e.target.value) })] }) }), _jsxs("div", { children: [_jsx("button", { id: "ingredients-toolbar__modify-btn", className: "button", type: "submit", children: "Save recipe" }), _jsx("button", { id: "ingredients-toolbar__cancel-btn", className: "button", type: "button", onClick: onCancelEdit, children: "Cancel" })] })] }));
}
//# sourceMappingURL=RecipeToolbarEdit.js.map