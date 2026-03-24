import { type RowDataPacket, type ResultSetHeader } from "mysql2";
import { RECIPES_PER_PAGE } from "../config.js";
import { db } from "../db.js";
import * as helper from "../helpers/recipes.js";
import type { RecipeData, SelectedRecipeTypes } from "../types/recipes.js";

export async function getRecipesSummary(userId?: number, cursor?: number) {
    const params = userId !== undefined ? [userId] : [];
    if (cursor) {
        params.push(cursor);
    }
    const [results] = await db.query<RowDataPacket[]>(
        helper.getRecipesSummaryQuery(userId, cursor),
        params
    );
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}

export async function getRecipesByIngredients(ingredients: string | string[], cursor: number, userId?: number) {
    if (typeof ingredients == "string") {
        ingredients = [ingredients];
    }
    if (!ingredients || !ingredients.length) {
        return getRecipesSummary(userId);
    }
    const filterQuery = ingredients
        .map(ingredient => `(ingredients LIKE '%${ingredient}%' OR spices LIKE '%${ingredient}%')`)
            .join(" AND ");
    const params = [];
    if (userId !== undefined) {
        params.push(userId);
    }
    if (cursor) {
        params.push(cursor);
    }
    const [results] = await db.query<RowDataPacket[]>(
        helper.getRecipesSummaryQuery(userId, cursor, filterQuery),
        params
    );
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}

export async function getUserRecipesByIngredients(
    ingredients: string | string[], 
    cursor: number, 
    selectedRecipeTypes: SelectedRecipeTypes,
    userId?: number
) {
    if (userId === undefined) {
        return [];
    }
    if (typeof ingredients == "string") {
        ingredients = [ingredients];
    }
    if (!ingredients || !ingredients.length) {
        return getUserRecipesSummary(selectedRecipeTypes, 0, userId);
    }

    const queryValues = helper.getUserRecipesSummaryQueryParams(userId, selectedRecipeTypes);
    const unionQuery = helper.getUserRecipeSummaryQuery(selectedRecipeTypes);    
    let whereClause = "WHERE " + ingredients
        .map(ingredient => `(ingredients LIKE '%${ingredient}%' OR spices LIKE '%${ingredient}%')`).join(" AND ");

    if (cursor) {
        queryValues.push(cursor);
        whereClause += " AND u.id > ?";
    }

    const [results] = await db.query<RowDataPacket[]>(
        `SELECT * FROM (${unionQuery}) u 
            ${whereClause}
            ORDER BY id ASC 
            LIMIT ${RECIPES_PER_PAGE}`, 
        queryValues);
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}

export async function getRecipeById(id: number) {
    const [results] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM recipes WHERE id = ?",
        [id]
    );
    helper.parseJsonFields(results, ["ingredients", "spices", "steps"]);
    helper.addRecipeImagePlaceholder(results);
    return (results as RecipeData[])[0];
}

export async function getUserRecipesSummary(selectedRecipeTypes: SelectedRecipeTypes, cursor?: number, userId?: number) {
    if (userId === undefined) {
        return [];
    }
    const queryValues = helper.getUserRecipesSummaryQueryParams(userId, selectedRecipeTypes);
    const unionQuery = helper.getUserRecipeSummaryQuery(selectedRecipeTypes);

    if (!unionQuery) {
        return [];
    }

    let cursorQuery = "";
    if (cursor) {
        cursorQuery = "WHERE id > ?";
        queryValues.push(cursor);
    };

    const [results] = await db.query<RowDataPacket[]>(
        `SELECT * FROM (${unionQuery}) u 
            ${cursorQuery}
            ORDER BY id ASC 
            LIMIT ${RECIPES_PER_PAGE}`, 
        queryValues);

    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);

    return results;
}


export async function getModifiedRecipeById(recipeId: number, userId?: number) {
    if (userId === undefined) {
        return;
    }
    const [results] = await db.execute<RowDataPacket[]>(
        "SELECT id, ingredients, spices, steps, portions FROM recipes_modified WHERE creator_id = ? AND original_id = ?",
        [userId, recipeId]
    );
    if (!results) {
        return;
    }
    helper.parseJsonFields(results, ["ingredients", "spices", "steps"]);
    return results[0];
}

export async function addModifiedRecipe(
    originalRecipeId: number, 
    userId: number, 
    ingredients: string[], 
    spices: string[], 
    steps: string[], 
    portions: number
) {
    const [results] = await db.execute(
        `INSERT INTO recipes_modified (original_id, creator_id, ingredients, spices, steps, portions) 
        VALUES (?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE ingredients = ?, spices = ?, steps = ?, portions = ?`,
        [originalRecipeId, userId, ingredients, spices, steps, portions, ingredients, spices, steps, portions]
    )
}

export async function addRecipe(
    title: string, 
    userId: number, 
    image: string, 
    ingredients: string[], 
    spices: string[], 
    steps: string[], 
    portions: number
) {
    const [results] = await db.execute<ResultSetHeader>(
        `INSERT INTO recipes (title, creator_id, image, ingredients, spices, steps, portions)
        VALUES (?,?,?,?,?,?,?)`,
        [title, userId, image, ingredients, spices, steps, portions]
    );
    return results.insertId;
}

export async function updateRecipe(
    id: number, 
    title: string, 
    ingredients: string[], 
    spices: string[], 
    steps: string[], 
    portions: number
) {
    const [results] = await db.execute(
        `UPDATE recipes
        SET title = ?, ingredients = ?, spices = ?, steps = ?, portions = ?
        WHERE id = ?`,
        [title, ingredients, spices, steps, portions, id]
    );
}
