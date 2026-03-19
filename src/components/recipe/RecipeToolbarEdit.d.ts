import type { MouseEventHandler } from "react";
import "../../styles/recipe-toolbar.css";
type Props = {
    portions: number;
    onCancelEdit: MouseEventHandler<HTMLButtonElement>;
    onValueChange: Function;
};
export default function RecipeToolbarEdit({ portions, onCancelEdit, onValueChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecipeToolbarEdit.d.ts.map