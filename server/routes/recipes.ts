import { type NextFunction, type Request, type Response } from "express";
import { 
    addModifiedRecipe, 
    addRecipe, 
    getModifiedRecipeById, 
    getRecipeById, 
    getRecipesByIngredients, 
    getRecipesSummary, 
    getUserRecipesByIngredients, 
    getUserRecipesSummary, 
    updateRecipe 
} from "../models/recipes.js";
import { addFavourite, getIsFavourite, removeFavourite } from "../models/favourites.js";
import { getUserById } from "../models/users.js";
import type { Ingredient, SelectedRecipeTypes } from "../types/recipes";
import { newRecipeValidationData, validateData } from "../../lib/validator.js";
import { getUserIdFromToken } from "../helpers/recipes.js"


export async function getAllRecipes(req: Request, res: Response, next: NextFunction) {
    try {
        const { cursor } = req.query;
        const userId = getUserIdFromToken(req);
        const results = await getRecipesSummary(userId, Number(cursor ? cursor: 0));
        res.json(results);
    } catch (error) {
        next(error)
    }
}

export async function getRecipe (req: Request, res: Response, next: NextFunction) {
    try {
        const userId = getUserIdFromToken(req)
        const recipeData = await getRecipeById(Number(req.params.recipeId));
        if (!recipeData) {
            throw new Error("invalid recipe ID");
        }
        const isFavourite = await getIsFavourite(Number(req.params.recipeId), userId);
        const userData = await getUserById(recipeData["creator_id"]);
        const modifiedRecipeData = await getModifiedRecipeById(recipeData.id, userId);

        if (!userData) {
            throw new Error("invalid user ID");
        }
        
        res.json({
            recipeData,
            modifiedRecipeData,
            user: userData["first_name"] + " " + userData["last_name"],
            isOwn: recipeData["creator_id"] == userId,
            favourite: isFavourite,
            isModifiable: userId !== undefined
        });
    } catch (error) {
        next(error)
    }
}

export async function getMyRecipes(req: Request, res: Response, next: NextFunction) {
    try {
        const { cursor, types } = req.query as { cursor?: number, types?: string | string[] };
        if (!types) {
            res.json([]);
        }
        const recipeTypes = typeof types == "string" ? [types] : types;
        const selectedRecipeTypes: SelectedRecipeTypes = {};
        recipeTypes?.forEach((recipeType: string) => {
            selectedRecipeTypes[recipeType as keyof SelectedRecipeTypes] = recipeType;
        });
        const userId = getUserIdFromToken(req);
        const results = await getUserRecipesSummary(selectedRecipeTypes, cursor, userId);
        res.json(results);
    } catch (error) {
        next(error)
    }
}

export async function getFilteredRecipes(req: Request, res: Response, next: NextFunction) {
    try {
        const { cursor, ingr, type, types } = req.query as { 
            cursor?: number, 
            ingr?: string | string[], 
            type?: string, 
            types?: string | string[] 
        };
        const recipeTypes = typeof types == "string" ? [types] : types;
        const selectedRecipeTypes: SelectedRecipeTypes = {};
        recipeTypes?.forEach((recipeType: string) => {
            selectedRecipeTypes[recipeType as keyof SelectedRecipeTypes] = recipeType;
        })
        const userId = getUserIdFromToken(req);
        const result = await (type == "my" ? 
            getUserRecipesByIngredients(ingr ? ingr : "", Number(cursor), selectedRecipeTypes, userId) :
            getRecipesByIngredients(ingr ? ingr : "", Number(cursor), userId)
        );
        res.json(result);
    } catch (error) {
        next(error)
    }
}

export async function createModifiedRecipe(req: Request, res: Response, next: NextFunction) {
    try {
        const originalRecipeId = req.params.recipeId;
        const {
            ingredients,
            spices,
            steps,
            portions

        } = req.body;
        const userId = getUserIdFromToken(req);
        if (userId === undefined) {
            throw new Error("Invalid request");
        }
        await addModifiedRecipe(Number(originalRecipeId), userId, ingredients, spices, steps, portions);
        res.send();
    } catch (error) {
        next(error)
    }
}

export async function updateOriginalRecipe(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            ingredients,
            spices,
            steps,
            portions,
            title,
        } = req.body;
        const recipeId = req.params.recipeId;
        const userId = getUserIdFromToken(req);
        const recipeData = await getRecipeById(Number(recipeId));

        if (!recipeData || userId === undefined) {
            throw new Error("Invalid resipe request")
        }

        if (recipeData["creator_id"] != userId) {
            return res.status(401).send();
        }
        await updateRecipe(Number(recipeId), title, ingredients, spices, steps, portions);
        res.send();
    } catch (error) {
        next(error)
    }
}

export async function createOriginalRecipe(req: Request, res: Response, next: NextFunction) {
    try {
        const {title, ingredients, spices, steps, portions} = req.body;
        const image = req.file ? req.file.fieldname : '';

        const validationResult = validateData({
            "ingredients-name": JSON.parse(ingredients).map((ingredient: Ingredient) => ingredient.name),
            "ingredients-quantity": JSON.parse(ingredients).map((ingredient: Ingredient) => ingredient.quantity),
            "ingredients-unit": JSON.parse(ingredients).map((ingredient: Ingredient) => ingredient.unit),
            "spices-name": JSON.parse(spices).map((spice: Ingredient) => spice.name),
            "spices-quantity": JSON.parse(spices).map((spice: Ingredient) => spice.quantity),
            "spices-unit": JSON.parse(spices).map((spice: Ingredient) => spice.unit),
            steps: JSON.parse(steps),
            title,
            portions
        }, newRecipeValidationData);

        if (validationResult !== true) {
            res.status(400).send("Invalid data");
        }

        const userId = getUserIdFromToken(req);

        if (userId === undefined) {
            throw new Error("Invalid request");
        }

        const newReicpeId = await addRecipe(
            title, 
            userId,
            image, 
            ingredients, 
            spices, 
            steps, 
            portions
        );
        res.json({
            data: newReicpeId
        });
    } catch (error) {
        next(error)
    }
}


export async function updateFavouriteRecipe(req: Request, res: Response, next: NextFunction) {
    try {
        const { recipeId, action } = req.body;
        const userId= getUserIdFromToken(req);
        if (userId === undefined) {
            throw new Error("Invalid request");
        }
        const result = action == "add" ? 
            await addFavourite(recipeId, userId) : 
            await removeFavourite(recipeId, userId);
        res.send();
    } catch (error) {
        next(error)
    }
}