import { useState } from "react";
export default function useRecipePortions(isModifiedRecipe, portions, modifiedPortions) {
    const [originalPortions, setOriginalPortions] = useState(isModifiedRecipe ?
        portions :
        modifiedPortions);
    const [finalPortions, setFinalPortions] = useState(originalPortions);
    const [portionModificator, setPortionModificator] = useState(1);
    const setSelectedPortions = (newPortions) => {
        setPortionModificator(newPortions / originalPortions);
        setFinalPortions(newPortions);
    };
    const updatePortions = (newPortions) => {
        setOriginalPortions(newPortions);
        setFinalPortions(newPortions);
        setPortionModificator(1);
    };
    return {
        originalPortions,
        finalPortions,
        portionModificator,
        setSelectedPortions,
        updatePortions
    };
}
//# sourceMappingURL=useRecipePortions.js.map