import "../styles/recipe.css";

import { useNavigate, useParams } from "react-router-dom";
import Ingredients from "./recipe/Ingredients.js";
import Steps from "./recipe/Steps.js";
import { useState } from "react";
import { normalizeIngredients } from "../helpers/data.js";
import RecipeVersion from "./recipe/RecipeVersion.js";
import SectionSelector from "./recipe/SectionSelector.js";
import RecipeAvatar from "./recipe/RecipeAvatar.js";
import RecipeToolbar from "./recipe/RecipeToolbar.js";
import { DataLoader } from "./common/DataLoader.js";
import { HOST, HSOT_PORT } from "../../config.js";
import ValidatedForm from "./common/ValidatedForm.js";
import Popup from "./common/Popup.js";
import FavouriteButton from "./common/FavouriteButton.js";
import useRecipePortions from "../hooks/useRecipePortions.js";
import { getInitialRecipeVersion } from "../helpers/recipe.js";
import ModifiedRecipeForm from "./recipe/ModifiedRecipeForm.js";
import { v4 as uuid } from "uuid";
import Modal from "./common/Modal.js";

export default function RecipeLoader() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    return (
        <DataLoader setData={setData} url={`${HOST}:${HSOT_PORT}/api/recipes/${id}`}>
            <Recipe initialData={data} id={id} />
        </DataLoader>
    )
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

    const {
        image,
        title,
        steps,
        spices,
        ingredients,
        portions
    } = initialData.recipeData;

    const [section, setSection] = useState("ingredients");
    const [version, setVersion] = useState(getInitialRecipeVersion(initialModifiedData));
    const [edit, setEdit] = useState(false);
    const isModifiedRecipe = version == "original" || !initialModifiedData;
    const [data, setData] = useState(
        isModifiedRecipe ?
            { ingredients, spices, steps, id } :
            initialModifiedData
    );
    const [modifiedRecipeData, setModifiedRecipeData] = useState(initialModifiedData);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const {
        originalPortions,
        finalPortions,
        portionModificator,
        setSelectedPortions,
        updatePortions
    } = useRecipePortions(isModifiedRecipe, portions, initialModifiedData?.portions);

    const handleModifiedRecipeResponse = (data) => {
        if (version == "original") {
            setVersion("my");
        }
        const formatedData = {
            ...data,
            steps: data.steps.map(step => step.text)
        };
        setData(formatedData);
        setModifiedRecipeData(formatedData);
        setEdit(false);
        setShowSubmitPopup(true);
        updatePortions(data.portions);
    }

    const handleCancelEdit = () => {
        setData(version == "original" || !modifiedRecipeData ?
            { ingredients, spices, steps } :
            modifiedRecipeData
        );
        setEdit(false);
    };

    const handleVersionChange = (newVersion) => {
        if (newVersion == version) {
            return;
        }
        
        const isModifiedRecipe = newVersion == "original" || !modifiedRecipeData;
        setVersion(newVersion);
        setData(isModifiedRecipe ? { ingredients, spices, steps } : modifiedRecipeData);
        updatePortions(isModifiedRecipe ? portions : modifiedRecipeData.portions);
    }

    const getModifiedRecipeForm = () => {
        const formData = !isOwn && modifiedRecipeData && Object.keys(modifiedRecipeData).length ?
            { ...modifiedRecipeData } :
            { ...data };
        const stepsWithId = formData.steps.map(step => typeof step == "string" ? { text: step, id: uuid() } : step)
        Object.assign(formData, {
            steps: stepsWithId,
            id,
            portions: originalPortions,
            section,
            title,
            isOwn,
            onCancelEdit: handleCancelEdit
        });

        return (
            <ValidatedForm
                initialData={formData}
                externalData={{ section }}
                Component={ModifiedRecipeForm}
                handleResponse={handleModifiedRecipeResponse}
                formId="recipe-form"
                className="scrollable__container"

            />
        )
    }
    
    const getSectionComponent = () => {
        let moduleComponent = "";
        if (edit) {
            if (isModifiable) {
                return getModifiedRecipeForm()
            }
            moduleComponent = <Modal 
                type="modal" 
                title="Invalid action" 
                message="Log in to gain access to recipe modification."
                onCancel={() => setEdit(false)}
                onSubmit={() => navigator("/login")}
            />
        }
        return (
            <>
                {moduleComponent}
                <RecipeToolbar
                    portions={finalPortions}
                    isOwn={isOwn}
                    onPortionChange={setSelectedPortions}
                    onEditClick={() => setEdit(!edit)}
                />
                {
                    section === "ingredients" ?
                        <Ingredients
                            ingredients={data.ingredients}
                            spices={data.spices}
                            portionModificator={portionModificator}
                        /> :
                        <Steps steps={data.steps} />
                }
            </>
        )
    }

    return (
        <>
            {showSubmitPopup && <Popup message="Your recipe was updated" setShow={setShowSubmitPopup} />}
            <article id="recipe">
                {
                    "favourite" in initialData && 
                    <FavouriteButton recipeId={id} isFavouriteInitial={initialData.favourite} />
                }
                <img id="recipe__cover" src={`/files/${image}`} />
                <div id="recipe__container">
                    {!isOwn && 
                        <RecipeVersion 
                            version={version} 
                            onVersionChange={handleVersionChange} 
                            modifiedRecipe={modifiedRecipeData}
                        />}
                    <div id="recipe__header">
                        <h1>{title}</h1>
                        <RecipeAvatar user={user} />
                    </div>
                    <SectionSelector section={section} setSection={setSection} />
                    <div id={`${section}-container`} className="recipe__section">
                        {getSectionComponent()}
                    </div>
                </div>
            </article>
        </>
    )
}
