import { useState } from "react";

export default function useRecipePortions(isModifiedRecipe: boolean, portions: number, modifiedPortions: number) {
    const [originalPortions, setOriginalPortions] = useState(
        isModifiedRecipe ?
            portions :
            modifiedPortions
    );
    const [finalPortions, setFinalPortions] = useState(originalPortions);
    const [portionModificator, setPortionModificator] = useState(1);

    const setSelectedPortions = (newPortions: number) => {
        setPortionModificator(newPortions / originalPortions);
        setFinalPortions(newPortions);
    }

    const updatePortions = (newPortions: number) => {
        setOriginalPortions(newPortions);
        setFinalPortions(newPortions);
        setPortionModificator(1);
    }

    return {
        originalPortions,
        finalPortions,
        portionModificator,
        setSelectedPortions,
        updatePortions
    }
}