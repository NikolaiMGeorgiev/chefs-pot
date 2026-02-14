import "../../styles/ingredients-list.css";

import Ingredient from "./Ingredient";

export default function Ingredients({
    ingredients,
    spices,
    portionModificator
}) {
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