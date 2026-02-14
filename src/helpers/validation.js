import { modifiedRecipeErrorTexts, newRecipeErrorTexts, profileErrorTexts, registerErrorTexts } from "../data/error-texts.js";
import { ERROR_TYPES, loginValidationData, modifiedRecipeValidationData, newRecipeValidationData, profileValidationData, registerValidationData } from "../data/validation-data.js";

export function validateData(data, validationData) {
    const errors = {};
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

export function getErrorTexts(errorData, texts) {
    const errorTexts = {}
    for (let field of Object.keys(errorData)) {
        const error = errorData[field];
        const fieldErrorTexts = texts[field];
        if (error instanceof Array) {
            errorTexts[field] = error.map(err => err !== true ? fieldErrorTexts[err] : true)
        } else if (error instanceof Object) {
            errorTexts[field] = Object.keys(error).reduce((accumulator, value) => {
                accumulator[value] = fieldErrorTexts[value];
                return accumulator;
            }, {});
        } else {
            errorTexts[field] = fieldErrorTexts[error];
        }
    }
    return errorTexts;
}

export function validateNewRecipeForm(data) {
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

export function validateModifiedRecipeForm(data) {
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

export function validateRegisterForm(data) {
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

export function validateLoginForm(data) {
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

export function validateProfileForm(data) {
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

export function getSinglePasswordError(errors) {
    return errors ?
        (errors instanceof Object ?
            Object.values(errors)[0] :
            errors
        ) :
        errors;
}

function validateSingleInput(value, validationData) {
    const { type, isRequired } = validationData;
    const isEmpty = isEmptyValue(value, type);

    if (isEmpty) {
        return isRequired ? ERROR_TYPES.EMPTY : true;
    }

    if (type == "list") {
        return validateList(value, validationData);
    } else if (type == "text") {
        return validateText(value, validationData);
    } else if (type == "number") {
        return validateNumber(value, validationData);
    } else if (type == "file") {
        return validateFile(value, validationData);
    } else if (type == "password") {
        return validatePassword(value, validationData);
    } else if (type == "email") {
        return validateEmail(value, validationData);
    }
}

function isEmptyValue(value, type) {
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

function validateList(value, validationData) {
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

function validateText(value, validationData) {
    return true;
}

function validateNumber(value, validationData) {
    const number = Number(value);
    if (isNaN(number)) {
        return ERROR_TYPES.NUMBER_NAN;
    }
    if (!number && validationData.nonZero) {
        return ERROR_TYPES.NUMBER_ZERO;
    }
    return true;
}

function validateFile(value, validationData) {
    if (validationData.supportedFileTypes && 
        !validationData.supportedFileTypes.find(type => type == value.type)) {
            return ERROR_TYPES.FILE_INVALID_TYPE;
    }
    return true;
}

function validatePassword(value, validateData) {
    const errors = {};
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

function validateEmail(value, validateData) {
    return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : ERROR_TYPES.TEXT_INVALID;
}

function isEmptyString(str) {
    return !str || 
        !str.toString() || 
        !str.toString().replace(/\s+/g, "").length;
}