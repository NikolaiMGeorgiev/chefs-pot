export declare function addFavourite(recipeId: number, userId: number): Promise<import("mysql2").QueryResult>;
export declare function removeFavourite(recipeId: number, userId: number): Promise<import("mysql2").QueryResult>;
export declare function getIsFavourite(recipeId: number, userId: number): Promise<number | undefined>;
//# sourceMappingURL=favourites.d.ts.map