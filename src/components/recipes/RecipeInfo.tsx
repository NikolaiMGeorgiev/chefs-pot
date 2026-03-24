import { getFormatedDate } from "../../helpers/formaters";
import DateIcon from "../icons/DateIcon";
import FavouriteIcon from "../icons/FavouriteIcon";

type Props = {
    favouriteCount: number,
    created: Date
}

export default function RecipeInfo({
    favouriteCount,
    created
}: Props) {
    return (
        <div className="recipe-summary__info-container">
            <div className="recipe-summary__info">
                <FavouriteIcon />
                <span>{favouriteCount ?? 0}</span>
                
            </div>
            <div className="recipe-summary__info">
                <DateIcon />
                <span>{getFormatedDate(created)}</span>
            </div>
        </div>
    )
}