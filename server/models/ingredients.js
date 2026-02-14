import { db } from "../db.js";

export async function getIngredients(ingredient) {
    const [result] = await db.query(`
        SELECT name FROM ingredients WHERE name LIKE ?
    `, [`%${ingredient}%`]
    );

    if (!result) {
        return [];
    }

    return result.map(ingredient => ingredient.name);
}