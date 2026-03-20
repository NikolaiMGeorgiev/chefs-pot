import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../../styles/recipe-form-row.css";
import { getItemEventHandlers } from "../../helpers/recipe";
import IngredientInputs from "./IngredientInputs";
import InputError from "./InputError";
export default function IngredientsModify({ data, errors, errorInputRef, onValueChange }) {
    const ingredientsList = data.ingredients
        .map((ingredient, row) => getListItem(row, ingredient, "ingredients"));
    const spicesList = data.spices
        .map((spice, row) => getListItem(row, spice, "spices"));
    function getListItem(row, ingredient, itemType) {
        return (_jsxs("div", { className: "input-control", children: [_jsx(IngredientInputs, Object.assign({}, ingredient, { type: itemType, row: row, isOnlyRow: data[itemType].length === 1 }, getItemEventHandlers(data[itemType], itemType, onValueChange))), _jsx(InputError, { text: errors[itemType] && errors[itemType].length && errors[itemType][row], errorInputRef: errorInputRef })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "ingredients-wrapper", children: [_jsx("h2", { children: "Ingredients:" }), _jsx("div", { id: "ingredients-container", className: "ingredients-list modified", children: ingredientsList })] }), _jsxs("div", { id: "spices-wrapper", children: [_jsx("h2", { children: "Spices:" }), _jsx("div", { id: "spices-container", className: "ingredients-list modified", children: spicesList })] })] }));
}
//# sourceMappingURL=IngredientsModify.js.map