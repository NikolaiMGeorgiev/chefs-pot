import "../../styles/recipe-toolbar.css";

import QuantitySelector from "./QuantitySelector";

export default function RecipeToolbar({ portions, isOwn, onPortionChange, onEditClick }) {
    return (
        <div id="ingredients-toolbar">
            <QuantitySelector portions={portions} onPortionChange={onPortionChange} />
            <button 
                id="ingredients-toolbar__modify-btn" 
                className="button" 
                onClick={onEditClick}
            >{isOwn ? "Edit recipe" : "Modify recipe"}</button>
        </div>
    )
}