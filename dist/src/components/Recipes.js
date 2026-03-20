import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/recipes.css";
import { useState } from "react";
import RecipesList from "./recipes/RecipesList";
import { HOST, HSOT_PORT } from "../../config";
import useDataFetch from "../hooks/useDataFetch";
export default function Recipes() {
    const [url, setUrl] = useState(`${HOST}:${HSOT_PORT}/recipes`);
    let { isLoading, data, setData, } = useDataFetch(url);
    const updateUrl = (newUrl) => {
        setData([]);
        setUrl(newUrl);
    };
    const updateCursor = (newCursor) => {
        if (url.indexOf("cursor") != -1) {
            setUrl(url.replace(/cursor=[0-9]+/, `cursor=${newCursor}`));
        }
        else if (url.indexOf("?") != -1) {
            setUrl(url + `&cursor=${newCursor}`);
        }
        else {
            setUrl(url + `?cursor=${newCursor}`);
        }
    };
    return (_jsxs("div", { id: "recipes__wrapper", children: [_jsx("div", { id: "recipes__header", children: _jsx("h1", { children: "Recipes" }) }), _jsx(RecipesList, { data: data, updateUrl: updateUrl, updateCursor: updateCursor, isLoading: isLoading, type: "original" })] }));
}
//# sourceMappingURL=Recipes.js.map