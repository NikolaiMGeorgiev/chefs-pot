import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "../styles/forms.css";
import "../styles/add-recipe.css";
import InputError from "./recipe/InputError";
import { useNavigate } from "react-router-dom";
import ValidatedForm from "./common/ValidatedForm";
import IngredientsModify from "./recipe/IngredientsModify";
import StepsModify from "./recipe/StepsModify";
import { v4 as uuid } from "uuid";
import InputWithLabel from "./common/InputWithLabel";
export default function AddRecipeForm() {
    const navigator = useNavigate();
    const ingredientPlaceholderData = {
        name: "",
        quantity: null,
        unit: "",
    };
    const data = {
        ingredients: [Object.assign({}, ingredientPlaceholderData)],
        spices: [Object.assign({}, ingredientPlaceholderData)],
        steps: [{ text: "", id: uuid() }],
        title: "",
        portions: null,
        image: null
    };
    return (_jsx("div", { className: "centered-page__wrapper", children: _jsxs("div", { id: "add-recipe-form__container", className: "form-container", children: [_jsx("h1", { children: "New Recipe" }), _jsx(ValidatedForm, { initialData: data, formId: "add-recipe-form", className: "scrollable__container", handleResponse: (response) => {
                        const newRecipeId = response.data;
                        navigator(`/recipes/${newRecipeId}`);
                    }, Component: AddRecipe })] }) }));
}
function AddRecipe({ data, errors, onValueChange }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "scrollable", children: [_jsx(InputWithLabel, { name: "title", value: data.title, labelText: "Title", errorText: errors.title, onValueChange: onValueChange }), _jsx(InputWithLabel, { name: "portions", type: "number", value: data.portions, labelText: "Portions", errorText: errors.portions, onValueChange: onValueChange }), _jsxs("div", { className: "input-control", children: [_jsxs("label", { id: "image-label", children: [_jsx("span", { children: "Image:" }), _jsx("input", { type: "file", name: "image", id: "image", onChange: (e) => onValueChange("image", e.target.files ? e.target.files[0] : "") })] }), _jsx(InputError, { text: errors["image"] })] }), _jsx(IngredientsModify, { data: data, errors: errors, onValueChange: onValueChange }), _jsx(StepsModify, { data: data.steps, errors: errors, onValueChange: onValueChange })] }), _jsx("div", { className: "form-buttons-container", children: _jsx("button", { className: "button", children: "Submit" }) })] }));
}
//# sourceMappingURL=AddRecipe.js.map