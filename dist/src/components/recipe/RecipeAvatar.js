import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipe-avatar.css";
import SingleRowTitle from "../common/SingleRowTitle";
export default function RecipeAvatar({ user }) {
    return (_jsxs("div", { id: "recipe-avatar", children: [_jsx("img", { src: "/images/avatar.png" }), _jsx(SingleRowTitle, { title: `Chef ${user}`, Header: "h3" })] }));
}
//# sourceMappingURL=RecipeAvatar.js.map