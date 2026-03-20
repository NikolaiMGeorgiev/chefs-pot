import type { FavouriteButtonAction } from "../types/common";
import type { LoginData, ProfileData, RegistrationData } from "../types/data";
import type { Ingredient, RecipeModifyData } from "../types/recipe";
export declare function updateRecipe(data: RecipeModifyData): Promise<Response>;
export declare function sendNewRecipe(data: RecipeModifyData): Promise<Response>;
export declare function sendRegistration(data: RegistrationData): Promise<Response>;
export declare function sendLogin(data: LoginData): Promise<Response>;
export declare function sendProfileUpdate(data: ProfileData): Promise<Response>;
export declare function sendFavourite(recipeId: number, action: FavouriteButtonAction): Promise<Response>;
export declare function getIngredients(ingredient: string): Promise<Response>;
export declare function normalizeIngredients(ingredients: Ingredient[]): {
    unit: import("../types/recipe").Unit;
    name: string;
    quantity: number;
}[];
export declare function isResponseJSON(response: Response): boolean | "" | null | undefined;
//# sourceMappingURL=data.d.ts.map