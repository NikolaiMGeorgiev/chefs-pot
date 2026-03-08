import { useNavigate } from "react-router-dom"
import IngredientsSummary from "./IngredientsSummary"
import SingleRowTitle from "../common/SingleRowTitle";
import FavouriteButton from "../common/FavouriteButton";
import RecipeInfo from "./RecipeInfo";
import type { RecipeSummaryData, RecipeType } from "../../types/recipe";

type Props = RecipeSummaryData & { type: RecipeType }

export default function RecipeSummary({ 
    id, 
    title, 
    image, 
    ingredients, 
    spices, 
    type, 
    favourite, 
    favouriteCount, 
    created 
}: Props) {
    const navigator = useNavigate();

    return (
        <article className="recipe-summary" onClick={() => navigator(`/recipes/${id}${type == "my" ? "?section=my" : ""}`)}>
            {
                favourite !== undefined &&
                <FavouriteButton recipeId={id} isFavouriteInitial={favourite} />
            }
            <SingleRowTitle title={title} Header="h3" />
            <section className="recipe-summary__container">
                <img src={`/files/${image}`} />
                <IngredientsSummary ingredients={ingredients} spices={spices} />
            </section>
            <RecipeInfo favouriteCount={favouriteCount} created={created} />
        </article>
    )
}