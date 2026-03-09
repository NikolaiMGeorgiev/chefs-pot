import "../../styles/section-selector.css";
import type { SectionType } from "../../types/recipe";

type Props = {
    section: SectionType, 
    setSection: Function
}

export default function SectionSelector({ section, setSection }: Props) {
    return (
        <div id="section-selector">
            <button
                id="section-selector__ingredients-btn"
                className={section === "ingredients" ? "selector-btn selected" : "selector-btn"}
                onClick={() => setSection("ingredients")}
            >Ingredients</button>
            <button
                id="section-selector__steps-btn"
                className={section === "steps" ? "selector-btn selected" : "selector-btn"}
                onClick={() => setSection("steps")}
            >Steps</button>
        </div>
    )
}