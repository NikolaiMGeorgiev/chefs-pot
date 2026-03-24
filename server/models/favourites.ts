import type { RowDataPacket } from "mysql2";
import { db } from "../db.js";

export async function addFavourite(recipeId: number, userId: number) {
    const [result] = await db.execute(
        "INSERT INTO recipes_favourite ( recipe_id, user_id) VALUES (?, ?)",
        [recipeId, userId]
    );
    return result;
}

export async function removeFavourite(recipeId: number, userId: number) {
    const [result] = await db.execute(
        "DELETE FROM recipes_favourite WHERE recipe_id = ? AND user_id = ?",
        [recipeId, userId]
    );
    return result;
}

export async function getIsFavourite(recipeId: number, userId?: number) {
    if (userId === undefined) {
        return;
    }
    const [result] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM recipes_favourite WHERE recipe_id = ? AND user_id = ?",
        [recipeId, userId]
    );
    return result && result.length;
}