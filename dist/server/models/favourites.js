import { db } from "../db.js";
export async function addFavourite(recipeId, userId) {
    const [result] = await db.execute("INSERT INTO recipes_favourite ( recipe_id, user_id) VALUES (?, ?)", [recipeId, userId]);
    return result;
}
export async function removeFavourite(recipeId, userId) {
    const [result] = await db.execute("DELETE FROM recipes_favourite WHERE recipe_id = ? AND user_id = ?", [recipeId, userId]);
    return result;
}
export async function getIsFavourite(recipeId, userId) {
    if (userId === undefined) {
        return;
    }
    const [result] = await db.execute("SELECT * FROM recipes_favourite WHERE recipe_id = ? AND user_id = ?", [recipeId, userId]);
    return result && result.length;
}
//# sourceMappingURL=favourites.js.map