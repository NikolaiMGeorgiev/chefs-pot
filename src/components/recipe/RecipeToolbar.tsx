import type { MouseEventHandler } from "react";
import "../../styles/recipe-toolbar.css";

import QuantitySelector from "./QuantitySelector";

type Props = {
    portions: number, 
    isOwn: boolean, 
    onPortionChange: (portion: number) => void, 
    onEditClick: MouseEventHandler<HTMLButtonElement>
}

export default function RecipeToolbar({ portions, isOwn, onPortionChange, onEditClick }: Props) {
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