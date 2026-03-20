import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipe-version.css";
export default function RecipeVersion({ version, onVersionChange, hasModifiedData }) {
    return (_jsxs("div", { id: "recipe-version", children: [_jsx("button", { id: "recipe-version__original-btn", className: version == "original" ? "selected" : "", onClick: () => onVersionChange("original"), children: "Original recipe" }), _jsx("button", { id: "recipe-version__my-recipe-btn", className: version == "my" ? "selected" : "", disabled: !hasModifiedData, title: "Modify recipe to create your own version", onClick: () => onVersionChange("my"), children: "My recipe" })] }));
}
//# sourceMappingURL=RecipeVersion.js.map