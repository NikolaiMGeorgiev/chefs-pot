import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Steps({ steps }) {
    return (_jsxs("section", { className: "scrollable", children: [_jsx("h2", { children: "Steps:" }), _jsx("ol", { id: "steps-list", className: steps.length > 9 ? "list-indent-2-char" : "list-indent-1-char", children: steps.map((step, i) => _jsx("li", { children: step }, i)) })] }));
}
//# sourceMappingURL=Steps.js.map