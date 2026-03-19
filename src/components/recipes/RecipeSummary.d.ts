import type { RecipeSummaryData, RecipeType } from "../../types/recipe";
type Props = RecipeSummaryData & {
    type: RecipeType;
};
export default function RecipeSummary({ id, title, image, ingredients, spices, type, favourite, favouriteCount, created }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecipeSummary.d.ts.map