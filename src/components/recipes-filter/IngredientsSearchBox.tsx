import { type ActionDispatch } from "react";
import ExIcon from "../icons/ExIcon";
import { type IngredientFilterAction } from "../../types/recipe";

type Props = {
    filterValue: string, 
    dispatch: ActionDispatch<[action: IngredientFilterAction]>
}

export default function IngredientsSearchBox({ filterValue, dispatch }: Props) {
    return (
        <div id="recipe-filter__searchbox">
            <img id="recipe-filter__search-icon" src="/images/search-icon.png" />
            <input id="recipe-filter__field" 
                name="search" 
                type="text" 
                value={filterValue} 
                autoComplete="off"
                placeholder="Search ingredients"
                onChange={(e) => dispatch({type: "update_value", value: e.target.value})} 
            />
            <button 
                className="icon-btn" 
                type="button" 
                onClick={() => dispatch({type: "clear"})}>
                <ExIcon />
            </button>
        </div>
    )
}