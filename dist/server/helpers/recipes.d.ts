import type { RowDataPacket } from "mysql2";
import type { SelectedRecipeTypes } from "../types/recipes";
export declare function getRecipesSummaryQuery(userId: number, cursor?: number, additionalWhereClause?: string): string;
export declare function getUserRecipeSummaryQuery(selectedRecipeTypes: SelectedRecipeTypes): string | null;
export declare function getUserRecipesSummaryQueryParams(userId: number, selectedRecipeTypes: SelectedRecipeTypes): number[];
export declare function parseJsonFields(data: RowDataPacket[], fields: string[]): void;
export declare function addRecipeImagePlaceholder(data: RowDataPacket[]): void;
//# sourceMappingURL=recipes.d.ts.map