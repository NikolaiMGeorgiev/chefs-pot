import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import IngredientsSummary from "./IngredientsSummary";
import SingleRowTitle from "../common/SingleRowTitle";
import FavouriteButton from "../common/FavouriteButton";
import RecipeInfo from "./RecipeInfo";
export default function RecipeSummary({ id, title, image, ingredients, spices, type, favourite, favouriteCount, created }) {
    const navigator = useNavigate();
    return (_jsxs("article", { className: "recipe-summary", onClick: () => navigator(`/recipes/${id}${type == "my" ? "?section=my" : ""}`), children: [favourite !== undefined &&
                _jsx(FavouriteButton, { recipeId: id, isFavouriteInitial: favourite }), _jsx(SingleRowTitle, { title: title, Header: "h3" }), _jsxs("section", { className: "recipe-summary__container", children: [_jsx("img", { src: `/files/${image}` }), _jsx(IngredientsSummary, { ingredients: ingredients, spices: spices })] }), _jsx(RecipeInfo, { favouriteCount: favouriteCount, created: created })] }));
}
//# sourceMappingURL=RecipeSummary.js.map