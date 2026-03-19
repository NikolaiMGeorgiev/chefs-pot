import type { GenericMap } from "../types/common";
import type { RecipeOriginalData, RecipeType } from "../types/recipe";
export declare function handlRecipeRowAdd(data: GenericMap, type: string, row: number): any[];
export declare function handlRecipeRowRemove(data: GenericMap, row: number): any;
export declare function handleRowValueChange(data: GenericMap, type: string, row: number, name: string, value: any): any[];
export declare function getItemEventHandlers(data: GenericMap, itemType: string, onValueChange: Function): {
    onItemAdd: (row: number) => void;
    onItemRemove: (row: number) => void;
    onValueChange: (row: number, name: string, value: any) => void;
};
export declare function getInitialRecipeVersion(initialModifiedData: RecipeOriginalData | undefined): RecipeType;
//# sourceMappingURL=recipe.d.ts.map