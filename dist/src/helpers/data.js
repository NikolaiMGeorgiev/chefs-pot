import { HOST, HSOT_PORT } from "../../config";
export function updateRecipe(data) {
    const formData = data.isOwn ?
        {
            ingredients: data.ingredients,
            spices: data.spices,
            steps: data.steps,
            portions: data.portions,
            title: data.title
        } : {
        ingredients: data.ingredients,
        spices: data.spices,
        steps: data.steps.map(step => step.text),
        portions: data.portions
    };
    const url = data.isOwn ?
        `${HOST}:${HSOT_PORT}/api/update-recipe/${data.id}` :
        `${HOST}:${HSOT_PORT}/api/recipes/${data.id}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
}
export function sendNewRecipe(data) {
    const formData = new FormData();
    for (let key of Object.keys(data)) {
        formData.append(key, data[key] instanceof Array ? JSON.stringify(data[key]) : data[key]);
    }
    return fetch(`${HOST}:${HSOT_PORT}/recipe`, {
        method: "POST",
        body: formData,
    });
}
export function sendRegistration(data) {
    return fetch(`${HOST}:${HSOT_PORT}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
export function sendLogin(data) {
    return fetch(`${HOST}:${HSOT_PORT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
export function sendProfileUpdate(data) {
    return fetch(`${HOST}:${HSOT_PORT}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
export function sendFavourite(recipeId, action) {
    return fetch(`${HOST}:${HSOT_PORT}/api/favourite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId, action }),
    });
}
export function getIngredients(ingredient) {
    return fetch(`${HOST}:${HSOT_PORT}/api/search-ingredients/${ingredient}`);
}
export function normalizeIngredients(ingredients) {
    return ingredients.map(ingredient => (Object.assign(Object.assign({}, ingredient), { unit: ingredient.unit || 'none' })));
}
export function isResponseJSON(response) {
    var _a;
    return response.headers.get("content-type") && ((_a = response.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("json"));
}
//# sourceMappingURL=data.js.map