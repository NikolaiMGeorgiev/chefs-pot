import "../../styles/recipe-toolbar.css";

export default function RecipeToolbarEdit({ portions, onCancelEdit, onValueChange }) {
    return (
        <div id="ingredients-toolbar">
            <div>
                <label>
                    <span>Portions:</span>
                    <input type="number" 
                        name="portions" 
                        id="ingredients-toolbar__portions" 
                        value={portions} 
                        onChange={e => onValueChange("portions", e.target.value)} 
                    />
                </label>
            </div>
            <div>
                <button id="ingredients-toolbar__modify-btn" className="button" type="submit">Save recipe</button>
                <button id="ingredients-toolbar__cancel-btn" className="button" type="button" onClick={onCancelEdit}>Cancel</button>
            </div>
        </div>
        
    )
}