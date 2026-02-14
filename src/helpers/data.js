import { HOST, HSOT_PORT } from "../../config.js";

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
        body: JSON.stringify({recipeId, action}),
    });
}

export function getIngredients(ingredient) {
    return fetch(`${HOST}:${HSOT_PORT}/api/search-ingredients/${ingredient}`);
}

export function extractRecipeDataFromForm(form) {
    const formData = new FormData(form);
    const modifiedData = {
        ingredients: [],
        spices: [],
        steps: [],
        portions: formData.get("portions")
    };
    const formIngredients = formData.getAll("ingredient-name");
    const formIngredientsQuantities = formData.getAll("ingredient-quantity");
    const formIngredientsUnits = formData.getAll("ingredient-unit");
    const formSpices = formData.getAll("spice-name");
    const formSpiceQuantities = formData.getAll("spice-quantity");
    const formSpiceUnits = formData.getAll("spice-unit");
    const formSteps = formData.getAll("step");
    for (let i in formIngredients) {
        modifiedData.ingredients.push({
            name: formIngredients[i],
            quantity: formIngredientsQuantities[i],
            unit: formIngredientsUnits[i]
        });
    }
    for (let i in formSpices) {
        modifiedData.spices.push({
            name: formSpices[i],
            quantity: formSpiceQuantities[i],
            unit: formSpiceUnits[i]
        });
    }
    for (let step of formSteps) {
        modifiedData.steps.push(step);
    }
    return modifiedData;
}

export function normalizeIngredients(ingredients) {
    return ingredients.map(ingredient => ({ ...ingredient, unit: ingredient.unit || 'none'}));
}

export function isResponseJSON(response) {
    return response.headers.get("content-type") && response.headers.get("content-type").toLowerCase().includes("json");
}