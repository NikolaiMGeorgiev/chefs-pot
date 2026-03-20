import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/recipe.css";
import { useNavigate, useParams } from "react-router-dom";
import Ingredients from "./recipe/Ingredients";
import Steps from "./recipe/Steps";
import { useState } from "react";
import { normalizeIngredients } from "../helpers/data";
import RecipeVersion from "./recipe/RecipeVersion";
import SectionSelector from "./recipe/SectionSelector";
import RecipeAvatar from "./recipe/RecipeAvatar";
import RecipeToolbar from "./recipe/RecipeToolbar";
import { DataLoader } from "./common/DataLoader";
import { HOST, HSOT_PORT } from "../../config";
import ValidatedForm from "./common/ValidatedForm";
import Popup from "./common/Popup";
import FavouriteButton from "./common/FavouriteButton";
import useRecipePortions from "../hooks/useRecipePortions";
import { getInitialRecipeVersion } from "../helpers/recipe";
import ModifiedRecipeForm from "./recipe/ModifiedRecipeForm";
import { v4 as uuid } from "uuid";
import Modal from "./common/Modal";
import {} from "../types/recipe";
export default function RecipeLoader() {
    const { id } = useParams();
    const [data, setData] = useState({});
    return (_jsx(DataLoader, { setData: setData, url: `${HOST}:${HSOT_PORT}/api/recipes/${id}`, children: _jsx(Recipe, { initialData: data, id: Number.parseInt(id) }) }));
}
export function Recipe({ initialData, id }) {
    const navigator = useNavigate();
    const { user, isOwn, isModifiable } = initialData;
    const initialModifiedData = initialData.modifiedRecipeData;
    if (initialModifiedData) {
        initialModifiedData.ingredients = normalizeIngredients(initialModifiedData.ingredients);
        initialModifiedData.spices = normalizeIngredients(initialModifiedData.spices);
    }
    initialData.recipeData.ingredients = normalizeIngredients(initialData.recipeData.ingredients);
    initialData.recipeData.spices = normalizeIngredients(initialData.recipeData.spices);
    const { image, title, steps, spices, ingredients, portions } = initialData.recipeData;
    const [section, setSection] = useState("ingredients");
    const [version, setVersion] = useState(getInitialRecipeVersion(initialModifiedData));
    const [edit, setEdit] = useState(false);
    const isModifiedRecipe = version == "original" || !initialModifiedData;
    const [data, setData] = useState(isModifiedRecipe ?
        { ingredients, spices, steps, id } :
        initialModifiedData);
    const [modifiedRecipeData, setModifiedRecipeData] = useState(initialModifiedData);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const { originalPortions, finalPortions, portionModificator, setSelectedPortions, updatePortions } = useRecipePortions(isModifiedRecipe, portions, initialModifiedData === null || initialModifiedData === void 0 ? void 0 : initialModifiedData.portions);
    const handleModifiedRecipeResponse = (data) => {
        if (version == "original") {
            setVersion("my");
        }
        const formatedData = Object.assign(Object.assign({}, data), { steps: data.steps.map(step => step.text) });
        setData(formatedData);
        setModifiedRecipeData(formatedData);
        setEdit(false);
        setShowSubmitPopup(true);
        updatePortions(data.portions);
    };
    const handleCancelEdit = () => {
        setData(version == "original" || !modifiedRecipeData ?
            { ingredients, spices, steps, id } :
            modifiedRecipeData);
        setEdit(false);
    };
    const handleVersionChange = (newVersion) => {
        if (newVersion == version) {
            return;
        }
        const isModifiedRecipe = newVersion == "original" || !modifiedRecipeData;
        setVersion(newVersion);
        setData(isModifiedRecipe ? { ingredients, spices, steps, id } : modifiedRecipeData);
        updatePortions(isModifiedRecipe ? portions : modifiedRecipeData.portions);
    };
    const getModifiedRecipeForm = () => {
        const formData = !isOwn && modifiedRecipeData && Object.keys(modifiedRecipeData).length ? Object.assign({}, modifiedRecipeData) : Object.assign({}, data);
        const stepsWithId = formData.steps.map(step => typeof step == "string" ? { text: step, id: uuid() } : step);
        Object.assign(formData, {
            steps: stepsWithId,
            id,
            portions: originalPortions,
            section,
            title,
            isOwn,
            onCancelEdit: handleCancelEdit
        });
        return (_jsx(ValidatedForm, { initialData: formData, externalData: { section }, Component: ModifiedRecipeForm, handleResponse: handleModifiedRecipeResponse, formId: "recipe-form", className: "scrollable__container" }));
    };
    const getSectionComponent = () => {
        if (edit && isModifiable) {
            return getModifiedRecipeForm();
        }
        const moduleComponent = (_jsx(Modal, { type: "modal", title: "Invalid action", message: "Log in to gain access to recipe modification.", onCancel: () => setEdit(false), onSubmit: () => navigator("/login") }));
        return (_jsxs(_Fragment, { children: [edit && moduleComponent, _jsx(RecipeToolbar, { portions: finalPortions, isOwn: isOwn, onPortionChange: setSelectedPortions, onEditClick: () => setEdit(!edit) }), section === "ingredients" ?
                    _jsx(Ingredients, { ingredients: data.ingredients, spices: data.spices, portionModificator: portionModificator }) :
                    _jsx(Steps, { steps: data.steps })] }));
    };
    return (_jsxs(_Fragment, { children: [showSubmitPopup && _jsx(Popup, { message: "Your recipe was updated", setShow: setShowSubmitPopup }), _jsxs("article", { id: "recipe", children: ["favourite" in initialData &&
                        _jsx(FavouriteButton, { recipeId: id, isFavouriteInitial: initialData.favourite }), _jsx("img", { id: "recipe__cover", src: `/files/${image}` }), _jsxs("div", { id: "recipe__container", children: [!isOwn &&
                                _jsx(RecipeVersion, { version: version, onVersionChange: handleVersionChange, hasModifiedData: modifiedRecipeData ? true : false }), _jsxs("div", { id: "recipe__header", children: [_jsx("h1", { children: title }), _jsx(RecipeAvatar, { user: user })] }), _jsx(SectionSelector, { section: section, setSection: setSection }), _jsx("div", { id: `${section}-container`, className: "recipe__section", children: getSectionComponent() })] })] })] }));
}
//# sourceMappingURL=Recipe.js.map