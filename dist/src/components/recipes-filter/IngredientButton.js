import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlusIcon from "../icons/PlusIcon";
import ExIcon from "../icons/ExIcon";
export default function IngredientButton({ type, ingredient, selectedIngredients, dispatch }) {
    const isSelected = selectedIngredients.some(ingr => ingr == ingredient);
    const icon = type == "add" && !isSelected ? _jsx(PlusIcon, {}) : _jsx(ExIcon, {});
    const buttonClass = type == "add" && !isSelected ? "suggestion" : "suggestion selected";
    const action = type == "add" && !isSelected ? "add" : "remove";
    const updateSelectedIngredients = (action, ingredient) => {
        if (action == "add") {
            dispatch({ type: "add_selected_ingr", ingredient });
        }
        else {
            dispatch({ type: "remove_selected_ingr", ingredient });
        }
    };
    return (_jsxs("button", { className: buttonClass, onClick: () => updateSelectedIngredients(action, ingredient), children: [icon, ingredient] }, ingredient));
}
//# sourceMappingURL=IngredientButton.js.map