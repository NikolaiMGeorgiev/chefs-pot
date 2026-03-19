import type { IngredientType, Unit } from "../../types/recipe";
type Props = {
    name: string;
    quantity: number;
    unit: Unit;
    type: IngredientType;
    row: number;
    isOnlyRow: boolean;
    onItemAdd: Function;
    onItemRemove: Function;
    onValueChange: Function;
};
export default function IngredientInputs({ name, quantity, unit, type, row, isOnlyRow, onItemAdd, onItemRemove, onValueChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=IngredientInputs.d.ts.map