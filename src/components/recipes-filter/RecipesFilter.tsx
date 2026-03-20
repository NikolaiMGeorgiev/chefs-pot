
import "../../styles/recipes-search.css";

import { useReducer } from "react";
import FilterIcon from "../icons/FilterIcon";
import ExIcon from "../icons/ExIcon";
import { HOST, HSOT_PORT } from "../../config";
import useFilteredIngredientsSearch from "../../hooks/useFilteredIngredientsSearch";
import recipeFilterReducer from "../../reducers/recipeFilterReducer";
import IngredientsSearchBox from "./IngredientsSearchBox";
import FilteredIngredients from "./FilteredIngredients";
import SelectedIngredients from "./SelectedIngredients";
import type { RecipeType } from "../../types/recipe";

type Props = {
    updateUrl: Function,
    recipesType: RecipeType
}

export default function RecipesFilter({
    updateUrl,
    recipesType
}: Props) {
    const [filter, dispatch] = useReducer(recipeFilterReducer, {
        value: "",
        isExpanded: false,
        selectedIngredients: [],
        filteredIngredients: [],
        isLoading: false
    })
    
    useFilteredIngredientsSearch(filter.value, dispatch);

    const filterRecipes = (selectedIngredients: string[]) => {
        const urlParamsList = [`type=${recipesType}`];
        if (selectedIngredients.length) {
            urlParamsList.push(selectedIngredients.map(ingredient => `ingr=${ingredient}`).join("&"))
        }
        const urlParams = urlParamsList.length ? `?${urlParamsList.join("&")}` : "";
        updateUrl(`${HOST}:${HSOT_PORT}/api/filtered-recipes${urlParams}`);
    }

    const getFilterIcon = (type: "open" | "close") => {
        return (
            <div 
                className={`recipe-filter__filter-icon ${type}`} 
                onClick={() => dispatch({type: "toggle"})}
            >
               { type == "close" ? <ExIcon /> : <FilterIcon /> }
            </div>
        )
    }

    return (
        <div id="recipe-filter">
            { !filter.isExpanded && getFilterIcon("open") }
            <div id="recipe-filter__wrapper" className={filter.isExpanded ? "expanded" : ""}>
                <h2>Filter</h2>
                { getFilterIcon("close") }
                <div id="recipe-filter__container">
                    <IngredientsSearchBox filterValue={filter.value} dispatch={dispatch} />
                    <div id="filtered-ingredients">
                        <FilteredIngredients filter={filter} dispatch={dispatch} />
                        <SelectedIngredients 
                            selectedIngredients={filter.selectedIngredients} 
                            dispatch={dispatch} 
                        />
                    </div>
                </div>
                <div id="recipe-filter__buttons-container">
                    <button 
                        id="recipe-filter__filter-btn" 
                        className="filter-btn" 
                        onClick={() => { dispatch({type: "submit"}); filterRecipes(filter.selectedIngredients); }}
                    >Filter</button>
                    <button 
                        id="recipe-filter__cancel-btn" 
                        className="filter-btn" 
                        onClick={() => { dispatch({type: "cancel"}); filterRecipes([]); }}
                    >Clear</button>
                </div>
            </div>
        </div>
    )
}
