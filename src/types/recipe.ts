export type Ingredient = {
    name: string,
    quantity: number,
    unit: Unit
}

export enum Unit {
    gr = "gr",
    mg = "mg",
    ml = "ml",
    tbs = "tbs",
    ts = "ts",
    cups = "cups",
    none = "none"
}

export type RecipeSummaryData = {
    id: number,
    title: string,
    image: string,
    ingredients: Ingredient[],
    spices: Ingredient[],
    portions: number,
    created: Date,
    favouriteCount: number | null
}

export type RecipeData = RecipeSummaryData & {
    "creator_id": number,
    user: string,
    isOwn: boolean,
    isModifiable: boolean
}

type ModifyStepData = {
    id: number,
    text: string
}

export type RecipeModifyData = RecipeData & {
    steps: ModifyStepData[],
}

export type RecipeType = "original" | "my";