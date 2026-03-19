import { HOST, HSOT_PORT } from "../../config";
import type { FavouriteButtonAction } from "../types/common";
import type { LoginData, ProfileData, RegistrationData } from "../types/data";
import type { Ingredient, RecipeModifyData } from "../types/recipe";

export function updateRecipe(data: RecipeModifyData) {
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

export function sendNewRecipe(data: RecipeModifyData) {
    const formData = new FormData();
    for (let key of Object.keys(data) as (keyof RecipeModifyData)[]) {
        formData.append(key, data[key] instanceof Array ? JSON.stringify(data[key]) : data[key] as string);
    }
    return fetch(`${HOST}:${HSOT_PORT}/recipe`, {
        method: "POST",
        body: formData,
    });
}

export function sendRegistration(data: RegistrationData) {
    return fetch(`${HOST}:${HSOT_PORT}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function sendLogin(data: LoginData) {
    return fetch(`${HOST}:${HSOT_PORT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function sendProfileUpdate(data: ProfileData) {
    return fetch(`${HOST}:${HSOT_PORT}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function sendFavourite(recipeId: number, action: FavouriteButtonAction) {
    return fetch(`${HOST}:${HSOT_PORT}/api/favourite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({recipeId, action}),
    });
}

export function getIngredients(ingredient: string) {
    return fetch(`${HOST}:${HSOT_PORT}/api/search-ingredients/${ingredient}`);
}

export function normalizeIngredients(ingredients: Ingredient[]) {
    return ingredients.map(ingredient => ({ ...ingredient, unit: ingredient.unit || 'none'}));
}

export function isResponseJSON(response: Response) {
    return response.headers.get("content-type") && response.headers.get("content-type")?.toLowerCase().includes("json");
}