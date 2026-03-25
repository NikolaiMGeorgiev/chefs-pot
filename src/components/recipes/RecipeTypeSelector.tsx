import type { UIEvent } from "react";
import "../../styles/recipe-type-selector.css";

import ExIcon from "../icons/ExIcon";
import PlusIcon from "../icons/PlusIcon";

export const recipeTypes = [
    {
        type: "favourite",
        text: "Favourite"
    }, {
        type: "modified",
        text: "Modified"
    }, {
        type: "own",
        text: "Own"
    }
]; 

type Props = {
    selectedTypes: string[], 
    setSelectedTypes: (types: string[]) => void
}

export default function RecipeTypeSelector({ selectedTypes, setSelectedTypes }: Props) {
    const getIsSelected = (type: string) => {
        return selectedTypes.some(selectedType => selectedType == type);
    }

    const types = recipeTypes.map(typeData => ({
        ...typeData, 
        isSelected: getIsSelected(typeData.type)
    }))

    const handleClick = (e: UIEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        const type = target.dataset.type as string;
        const isTypeSelected = types.find(typeData => typeData.type == type)?.isSelected;
        if (isTypeSelected) {
            setSelectedTypes(selectedTypes.filter(selectedType => selectedType != type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    }

    return (
        <div id="recipe-type">
            <span>Recipe types: </span>
            {types.map(typeData => 
                <button 
                    key={typeData.type}
                    className={typeData.isSelected ? "button selected" : "button"}
                    data-type={typeData.type} 
                    type="button"
                    onClick={handleClick}
                >
                    {typeData.isSelected ? <ExIcon /> : <PlusIcon />}
                    <span>{typeData.text}</span>
                </button>)
            }
        </div>
    )
}