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
        const totalHeight = target.scrollHeight
        if (height + scrollPosition >= totalHeight) {
            const lastItem = data[data.length - 1];
            updateCursor(lastItem.id);
        }
    }

    const getRecipesComponents = () => {
        if (data.length) {
            return (
                <>
                    {data.map(recipe =>
                        <RecipeSummary key={recipe.id} type={type} {...recipe} />)}
                        { isLoading && 
                            <div className="loader__contaner">
                                <Loader/>
                            </div>}
                    
                </>
            )
        } else if (isLoading) {
            return (
                <div className="loader__contaner">
                    <Loader/>
                    <p>Loading...</p>
                </div>
            )
        } else {
            return (
                <p className="recipes-empty-text">
                    { data.length ? 
                        "No recipes match filter. Try removing some ingredients from the filter." :
                        "No recipes found." }
                </p>
            )
        }
    }

    return (
        <>
            <RecipesFilter updateUrl={updateUrl} recipesType={type} />
            <div id="recipes" onScroll={handleScroll}>
                {getRecipesComponents()}
            </div>
        </>
    )
}