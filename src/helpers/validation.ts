import { 
    modifiedRecipeErrorTexts, 
    newRecipeErrorTexts, 
    profileErrorTexts, 
    registerErrorTexts 
} from "../data/error-texts.js";
import { 
    ERROR_TYPES, 
    loginValidationData, 
    modifiedRecipeValidationData, 
    newRecipeValidationData, 
    profileValidationData, 
    registerValidationData 
} from "../data/validation-data.js";
import type { GenericMap } from "../types/common.js";
import type { LoginData, ProfileData, RegistrationData } from "../types/data.js";
import type { NewRecipeData, RecipeModifyData } from "../types/recipe.js";

type InputTypes = "list" | "text" | "number" | "file" | "password" | "email";

export function validateData(data: GenericMap, validationData: GenericMap) {
    const errors: GenericMap = {};
    for (let key in validationData) {
        const single = data[key];
        const singleValidationData = validationData[key];
        const validationResult = validateSingleInput(single, singleValidationData);
        if (validationResult !== true) {
            errors[key] = validationResult;
        }
    }
    return Object.keys(errors).length ? errors : true;
}

export function getErrorTexts(
    errorData: GenericMap, 
    texts: { 
        [key: string]: { 
            [innerKey: string]: string 
        } 
    }
) {
    const errorTexts: { [key: string]: object | string | any[] } = {}
    for (let field of Object.keys(errorData)) {
        const error = errorData[field];
        const fieldErrorTexts = texts[field] as { [key: string]: string};
        if (error instanceof Array) {
            errorTexts[field] = error.map(err => err !== true ? fieldErrorTexts[err] : true)
        } else if (error instanceof Object) {
            errorTexts[field] = Object.keys(error).reduce((accumulator: { [key: string]: string}, value: string) => {
                accumulator[value] = fieldErrorTexts[value] as string;
                return accumulator;
            }, {});
        } else {
            errorTexts[field] = fieldErrorTexts[error] as string;
        }
    }
    return errorTexts;
}

export function validateNewRecipeForm(data: NewRecipeData) {
    const { ingredients, spices, steps, title, portions, image } = data;
    const validationResult = validateData({
        "ingredients-name": ingredients.map(ingredient => ingredient.name),
        "ingredients-quantity": ingredients.map(ingredient => ingredient.quantity),
        "ingredients-unit": ingredients.map(ingredient => ingredient.unit),
        "spices-name": spices.map(spice => spice.name),
        "spices-quantity": spices.map(spice => spice.quantity),
        "spices-unit": spices.map(spice => spice.unit),
        steps: steps.map(step => step.text),
        title,
        portions,
        image
    }, newRecipeValidationData);

    if (validationResult === true) {
        return true;
    }

    const errors = getErrorTexts(validationResult, newRecipeErrorTexts);

    for (let field of ["ingredients", "spices"]) {
        const typeField = field as "ingredients" | "spices";
        errors[field] = [];
        for (let i in data[typeField]) {
            const singleError = 
                [`${field}-name`, `${field}-quantity`, `${field}-unit`]
                    .map(singleField => errors[singleField] && (errors[singleField] as (string | true)[])[i])
                    .filter(field => field && field !== true); 
            (errors[field] as any[]).push(singleError && singleError.length ? singleError[0] : true);
        }
    }

    return errors;
}

export function validateModifiedRecipeForm(data: RecipeModifyData) {
    const { ingredients, spices, steps, portions } = data;
    const validationResult = validateData({
        "ingredients-name": ingredients.map(ingredient => ingredient.name),
        "ingredients-quantity": ingredients.map(ingredient => ingredient.quantity),
        "ingredients-unit": ingredients.map(ingredient => ingredient.unit),
        "spices-name": spices.map(spice => spice.name),
        "spices-quantity": spices.map(spice => spice.quantity),
        "spices-unit": spices.map(spice => spice.unit),
        steps: steps.map(step => step.text),
        portions,
    }, modifiedRecipeValidationData);

    if (validationResult === true) {
        return true;
    }

    const errors = getErrorTexts(validationResult, modifiedRecipeErrorTexts);

    for (let field of ["ingredients", "spices"]) {
        errors[field] = [];
        for (let i in data[field]) {
            const singleError = [
                errors[`${field}-name`] && errors[`${field}-name`][i], 
                errors[`${field}-quantity`] && errors[`${field}-quantity`][i], 
                errors[`${field}-unit`] && errors[`${field}-unit`][i]
            ].filter(field => field && field !== true);
            errors[field].push(singleError && singleError.length ? singleError[0] : true);
        }
    }
    
    return errors;
}

export function validateRegisterForm(data: RegistrationData) {
    const { firstName, lastName, username, email, password } = data;
    const validationResult = validateData({
        firstName, 
        lastName,
        username,
        email,
        password
    }, registerValidationData);
    if (validationResult !== true) {
        return getErrorTexts(validationResult, registerErrorTexts);
    }
    return true;
}

export function validateLoginForm(data: LoginData) {
    const { username, password } = data;
    const validationResult = validateData({
        username,
        password
    }, loginValidationData);
    if (validationResult !== true) {
        return getErrorTexts(validationResult, registerErrorTexts);
    }
    return true;
}

export function validateProfileForm(data: ProfileData) {
    const { username, email } = data;
    const validationResult = validateData({
        username,
        email
    }, profileValidationData);
    if (validationResult !== true) {
        return getErrorTexts(validationResult, profileErrorTexts);
    }
    return true;
}

export function getSinglePasswordError(errors: object | string[]) {
    return errors ?
        (errors instanceof Object ?
            Object.values(errors)[0] :
            errors
        ) :
        errors;
}

function validateSingleInput(value: any, validationData: GenericMap) {
    const { type, isRequired } = validationData;
    const isEmpty = isEmptyValue(value, type);

    if (isEmpty) {
        return isRequired ? ERROR_TYPES.EMPTY : true;
    }

    if (type == "list") {
        return validateList(value);
    } else if (type == "text") {
        return validateText(value);
    } else if (type == "number") {
        return validateNumber(value, validationData);
    } else if (type == "file") {
        return validateFile(value, validationData);
    } else if (type == "password") {
        return validatePassword(value);
    } else if (type == "email") {
        return validateEmail(value);
    }
}

function isEmptyValue(value: any, type: InputTypes) {
    if (type == "list") {
        return !value || !value.length;
    } else if (["text", "email", "password"].includes(type)) {
        return isEmptyString(value);
    } else if (type == "number") {
        return value === undefined || value === null || value === "";
    } else if (type == "file") {
        return !value;
    }
}

function validateList(value: any[]) {
    let hasError = false;
    let errors = value.map(item => {
        if (isEmptyString(item)) {
            hasError = true;
            return ERROR_TYPES.EMPTY 
        }
        return false;
    });
    return hasError ? errors : true;
}

function validateText(value: string) {
    return true;
}

function validateNumber(value: number, validationData: { nonZero?: boolean }) {
    const number = Number(value);
    if (isNaN(number)) {
        return ERROR_TYPES.NUMBER_NAN;
    }
    if (!number && validationData.nonZero) {
        return ERROR_TYPES.NUMBER_ZERO;
    }
    return true;
}

function validateFile(value: File, validationData: { supportedFileTypes?: string[] }) {
    if (validationData.supportedFileTypes && 
        !validationData.supportedFileTypes.find(type => type == value.type)) {
            return ERROR_TYPES.FILE_INVALID_TYPE;
    }
    return true;
}

function validatePassword(value: string) {
    const errors: { [key: string]: true } = {};
    if (value.length < 8) {
        errors[ERROR_TYPES.PASSWORD_LENGTH] = true;
    }
    if (!value.match(/[0-9]/)) {
        errors[ERROR_TYPES.PASSWORD_NO_NUMBER] = true;
    }
    if (!value.match(/[^0-9a-zA-Z]/)) {
        errors[ERROR_TYPES.PASSWORD_NO_SYMBOL] = true;
    }
    return Object.keys(errors).length ? errors : true;
}

function validateEmail(value: string) {
    return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : ERROR_TYPES.TEXT_INVALID;
}

function isEmptyString(str: string) {
    return !str || 
        !str.toString() || 
        !str.toString().replace(/\s+/g, "").length;
}