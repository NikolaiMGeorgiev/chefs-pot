import { RECIPES_PER_PAGE } from "../../config";
export function getRecipesSummaryQuery(userId, cursor, additionalWhereClause = "") {
    const whereParams = [];
    if (cursor) {
        whereParams.push("r.id > ?");
    }
    if (additionalWhereClause) {
        whereParams.push(additionalWhereClause);
    }
    const whereClause = whereParams.length ?
        "WHERE " + whereParams.join(" AND ") :
        "";
    return `
        SELECT r.id, title, image, ingredients, spices, portions, created,  favouriteCount 
        ${userId !== undefined ? ",favourite " : ""}
        FROM recipes r 
        ${userId !== undefined ? getIsFavouriteQuery() : ""} 
        ${getFavouriteCountQuery()}
        ${whereClause} 
        LIMIT ${RECIPES_PER_PAGE}
    `;
}
export function getUserRecipeSummaryQuery(selectedRecipeTypes) {
    const queryList = [];
    if (selectedRecipeTypes.favourite) {
        queryList.push(`(SELECT r.id, title, image, r.ingredients, r.spices, r.portions, created, favouriteCount, 
            CASE
                WHEN rf.recipe_id IS NULL THEN false
                ELSE true
            END as favourite
            FROM recipes_favourite rf
            LEFT JOIN recipes r ON r.id = rf.recipe_id AND rf.user_id = ?
            LEFT JOIN recipes_modified rm ON rf.id = rm.original_id
            ${getFavouriteCountQuery()}
            ${selectedRecipeTypes.modified ? (selectedRecipeTypes.own ?
            "WHERE rm.id IS NULL AND NOT r.creator_id = ?" :
            "WHERE rm.id IS NULL")
            : ""})`);
    }
    if (selectedRecipeTypes.modified) {
        queryList.push(`(SELECT r.id, title, image, rm.ingredients, rm.spices, rm.portions, created, favouriteCount, 
            CASE
                WHEN rf.recipe_id IS NULL THEN false
                ELSE true
            END as favourite
            FROM recipes_modified rm 
            JOIN recipes r ON rm.original_id = r.id 
            LEFT JOIN recipes_favourite rf ON r.id = rf.recipe_id AND rf.user_id = ?
            ${getFavouriteCountQuery()}
            WHERE rm.creator_id = ? ${selectedRecipeTypes.favourite ? "AND rf.recipe_id IS NULL" : ""})`);
    }
    if (selectedRecipeTypes.own) {
        queryList.push(`(SELECT r.id, r.title, r.image, r.ingredients, r.spices, r.portions, created, favouriteCount, 
            CASE
                WHEN rf.recipe_id IS NULL THEN false
                ELSE true
            END as favourite
            FROM recipes r 
            LEFT JOIN recipes_modified rm ON rm.original_id = r.id
            LEFT JOIN recipes_favourite rf ON r.id = rf.recipe_id AND rf.user_id = ?
            ${getFavouriteCountQuery()}
            WHERE r.creator_id = ? AND rm.id IS NULL)`);
    }
    return queryList.length ? queryList.join(" UNION ") : null;
}
export function getUserRecipesSummaryQueryParams(userId, selectedRecipeTypes) {
    const queryValues = [];
    if (userId === undefined) {
        return [];
    }
    if (selectedRecipeTypes.favourite) {
        queryValues.push(userId);
        if (selectedRecipeTypes.own) {
            queryValues.push(userId);
        }
    }
    if (selectedRecipeTypes.modified) {
        queryValues.push(userId, userId);
    }
    if (selectedRecipeTypes.own) {
        queryValues.push(userId, userId);
    }
    return queryValues;
}
export function parseJsonFields(data, fields) {
    for (let single of data) {
        for (let field of fields) {
            single[field] = JSON.parse(single[field]);
        }
    }
}
export function addRecipeImagePlaceholder(data) {
    for (let single of data) {
        if (!single.image) {
            single.image = "placeholder.jpg";
        }
    }
}
function getFavouriteCountQuery() {
    return `
        LEFT JOIN (
            SELECT recipe_id, COUNT(*) as favouriteCount
            FROM recipes_favourite 
            GROUP BY recipe_id
        ) rff ON r.id = rff.recipe_id
    `;
}
function getIsFavouriteQuery() {
    return `
        LEFT JOIN (
            SELECT CASE
                WHEN recipe_id IS NULL THEN false
                ELSE true
            END as favourite
            FROM recipes_favourite 
            WHERE user_id = ?
        ) rf ON r.id = rf.favourite
    `;
}
//# sourceMappingURL=recipes.js.map