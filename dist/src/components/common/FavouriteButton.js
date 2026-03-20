import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import FavouriteIcon from "../icons/FavouriteIcon";
import { sendFavourite } from "../../helpers/data";
export default function FavouriteButton({ recipeId, isFavouriteInitial }) {
    const [isFavourite, setIsFavourite] = useState(isFavouriteInitial);
    const handleClick = (e) => {
        e.stopPropagation();
        setIsFavourite(!isFavourite);
        sendFavourite(recipeId, isFavourite ? "remove" : "add");
    };
    return (_jsx("div", { className: isFavourite ? "favourite-btn active" : "favourite-btn", onClick: handleClick, children: _jsx(FavouriteIcon, {}) }));
}
//# sourceMappingURL=FavouriteButton.js.map