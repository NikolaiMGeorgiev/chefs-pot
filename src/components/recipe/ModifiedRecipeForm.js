import "../../styles/modified-recipe-form.css";

import IngredientsModify from "./IngredientsModify";
import RecipeToolbarEdit from "./RecipeToolbarEdit";
import StepsModify from "./StepsModify";

export default function ModifiedRecipeForm({ data, errors, errorInputRef, onValueChange }) {
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