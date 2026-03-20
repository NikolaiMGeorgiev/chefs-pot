import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipesList from "./recipes/RecipesList";
import RecipeTypeSelector, { recipeTypes } from "./recipes/RecipeTypeSelector";
import useDataFetch from "../hooks/useDataFetch";
import { HOST, HSOT_PORT } from "../config";

export default function MyRecipes() {
    const navigator = useNavigate();
    const [selectedTypes, setSelectedTypes] = useState(recipeTypes.map(typeData => typeData.type));

    const urlParams = getUrlParams();
    const [url, setUrl] = useState(
        `${HOST}:${HSOT_PORT}/api/my-recipes${urlParams ? `?${urlParams}` : ""}`
    );
    const {
        isLoading,
        data,
        setData
    } = useDataFetch(url);

    function getUrlParams(recipeTpyes = selectedTypes) {
        const params = [];
        if (recipeTpyes.length) {
            params.push(...(recipeTpyes.map(recipeType => `types=${recipeType}`)))
        }
        return params.length ? params.join("&") : "";
    }

    const updateUrl = (newUrl: string) => {
        const urlParams = getUrlParams();
        if (urlParams) {
            if (newUrl.indexOf("?") != -1) {
                newUrl += `&${urlParams}`;
            } else {
                newUrl += `?${urlParams}`;
            }
        }
        setData([]);
        setUrl(newUrl);
    }

    const updateCursor = (newCursor: number) => {
        if (url.indexOf("cursor") != -1) {
            setUrl(url.replace(/cursor=[0-9]+/, `cursor=${newCursor}`));
        } else if (url.indexOf("?") != -1) {
            setUrl(url + `&cursor=${newCursor}`)
        } else {
            setUrl(url + `?cursor=${newCursor}`)
        }
    }

    const updateSelectedRecipeTypes = (newTypes: string[]) => {
        let newUrl = url
            .replace(/types=[^&]+&?/g, "")
            .replace(/cursor=[0-9]+&?/, "");
        newUrl += getUrlParams(newTypes);
        setData([]);
        setSelectedTypes(newTypes);
        setUrl(newUrl);
    }

    return (
        <div id="recipes__wrapper">
            <div id="recipes__header">
                <h1>My Recipes</h1>
                <button 
                    id="recipes__create-btn" 
                    className="button" 
                    onClick={() => navigator("/add-recipe")}
                >Create recipe</button>
                <RecipeTypeSelector selectedTypes={selectedTypes} setSelectedTypes={updateSelectedRecipeTypes} />
            </div>
            <RecipesList 
                data={data} 
                updateUrl={updateUrl} 
                updateCursor={updateCursor} 
                isLoading={isLoading} 
                type="my" 
            />
        </div>
    )
}