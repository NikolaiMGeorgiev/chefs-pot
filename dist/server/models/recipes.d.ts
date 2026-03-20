import { type RowDataPacket } from "mysql2";
import type { RecipeData, SelectedRecipeTypes } from "../types/recipes.js";
export declare function getRecipesSummary(userId: number, cursor?: number): Promise<RowDataPacket[]>;
export declare function getRecipesByIngredients(ingredients: string | string[], cursor: number, userId: number): Promise<RowDataPacket[]>;
export declare function getUserRecipesByIngredients(ingredients: string | string[], userId: number, cursor: number, selectedRecipeTypes: SelectedRecipeTypes): Promise<RowDataPacket[]>;
export declare function getRecipeById(id: number): Promise<RecipeData | undefined>;
export declare function getUserRecipesSummary(userId: number, selectedRecipeTypes: SelectedRecipeTypes, cursor?: number): Promise<RowDataPacket[]>;
export declare function getModifiedRecipeById(userId: number, recipeId: number): Promise<RowDataPacket | undefined>;
export declare function addModifiedRecipe(originalRecipeId: number, userId: number, ingredients: string[], spices: string[], steps: string[], portions: number): Promise<void>;
export declare function addRecipe(title: string, userId: number, image: string, ingredients: string[], spices: string[], steps: string[], portions: number): Promise<number>;
export declare function updateRecipe(id: number, title: string, ingredients: string[], spices: string[], steps: string[], portions: number): Promise<void>;
//# sourceMappingURL=recipes.d.ts.map