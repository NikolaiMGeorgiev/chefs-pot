import "../../styles/ingredients-list.css";
import type { Ingredient as IngredientType } from "../../types/recipe";

import Ingredient from "./Ingredient";

type Props = {
    ingredients: IngredientType[],
    spices: IngredientType[],
    portionModificator: number
}

export default function Ingredients({
    ingredients,
    spices,
    portionModificator
}: Props) {
    return (
        <section className="scrollable">
            <h2>Ingredients:</h2>
            <ul id="ingredients-list" className="ingredients-list">
                {ingredients.map(ingredient =>
                    <Ingredient {...ingredient} portionModificator={portionModificator} />)}
            </ul>
            <h2>Spices: </h2>
            <div id="spices-list" className="ingredients-list">
                {spices.map(ingredient =>
                    <Ingredient {...ingredient} portionModificator={portionModificator} />)}
            </div>
        </section>
    )
}