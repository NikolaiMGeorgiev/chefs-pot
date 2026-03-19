import type { RecipeSummaryData, RecipeType } from "../../types/recipe";
type Props = {
    data: RecipeSummaryData[];
    updateUrl: Function;
    type: RecipeType;
    updateCursor: Function;
    isLoading: boolean;
};
export default function RecipesList({ data, updateUrl, type, updateCursor, isLoading }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecipesList.d.ts.map