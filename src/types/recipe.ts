type Recipe = {
    id: number,
    title: string,
    image: string,
    ingredients: Ingredient[],
    spices: Ingredient[],
    favouriteCount: number,
    favourite: boolean
}

type RecipeModifiedData = {
    id: number, 
    ingredients: Ingredient[], 
    spices: Ingredient[], 
    steps: string[], 
    portions: number
}

type RecipeData = RecipeSummaryData & {
    "creator_id": number,
    user: string,
    isOwn: boolean,
    isModifiable: boolean
}

export type ModifyStepData = {
    id: string,
    text: string
}

export type Ingredient = {
    name: string,
    quantity: number,
    unit: Unit
}

export type Unit = "gr" | "mg" | "ml" | "tbs" | "ts" | "cups" | "none";

export type RecipeSummaryData = Recipe & {
    portions: number,
    created: Date
}

export type RecipeModifyData = RecipeData & {
    steps: ModifyStepData[],
}

export type RecipeOriginalData = RecipeData & {
    steps: string[],
}

export type RecipeResponseData = {
    recipeData: RecipeOriginalData,
    modifiedRecipeData: RecipeModifiedData,
    user: string,
    isOwn: boolean,
    favourite: boolean,
    isModifiable: boolean
}

export type NewRecipeData = {
    title: string, 
    ingredients: Ingredient[], 
    spices: Ingredient[], 
    steps: ModifyStepData[],
    portions: number,
    image: string,
}

export type RecipeType = "original" | "my";

export type IngredientType = "ingredients" | "spices";

export type SectionType = "ingredients" | "steps";

export type IngredientFilterAction = {
    value?: any;
    type: string;
};