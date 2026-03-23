import type { ActionDispatch, JSX } from "react";
import IngredientButton from "./IngredientButton";
import { type IngredientFilterAction } from "../../types/recipe";

type Props = {
    selectedIngredients: string[], 
    dispatch: ActionDispatch<[action: IngredientFilterAction]>
}

export default function SelectedIngredients({ selectedIngredients, dispatch }: Props) {
    let content: string | JSX.Element | JSX.Element[] = "Search ingredietns and add them to the filter";

    if (selectedIngredients.length) {
        content = selectedIngredients
            .map(ingredient => 
                <IngredientButton 
                    type={"remove"} 
                    ingredient={ingredient} 
                    selectedIngredients={selectedIngredients}
                    dispatch={dispatch}
                />);
    }

    return (
        <div id="filtered-ingredients__selected-wrapper" className="filtered-ingredients__section">
            <h3>Selected ingredients:</h3>
            <div id="filtered-ingredients__selected-container">
                {content}
            </div>
        </div>
    )
}
