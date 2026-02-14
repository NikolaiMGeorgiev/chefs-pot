import { useState } from "react";
import FavouriteIcon from "../icons/FavouriteIcon";
import { sendFavourite } from "../../helpers/data";

export default function FavouriteButton({ recipeId, isFavouriteInitial }) {
    const [isFavourite, setIsFavourite] = useState(isFavouriteInitial);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsFavourite(!isFavourite);
        sendFavourite(recipeId, isFavourite ? "remove" : "add");
    }

    return (
        <div className={isFavourite ? "favourite-btn active" : "favourite-btn"} onClick={handleClick}>
            <FavouriteIcon />
        </div>
    )
}