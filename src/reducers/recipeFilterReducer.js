export default function recipeFilterReducer(state, action) {
    switch(action.type) {
        case "submit": {
            return {
                ...state,
                isExpanded: false
            }
        }
        case "update_value": {
            return {
                ...state,
                value: action.value
            }
        }
        case "clear": {
            return {
                ...state,
                value: "",
                filteredIngredients: [],
                isLoading: false
            }
        }
        case "cancel": {
            return {
                value: "",
                isExpanded: false,
                selectedIngredients: [],
                filteredIngredients: [],
                isLoading: false
            }
        }
        case "add_selected_ingr": {
            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients, 
                    action.ingredient
                ]
            }
        }
        case "remove_selected_ingr": {
            return {
                ...state,
                selectedIngredients: state.selectedIngredients.filter(
                    selectedIngredient => selectedIngredient != action.ingredient
                )
            }
        }
        case "set_filtered_ingredients": {
            return {
                ...state,
                filteredIngredients: action.ingredients
            }
        }
        case "toggle": {
            return {
                ...state,
                isExpanded: !state.isExpanded
            }
        }
        case "loaded": {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default: return state
    }
}