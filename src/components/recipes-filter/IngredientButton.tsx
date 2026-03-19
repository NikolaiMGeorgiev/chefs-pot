import PlusIcon from "../icons/PlusIcon";
import ExIcon from "../icons/ExIcon";

type ButtonAction = "add" | "remove";

type Props = {
    type: ButtonAction, 
    ingredient: string,
    selectedIngredients: string[],
    dispatch: Function
}

export default function IngredientButton({
    type, 
    ingredient,
    selectedIngredients,
    dispatch
}: Props) {
    const isSelected = selectedIngredients.some(ingr => ingr == ingredient);
    const icon = type == "add" && !isSelected ? <PlusIcon /> : <ExIcon />;
    const buttonClass = type == "add" && !isSelected ? "suggestion" : "suggestion selected";
    const action = type == "add" && !isSelected ? "add" : "remove";

    const updateSelectedIngredients = (action: ButtonAction, ingredient: string) => {
        if (action == "add") {
            dispatch({type: "add_selected_ingr", ingredient});
        } else {
            dispatch({type: "remove_selected_ingr", ingredient});
        }
    }

    return (
        <button
            key={ingredient}
            className={buttonClass}
            onClick={() => updateSelectedIngredients(action, ingredient)}
        >
            {icon}{ingredient}
        </button>
    );
}