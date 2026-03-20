import { useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
export function handlRecipeRowAdd(data, type, row) {
    const newData = [];
    for (let i in data) {
        newData.push(type == "steps" ? data[i] : Object.assign({}, data[i]));
        if (Number(i) == row) {
            newData.push(type == "steps" ?
                { text: "", id: uuid() } :
                { name: "", quantity: "", unit: "" });
        }
    }
    return newData;
}
export function handlRecipeRowRemove(data, row) {
    return data.filter((_, i) => i != row);
}
export function handleRowValueChange(data, type, row, name, value) {
    const newData = [];
    for (let i in data) {
        if (Number(i) == row) {
            newData.push(type == "steps" ? Object.assign(Object.assign({}, data[i]), { text: value }) : Object.assign(Object.assign({}, data[i]), { [name]: value }));
        }
        else {
            newData.push(type == "steps" ? data[i] : Object.assign({}, data[i]));
        }
    }
    return newData;
}
export function getItemEventHandlers(data, itemType, onValueChange) {
    return {
        onItemAdd: (row) => {
            onValueChange(itemType, handlRecipeRowAdd(data, itemType, row));
        },
        onItemRemove: (row) => {
            onValueChange(itemType, handlRecipeRowRemove(data, row), row);
        },
        onValueChange: (row, name, value) => {
            onValueChange(itemType, handleRowValueChange(data, itemType, row, name, value), row);
        }
    };
}
export function getInitialRecipeVersion(initialModifiedData) {
    const [searchParams] = useSearchParams();
    return searchParams.get("section") &&
        searchParams.get("section") == "my" &&
        initialModifiedData ?
        "my" :
        "original";
}
//# sourceMappingURL=recipe.js.map