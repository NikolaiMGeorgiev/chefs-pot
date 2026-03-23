import { useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import type { GenericMap } from "../types/common";
import type { RecipeOriginalData, RecipeType } from "../types/recipe";
import { type FormChangeHandler } from "../types/functions";

export function handlRecipeRowAdd(data: GenericMap, type: string, row: number) {
    const newData = [];

    for (let i in data) {
        newData.push(type == "steps" ? data[i] : { ...data[i] });
        if (Number(i) == row) {
            newData.push(type == "steps" ?
                { text: "", id: uuid() } : 
                { name: "", quantity: "", unit: "" }
            );
        }
    }

    return newData;
}

export function handlRecipeRowRemove(data: GenericMap, row: number) {
    return data.filter((_: object, i: number) => i != row);
}

export function handleRowValueChange(data: GenericMap, type: string, row: number, name: string, value: any) {
    const newData = [];

    for (let i in data) {
        if (Number(i) == row) {
            newData.push(type == "steps" ? 
                { ...data[i], text: value } : 
                { ...data[i], [name]: value })
        } else {
            newData.push(type == "steps" ? data[i] : { ...data[i] });
        }
    }

    return newData;
}

export function getItemEventHandlers(
    data: GenericMap, 
    itemType: string, 
    onValueChange: FormChangeHandler
) {
    return {
        onItemAdd: (row: number) => {
            onValueChange(itemType, handlRecipeRowAdd(data, itemType, row));
        },
        onItemRemove: (row: number) => {
            onValueChange(itemType, handlRecipeRowRemove(data, row), row)
        },
        onValueChange: (row: number, name: string, value: any) => {
            onValueChange(
                itemType, 
                handleRowValueChange(data, itemType, row, name, value), 
                row
            )
        }
    }
}

export function getInitialRecipeVersion(initialModifiedData: RecipeOriginalData | undefined): RecipeType {
    const [searchParams] = useSearchParams();
    return searchParams.get("section") &&
        searchParams.get("section") == "my" &&
        initialModifiedData ?
        "my" :
        "original";
}
