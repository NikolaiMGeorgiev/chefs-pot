export type SelectedRecipeTypes = {
    favourite?: string,
    modified?: string,
    own?: string
}

export type RecipeData = {
    id: number,
    title: string,
    creator_id: number,
    image: string,
    ingredients: string,
    spices: string,
    steps: string,
    portions: number,
    created: string
}

export type ModifiedRecipeData = {
    id: number,
    ingredients: string,
    spices: string,
    steps: string,
    portions: number
}