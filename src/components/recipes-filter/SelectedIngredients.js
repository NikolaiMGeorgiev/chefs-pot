import IngredientButton from "./IngredientButton";

export default function SelectedIngredients({ selectedIngredients, dispatch }) {
    let content = "Search ingredietns and add them to the filter";

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
