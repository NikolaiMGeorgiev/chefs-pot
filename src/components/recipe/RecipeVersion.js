import "../../styles/recipe-version.css";

export default function RecipeVersion({ version, onVersionChange, modifiedRecipe }) {
    return (
        <div id="recipe-version">
            <button
                id="recipe-version__original-btn"
                className={version == "original" ? "selected" : ""}
                onClick={() => onVersionChange("original")}
            >Original recipe</button>
            <button
                id="recipe-version__my-recipe-btn"
                className={version == "my" ? "selected" : ""}
                disabled={modifiedRecipe ? false : "disabled"}
                title="Modify recipe to create your own version"
                onClick={() => onVersionChange("my")}
            >My recipe</button>
        </div>
    )
}