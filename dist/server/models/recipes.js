import {} from "mysql2";
import { RECIPES_PER_PAGE } from "../../config";
import { db } from "../db.js";
import * as helper from "../helpers/recipes.js";
export async function getRecipesSummary(userId, cursor) {
    const params = userId !== undefined ? [userId] : [];
    if (cursor) {
        params.push(cursor);
    }
    const [results] = await db.query(helper.getRecipesSummaryQuery(userId, cursor), params);
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}
export async function getRecipesByIngredients(ingredients, cursor, userId) {
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
    const [results] = await db.query(helper.getRecipesSummaryQuery(userId, cursor, filterQuery), params);
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}
export async function getUserRecipesByIngredients(ingredients, userId, cursor, selectedRecipeTypes) {
    if (userId === undefined) {
        return [];
    }
    if (typeof ingredients == "string") {
        ingredients = [ingredients];
    }
    if (!ingredients || !ingredients.length) {
        return getUserRecipesSummary(userId, selectedRecipeTypes);
    }
    const queryValues = helper.getUserRecipesSummaryQueryParams(userId, selectedRecipeTypes);
    const unionQuery = helper.getUserRecipeSummaryQuery(selectedRecipeTypes);
    let whereClause = "WHERE " + ingredients
        .map(ingredient => `(ingredients LIKE '%${ingredient}%' OR spices LIKE '%${ingredient}%')`).join(" AND ");
    if (cursor) {
        queryValues.push(cursor);
        whereClause += " AND u.id > ?";
    }
    const [results] = await db.query(`SELECT * FROM (${unionQuery}) u 
            ${whereClause}
            ORDER BY id ASC 
            LIMIT ${RECIPES_PER_PAGE}`, queryValues);
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}
export async function getRecipeById(id) {
    const [results] = await db.execute("SELECT * FROM recipes WHERE id = ?", [id]);
    helper.parseJsonFields(results, ["ingredients", "spices", "steps"]);
    helper.addRecipeImagePlaceholder(results);
    return results[0];
}
export async function getUserRecipesSummary(userId, selectedRecipeTypes, cursor) {
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
    }
    ;
    const [results] = await db.query(`SELECT * FROM (${unionQuery}) u 
            ${cursorQuery}
            ORDER BY id ASC 
            LIMIT ${RECIPES_PER_PAGE}`, queryValues);
    helper.parseJsonFields(results, ["ingredients", "spices"]);
    helper.addRecipeImagePlaceholder(results);
    return results;
}
export async function getModifiedRecipeById(userId, recipeId) {
    if (userId === undefined) {
        return;
    }
    const [results] = await db.execute("SELECT id, ingredients, spices, steps, portions FROM recipes_modified WHERE creator_id = ? AND original_id = ?", [userId, recipeId]);
    if (!results) {
        return;
    }
    helper.parseJsonFields(results, ["ingredients", "spices", "steps"]);
    return results[0];
}
export async function addModifiedRecipe(originalRecipeId, userId, ingredients, spices, steps, portions) {
    const [results] = await db.execute(`INSERT INTO recipes_modified (original_id, creator_id, ingredients, spices, steps, portions) 
        VALUES (?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE ingredients = ?, spices = ?, steps = ?, portions = ?`, [originalRecipeId, userId, ingredients, spices, steps, portions, ingredients, spices, steps, portions]);
}
export async function addRecipe(title, userId, image, ingredients, spices, steps, portions) {
    const [results] = await db.execute(`INSERT INTO recipes (title, creator_id, image, ingredients, spices, steps, portions)
        VALUES (?,?,?,?,?,?,?)`, [title, userId, image, ingredients, spices, steps, portions]);
    return results.insertId;
}
export async function updateRecipe(id, title, ingredients, spices, steps, portions) {
    const [results] = await db.execute(`UPDATE recipes
        SET title = ?, ingredients = ?, spices = ?, steps = ?, portions = ?
        WHERE id = ?`, [title, ingredients, spices, steps, portions, id]);
}
//# sourceMappingURL=recipes.js.map