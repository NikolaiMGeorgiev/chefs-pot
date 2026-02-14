import { getFormatedDate } from "../../helpers/formaters";
import DateIcon from "../icons/DateIcon";
import FavouriteIcon from "../icons/FavouriteIcon";

export default function RecipeInfo({
    favouriteCount,
    created
}) {
    return (
        <div className="recipe-summary__info-container">
            <div className="recipe-summary__info">
                <FavouriteIcon />
                {favouriteCount ?? 0}
            </div>
            <div className="recipe-summary__info">
                <DateIcon />
                {getFormatedDate(created)}
            </div>
        </div>
    )
}