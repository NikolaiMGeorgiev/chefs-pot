import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/modified-recipe-form.css";
import IngredientsModify from "./IngredientsModify";
import RecipeToolbarEdit from "./RecipeToolbarEdit";
import StepsModify from "./StepsModify";
export default function ModifiedRecipeForm({ data, errors, errorInputRef, onValueChange }) {
    const { portions, onCancelEdit, section } = data;
    return (_jsxs(_Fragment, { children: [_jsx(RecipeToolbarEdit, { portions: portions, onValueChange: onValueChange, onCancelEdit: onCancelEdit }), _jsx("div", { className: "scrollable", children: section === "ingredients" ?
                    _jsx(IngredientsModify, { data: data, errors: errors, errorInputRef: errorInputRef, onValueChange: onValueChange }) :
                    _jsx(StepsModify, { data: data.steps, errors: errors, errorInputRef: errorInputRef, onValueChange: onValueChange }) })] }));
}
//# sourceMappingURL=ModifiedRecipeForm.js.map