import { type IngredientFilterAction } from "../types/recipe"

type StateProps = {
    value: string,
    isExpanded: boolean,
    selectedIngredients: string[],
    filteredIngredients: string[],
    isLoading: boolean
}

export default function recipeFilterReducer(state: StateProps, action: IngredientFilterAction): StateProps {
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
                    action.value
                ]
            }
        }
        case "remove_selected_ingr": {
            return {
                ...state,
                selectedIngredients: state.selectedIngredients.filter(
                    (selectedIngredient: string) => selectedIngredient != action.value
                )
            }
        }
        case "set_filtered_ingredients": {
            return {
                ...state,
                filteredIngredients: action.value
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
                isLoading: action.value
            }
        }
        default: return state
    }
}