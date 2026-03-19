type ButtonAction = "add" | "remove";
type Props = {
    type: ButtonAction;
    ingredient: string;
    selectedIngredients: string[];
    dispatch: Function;
};
export default function IngredientButton({ type, ingredient, selectedIngredients, dispatch }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=IngredientButton.d.ts.map