import type { GenericMap } from "../types/common";
import type { LoginData, ProfileData, RegistrationData } from "../types/data";
import type { NewRecipeData, RecipeModifyData } from "../types/recipe";
export declare function validateData(data: GenericMap, validationData: GenericMap): true | GenericMap;
export declare function getErrorTexts(errorData: GenericMap, texts: {
    [key: string]: {
        [innerKey: string]: string;
    };
}): {
    [key: string]: string | object | any[];
};
export declare function validateNewRecipeForm(data: NewRecipeData): true | {
    [key: string]: string | object | any[];
};
export declare function validateModifiedRecipeForm(data: RecipeModifyData): true | {
    [key: string]: string | object | any[];
};
export declare function validateRegisterForm(data: RegistrationData): true | {
    [key: string]: string | object | any[];
};
export declare function validateLoginForm(data: LoginData): true | {
    [key: string]: string | object | any[];
};
export declare function validateProfileForm(data: ProfileData): true | {
    [key: string]: string | object | any[];
};
export declare function getSinglePasswordError(errors: object | string[]): any;
//# sourceMappingURL=validation.d.ts.map