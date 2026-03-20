import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/section-selector.css";
export default function SectionSelector({ section, setSection }) {
    return (_jsxs("div", { id: "section-selector", children: [_jsx("button", { id: "section-selector__ingredients-btn", className: section === "ingredients" ? "selector-btn selected" : "selector-btn", onClick: () => setSection("ingredients"), children: "Ingredients" }), _jsx("button", { id: "section-selector__steps-btn", className: section === "steps" ? "selector-btn selected" : "selector-btn", onClick: () => setSection("steps"), children: "Steps" })] }));
}
//# sourceMappingURL=SectionSelector.js.map