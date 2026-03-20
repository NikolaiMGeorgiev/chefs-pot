export default function recipeFilterReducer(state, action) {
    switch (action.type) {
        case "submit": {
            return Object.assign(Object.assign({}, state), { isExpanded: false });
        }
        case "update_value": {
            return Object.assign(Object.assign({}, state), { value: action.value });
        }
        case "clear": {
            return Object.assign(Object.assign({}, state), { value: "", filteredIngredients: [], isLoading: false });
        }
        case "cancel": {
            return {
                value: "",
                isExpanded: false,
                selectedIngredients: [],
                filteredIngredients: [],
                isLoading: false
            };
        }
        case "add_selected_ingr": {
            return Object.assign(Object.assign({}, state), { selectedIngredients: [
                    ...state.selectedIngredients,
                    action.ingredient
                ] });
        }
        case "remove_selected_ingr": {
            return Object.assign(Object.assign({}, state), { selectedIngredients: state.selectedIngredients.filter((selectedIngredient) => selectedIngredient != action.ingredient) });
        }
        case "set_filtered_ingredients": {
            return Object.assign(Object.assign({}, state), { filteredIngredients: action.ingredients });
        }
        case "toggle": {
            return Object.assign(Object.assign({}, state), { isExpanded: !state.isExpanded });
        }
        case "loaded": {
            return Object.assign(Object.assign({}, state), { isLoading: action.isLoading });
        }
        default: return state;
    }
}
//# sourceMappingURL=recipeFilterReducer.js.map