import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipes-search.css";
import { useReducer } from "react";
import FilterIcon from "../icons/FilterIcon";
import ExIcon from "../icons/ExIcon";
import { HOST, HSOT_PORT } from "../../../config";
import useFilteredIngredientsSearch from "../../hooks/useFilteredIngredientsSearch";
import recipeFilterReducer from "../../reducers/recipeFilterReducer";
import IngredientsSearchBox from "./IngredientsSearchBox";
import FilteredIngredients from "./FilteredIngredients";
import SelectedIngredients from "./SelectedIngredients";
export default function RecipesFilter({ updateUrl, recipesType }) {
    const [filter, dispatch] = useReducer(recipeFilterReducer, {
        value: "",
        isExpanded: false,
        selectedIngredients: [],
        filteredIngredients: [],
        isLoading: false
    });
    useFilteredIngredientsSearch(filter.value, dispatch);
    const filterRecipes = (selectedIngredients) => {
        const urlParamsList = [`type=${recipesType}`];
        if (selectedIngredients.length) {
            urlParamsList.push(selectedIngredients.map(ingredient => `ingr=${ingredient}`).join("&"));
        }
        const urlParams = urlParamsList.length ? `?${urlParamsList.join("&")}` : "";
        updateUrl(`${HOST}:${HSOT_PORT}/api/filtered-recipes${urlParams}`);
    };
    const getFilterIcon = (type) => {
        return (_jsx("div", { className: `recipe-filter__filter-icon ${type}`, onClick: () => dispatch({ type: "toggle" }), children: type == "close" ? _jsx(ExIcon, {}) : _jsx(FilterIcon, {}) }));
    };
    return (_jsxs("div", { id: "recipe-filter", children: [!filter.isExpanded && getFilterIcon("open"), _jsxs("div", { id: "recipe-filter__wrapper", className: filter.isExpanded ? "expanded" : "", children: [_jsx("h2", { children: "Filter" }), getFilterIcon("close"), _jsxs("div", { id: "recipe-filter__container", children: [_jsx(IngredientsSearchBox, { filterValue: filter.value, dispatch: dispatch }), _jsxs("div", { id: "filtered-ingredients", children: [_jsx(FilteredIngredients, { filter: filter, dispatch: dispatch }), _jsx(SelectedIngredients, { selectedIngredients: filter.selectedIngredients, dispatch: dispatch })] })] }), _jsxs("div", { id: "recipe-filter__buttons-container", children: [_jsx("button", { id: "recipe-filter__filter-btn", className: "filter-btn", onClick: () => { dispatch({ type: "submit" }); filterRecipes(filter.selectedIngredients); }, children: "Filter" }), _jsx("button", { id: "recipe-filter__cancel-btn", className: "filter-btn", onClick: () => { dispatch({ type: "cancel" }); filterRecipes([]); }, children: "Clear" })] })] })] }));
}
//# sourceMappingURL=RecipesFilter.js.map