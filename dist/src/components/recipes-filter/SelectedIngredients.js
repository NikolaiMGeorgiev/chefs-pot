import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IngredientButton from "./IngredientButton";
export default function SelectedIngredients({ selectedIngredients, dispatch }) {
    let content = "Search ingredietns and add them to the filter";
    if (selectedIngredients.length) {
        content = selectedIngredients
            .map(ingredient => _jsx(IngredientButton, { type: "remove", ingredient: ingredient, selectedIngredients: selectedIngredients, dispatch: dispatch }));
    }
    return (_jsxs("div", { id: "filtered-ingredients__selected-wrapper", className: "filtered-ingredients__section", children: [_jsx("h3", { children: "Selected ingredients:" }), _jsx("div", { id: "filtered-ingredients__selected-container", children: content })] }));
}
//# sourceMappingURL=SelectedIngredients.js.map