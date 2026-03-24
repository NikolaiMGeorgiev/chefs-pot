import { useState, type UIEvent } from "react";
import FavouriteIcon from "../icons/FavouriteIcon";
import { sendFavourite } from "../../helpers/data";

type Props = {
    recipeId: number,
    isFavouriteInitial: boolean
}

export default function FavouriteButton({ recipeId, isFavouriteInitial }: Props) {
    const [isFavourite, setIsFavourite] = useState(isFavouriteInitial);

    const handleClick = (e: UIEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsFavourite(!isFavourite);
        sendFavourite(recipeId, isFavourite ? "remove" : "add");
    }

    return (
        <button className={isFavourite ? "favourite-btn active" : "favourite-btn"} onClick={handleClick}>
            <FavouriteIcon />
        </button>
    )
}