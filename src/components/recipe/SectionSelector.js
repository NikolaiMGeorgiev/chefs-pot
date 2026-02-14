import "../../styles/section-selector.css";

export default function SectionSelector({ section, setSection }) {
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