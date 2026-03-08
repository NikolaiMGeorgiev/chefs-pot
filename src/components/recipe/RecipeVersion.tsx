import "../../styles/recipe-version.css";
import type { RecipeType } from "../../types/recipe";

type Props = {
    version: RecipeType, 
    onVersionChange: Function, 
    hasModifiedData: boolean
}

export default function RecipeVersion({ version, onVersionChange, hasModifiedData }: Props) {
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
                disabled={!hasModifiedData}
                title="Modify recipe to create your own version"
                onClick={() => onVersionChange("my")}
            >My recipe</button>
        </div>
    )
}