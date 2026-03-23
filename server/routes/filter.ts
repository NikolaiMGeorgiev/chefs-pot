import type { NextFunction, Request, Response } from "express";
import { getIngredients } from "../models/ingredients.js";

export async function getSearchIngredient(req: Request, res: Response, next: NextFunction) {
    try {
        const ingredient = req.params.ingredient as string;
        const result = await getIngredients(ingredient);
        res.json({
            ingredients: result
        });
    } catch (error) {
        next(error)
    }
}
