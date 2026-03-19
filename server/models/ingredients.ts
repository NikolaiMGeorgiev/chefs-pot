import type { RowDataPacket } from "mysql2";
import { db } from "../db.js";

export async function getIngredients(ingredient: string) {
    const [result] = await db.query<RowDataPacket[]>(`
        SELECT name FROM ingredients WHERE name LIKE ?
    `, [`%${ingredient}%`]
    );

    if (!result) {
        return [];
    }

    return result.map(ingredient => ingredient.name);
}