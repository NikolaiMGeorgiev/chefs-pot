import Loader from "../common/Loader";
import IngredientButton from "./IngredientButton";

export default function FilteredIngredients({ filter, dispatch }) {
    let content = "No ingredietns match search";
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