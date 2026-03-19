import type { MouseEventHandler } from "react";
import "../../styles/recipe-toolbar.css";
type Props = {
    portions: number;
    isOwn: boolean;
    onPortionChange: Function;
    onEditClick: MouseEventHandler<HTMLButtonElement>;
};
export default function RecipeToolbar({ portions, isOwn, onPortionChange, onEditClick }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecipeToolbar.d.ts.map