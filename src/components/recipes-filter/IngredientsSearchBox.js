import ExIcon from "../icons/ExIcon";

export default function IngredientsSearchBox({ filterValue, dispatch }) {
    return (
        <div id="recipe-filter__searchbox">
            <img id="recipe-filter__search-icon" src="/images/search-icon.png" />
            <input id="recipe-filter__field" 
                name="search" 
                type="text" 
                value={filterValue} 
                autocomplete="off"
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