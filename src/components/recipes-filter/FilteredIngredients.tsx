import type { ActionDispatch, JSX } from "react";
import Loader from "../common/Loader";
import IngredientButton from "./IngredientButton";
import { type IngredientFilterAction } from "../../types/recipe";

type Props = {
    filter: {
        filteredIngredients: string[],
        selectedIngredients: string[],
        isLoading: boolean
    }, 
    dispatch: ActionDispatch<[action: IngredientFilterAction]>
}

export default function FilteredIngredients({ filter, dispatch }: Props) {
    let content: string | JSX.Element | JSX.Element[] = "No ingredietns match search";
    const { 
        filteredIngredients,
        selectedIngredients,
        isLoading
     } = filter;

    if (isLoading) {
        content = <Loader />
    } else if (filteredIngredients.length) {
        content = filteredIngredients
            .map(ingredient => 
                <IngredientButton 
                    type={"add"} 
                    ingredient={ingredient} 
                    selectedIngredients={selectedIngredients}
                    dispatch={dispatch}
                />)
    }
    
    return (
        <div id="filtered-ingredients__suggestions-wrapper" className="filtered-ingredients__section">
            <h3>Select ingredients:</h3>
            <div id="filtered-ingredients__suggestions-container">
                {content}
            </div>
        </div>
    )
}