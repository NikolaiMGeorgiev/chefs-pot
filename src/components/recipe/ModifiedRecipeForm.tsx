import type { RefObject } from "react";
import "../../styles/modified-recipe-form.css";
import type { GenericMap } from "../../types/common";

import IngredientsModify from "./IngredientsModify";
import RecipeToolbarEdit from "./RecipeToolbarEdit";
import StepsModify from "./StepsModify";

type Props = {
    data: GenericMap, 
    errors: GenericMap, 
    errorInputRef: RefObject<HTMLElement | null>, 
    onValueChange: Function
}

export default function ModifiedRecipeForm({ data, errors, errorInputRef, onValueChange }: Props) {
    const { portions, onCancelEdit, section } = data;
    
    return (
         <>
            <RecipeToolbarEdit portions={portions} onValueChange={onValueChange} onCancelEdit={onCancelEdit} />
            <div className="scrollable">
                {section === "ingredients" ? 
                    <IngredientsModify 
                        data={data} 
                        errors={errors} 
                        errorInputRef={errorInputRef} 
                        onValueChange={onValueChange} 
                    /> : 
                    <StepsModify 
                        data={data.steps} 
                        errors={errors} 
                        errorInputRef={errorInputRef} 
                        onValueChange={onValueChange} 
                    />
                }
            </div>
        </>
    )
}