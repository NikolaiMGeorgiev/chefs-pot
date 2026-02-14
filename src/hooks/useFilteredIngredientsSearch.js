import { useEffect, useEffectEvent } from "react";
import { getIngredients, isResponseJSON } from "../helpers/data";


export default function useFilteredIngredientsSearch(filterValue, dispatch) {
    const sendFilterRequest = useEffectEvent((value) => {
        getIngredients(value)
            .then(response => {
                if (isResponseJSON(response)) {
                    return response.json();
                } else {
                    return [];
                }
            }).then(data => {
                dispatch({ type: "set_filtered_ingredients", ingredients: "ingredients" in data ? data.ingredients : [] });
                dispatch({ type: "loaded", isLoading: false });
            })
    })

    useEffect(() => {
        dispatch({type: "loaded", isLoading: true});

        if (!filterValue) {
            dispatch({type: "loaded", isLoading: false});
            return;
        }

        const getIngredients = setTimeout(() => {
            sendFilterRequest(filterValue);
        }, 1000);

        return () => clearTimeout(getIngredients);
    }, [filterValue])
}