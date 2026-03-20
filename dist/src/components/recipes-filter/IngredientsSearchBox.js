import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ExIcon from "../icons/ExIcon";
export default function IngredientsSearchBox({ filterValue, dispatch }) {
    return (_jsxs("div", { id: "recipe-filter__searchbox", children: [_jsx("img", { id: "recipe-filter__search-icon", src: "/images/search-icon.png" }), _jsx("input", { id: "recipe-filter__field", name: "search", type: "text", value: filterValue, autoComplete: "off", placeholder: "Search ingredients", onChange: (e) => dispatch({ type: "update_value", value: e.target.value }) }), _jsx("button", { className: "icon-btn", type: "button", onClick: () => dispatch({ type: "clear" }), children: _jsx(ExIcon, {}) })] }));
}
//# sourceMappingURL=IngredientsSearchBox.js.map