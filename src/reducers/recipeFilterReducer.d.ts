import type { GenericMap } from "../types/common";
type StateProps = {
    value: string;
    isExpanded: boolean;
    selectedIngredients: string[];
    filteredIngredients: string[];
    isLoading: boolean;
};
export default function recipeFilterReducer(state: StateProps, action: GenericMap): {
    value: any;
    isExpanded: boolean;
    selectedIngredients: string[];
    filteredIngredients: string[];
    isLoading: boolean;
} | {
    selectedIngredients: any[];
    value: string;
    isExpanded: boolean;
    filteredIngredients: string[];
    isLoading: boolean;
} | {
    filteredIngredients: any;
    value: string;
    isExpanded: boolean;
    selectedIngredients: string[];
    isLoading: boolean;
} | {
    isLoading: any;
    value: string;
    isExpanded: boolean;
    selectedIngredients: string[];
    filteredIngredients: string[];
};
export {};
//# sourceMappingURL=recipeFilterReducer.d.ts.map