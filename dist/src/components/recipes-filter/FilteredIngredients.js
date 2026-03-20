import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from "../common/Loader";
import IngredientButton from "./IngredientButton";
export default function FilteredIngredients({ filter, dispatch }) {
    let content = "No ingredietns match search";
    const { filteredIngredients, selectedIngredients, isLoading } = filter;
    if (isLoading) {
        content = _jsx(Loader, {});
    }
    else if (filteredIngredients.length) {
        content = filteredIngredients
            .map(ingredient => _jsx(IngredientButton, { type: "add", ingredient: ingredient, selectedIngredients: selectedIngredients, dispatch: dispatch }));
    }
    return (_jsxs("div", { id: "filtered-ingredients__suggestions-wrapper", className: "filtered-ingredients__section", children: [_jsx("h3", { children: "Select ingredients:" }), _jsx("div", { id: "filtered-ingredients__suggestions-container", children: content })] }));
}
//# sourceMappingURL=FilteredIngredients.js.map