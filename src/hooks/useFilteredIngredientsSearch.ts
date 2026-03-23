import { type ActionDispatch, useEffect, useEffectEvent } from "react";
import { getIngredients, isResponseJSON } from "../helpers/data";
import { type IngredientFilterAction } from "../types/recipe";


export default function useFilteredIngredientsSearch(
    filterValue: string,
    dispatch: ActionDispatch<[action: IngredientFilterAction]>
) {
    const sendFilterRequest = useEffectEvent((value: string) => {
        getIngredients(value)
            .then(response => {
                if (isResponseJSON(response)) {
                    return response.json();
                } else {
                    return [];
                }
            }).then(data => {
                dispatch({ type: "set_filtered_ingredients", value: "ingredients" in data ? data.ingredients : [] });
                dispatch({ type: "loaded", value: false });
            })
    })

    useEffect(() => {
        dispatch({type: "loaded", value: true});

        if (!filterValue) {
            dispatch({type: "loaded", value: false});
            return;
        }

        const getIngredients = setTimeout(() => {
            sendFilterRequest(filterValue);
        }, 1000);

        return () => clearTimeout(getIngredients);
    }, [filterValue])
}