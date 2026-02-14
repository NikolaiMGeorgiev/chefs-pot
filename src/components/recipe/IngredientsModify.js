import "../../styles/recipe-form-row.css";

import { getItemEventHandlers } from "../../helpers/recipe";
import IngredientInputs from "./IngredientInputs";
import InputError from "./InputError";

export default function IngredientsModify({ data, errors, errorInputRef, onValueChange }) {
    const ingredientsList = data.ingredients
        .map((ingredient, row) =>
            getListItem(row, ingredient, "ingredients")
        );
    const spicesList = data.spices
        .map((spice, row) => 
            getListItem(row, spice, "spices")
        );

    function getListItem(row, ingredient, itemType) {
        return (
            <div className="input-control">
                <IngredientInputs
                    {...ingredient}
                    type={itemType}
                    row={row}
                    isOnlyRow={data[itemType].length === 1}
                    {...getItemEventHandlers(data[itemType], itemType, onValueChange)}
                />
                <InputError 
                    text={errors[itemType] && errors[itemType].length && errors[itemType][row]} 
                    errorInputRef={errorInputRef}
                />
            </div>
        )
    }

    return (
        <>
            <div id="ingredients-wrapper">
                <h2>Ingredients:</h2>
                <div id="ingredients-container" className="ingredients-list modified">
                    {ingredientsList}
                </div>
            </div>
            <div id="spices-wrapper">
                <h2>Spices:</h2>
                <div id="spices-container" className="ingredients-list modified">
                    {spicesList}
                </div>
            </div>
        </>
    )
}