import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import RecipesFilter from "../recipes-filter/RecipesFilter";
import RecipeSummary from "./RecipeSummary";
import Loader from "../common/Loader";
export default function RecipesList({ data, updateUrl, type, updateCursor, isLoading }) {
    const handleScroll = (e) => {
        if (!data.length) {
            return;
        }
        const target = e.target;
        const height = target.clientHeight;
        const scrollPosition = Math.ceil(target.scrollTop);
        const totalHeight = target.scrollHeight;
        if (height + scrollPosition >= totalHeight) {
            const lastItem = data[data.length - 1];
            updateCursor(lastItem.id);
        }
    };
    const getRecipesComponents = () => {
        if (data.length) {
            return (_jsxs(_Fragment, { children: [data.map(recipe => _jsx(RecipeSummary, Object.assign({ type: type }, recipe), recipe.id)), isLoading &&
                        _jsx("div", { className: "loader__contaner", children: _jsx(Loader, {}) })] }));
        }
        else if (isLoading) {
            return (_jsxs("div", { className: "loader__contaner", children: [_jsx(Loader, {}), _jsx("p", { children: "Loading..." })] }));
        }
        else {
            return (_jsx("p", { className: "recipes-empty-text", children: data.length ?
                    "No recipes match filter. Try removing some ingredients from the filter." :
                    "No recipes found." }));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(RecipesFilter, { updateUrl: updateUrl, recipesType: type }), _jsx("div", { id: "recipes", onScroll: handleScroll, children: getRecipesComponents() })] }));
}
//# sourceMappingURL=RecipesList.js.map