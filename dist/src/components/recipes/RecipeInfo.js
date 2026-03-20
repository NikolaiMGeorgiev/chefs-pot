import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getFormatedDate } from "../../helpers/formaters";
import DateIcon from "../icons/DateIcon";
import FavouriteIcon from "../icons/FavouriteIcon";
export default function RecipeInfo({ favouriteCount, created }) {
    return (_jsxs("div", { className: "recipe-summary__info-container", children: [_jsxs("div", { className: "recipe-summary__info", children: [_jsx(FavouriteIcon, {}), favouriteCount !== null && favouriteCount !== void 0 ? favouriteCount : 0] }), _jsxs("div", { className: "recipe-summary__info", children: [_jsx(DateIcon, {}), getFormatedDate(created)] })] }));
}
//# sourceMappingURL=RecipeInfo.js.map