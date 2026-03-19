import "../styles/forms.css";
import "../styles/add-recipe.css";

import InputError from "./recipe/InputError";
import { useNavigate } from "react-router-dom";
import ValidatedForm from "./common/ValidatedForm";
import IngredientsModify from "./recipe/IngredientsModify";
import StepsModify from "./recipe/StepsModify";
import { v4 as uuid } from "uuid";
import InputWithLabel from "./common/InputWithLabel";
import type { ValidatedFormProps } from "../types/data";
import type { UIEvent } from "react";


export default function AddRecipeForm() {
    const navigator = useNavigate();
    const ingredientPlaceholderData = {
        name: "",
        quantity: null,
        unit: "",
    };
    const data = {
        ingredients: [{ ...ingredientPlaceholderData }],
        spices: [{ ...ingredientPlaceholderData }],
        steps: [{ text: "", id: uuid() }],
        title: "",
        portions: null,
        image: null
    };

    return (
        <div className="centered-page__wrapper">
            <div id="add-recipe-form__container" className="form-container">
                <h1>New Recipe</h1>
                <ValidatedForm
                    initialData={data}
                    formId="add-recipe-form"
                    className="scrollable__container"
                    handleResponse={(response: { data: number }) => {
                        const newRecipeId = response.data;
                        navigator(`/recipes/${newRecipeId}`)
                    }}
                    Component={AddRecipe}
                />
            </div>
        </div>
    )
}

function AddRecipe({ data, errors, onValueChange }: ValidatedFormProps) {
    return (
        <>
            <div className="scrollable">
                <InputWithLabel 
                    name="title"
                    value={data.title}
                    labelText="Title"
                    errorText={errors.title}
                    onValueChange={onValueChange}
                />
                <InputWithLabel 
                    name="portions"
                    type="number"
                    value={data.portions}
                    labelText="Portions"
                    errorText={errors.portions}
                    onValueChange={onValueChange}
                />
                <div className="input-control">
                    <label id="image-label">
                        <span>Image:</span>
                        <input type="file" name="image" id="image"
                            onChange={(e) => onValueChange("image", e.target.files ? e.target.files[0] : "")}
                        />
                    </label>
                    <InputError text={errors["image"]} />
                </div>
                <IngredientsModify data={data} errors={errors} onValueChange={onValueChange} />
                <StepsModify data={data.steps} errors={errors} onValueChange={onValueChange} />
            </div>
            <div className="form-buttons-container">
                <button className="button">Submit</button>
            </div>
        </>
    );
}