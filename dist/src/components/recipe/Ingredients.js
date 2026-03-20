import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/ingredients-list.css";
import Ingredient from "./Ingredient";
export default function Ingredients({ ingredients, spices, portionModificator }) {
    return (_jsxs("section", { className: "scrollable", children: [_jsx("h2", { children: "Ingredients:" }), _jsx("ul", { id: "ingredients-list", className: "ingredients-list", children: ingredients.map(ingredient => _jsx(Ingredient, Object.assign({}, ingredient, { portionModificator: portionModificator }))) }), _jsx("h2", { children: "Spices: " }), _jsx("div", { id: "spices-list", className: "ingredients-list", children: spices.map(ingredient => _jsx(Ingredient, Object.assign({}, ingredient, { portionModificator: portionModificator }))) })] }));
}
//# sourceMappingURL=Ingredients.js.map