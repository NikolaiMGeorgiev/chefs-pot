import "../../styles/modified-recipe-form.css";

import IngredientsModify from "./IngredientsModify";
import RecipeToolbarEdit from "./RecipeToolbarEdit";
import StepsModify from "./StepsModify";
import type { ValidatedFormProps } from "../../types/data";

export default function ModifiedRecipeForm({ data, errors, errorInputRef, onValueChange }: ValidatedFormProps) {
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