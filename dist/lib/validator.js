export const ERROR_TYPES = {
    EMPTY: "EMPTY",
    NUMBER_ZERO: "NUMBER_ZERO",
    NUMBER_NAN: "NUMBER_NAN",
    FILE_INVALID_TYPE: "FILE_INVALID_TYPE",
    TEXT_INVALID: "TEXT_INVALID",
    PASSWORD_NO_NUMBER: "PASSWORD_NO_NUMBER",
    PASSWORD_NO_SYMBOL: "PASSWORD_NO_SYMBOL",
    PASSWORD_LENGTH: "PASSWORD_LENGTH"
};
export const modifiedRecipeValidationData = {
    "ingredients-name": {
        isRequired: true,
        type: "list"
    }, "ingredients-quantity": {
        isRequired: true,
        type: "list"
    }, "ingredients-unit": {
        isRequired: true,
        type: "list"
    }, "spices-name": {
        isRequired: true,
        type: "list"
    }, "spices-quantity": {
        isRequired: true,
        type: "list"
    }, "spices-unit": {
        isRequired: true,
        type: "list"
    }, steps: {
        isRequired: true,
        type: "list"
    }, portions: {
        isRequired: true,
        nonZero: true,
        type: "number"
    }
};
export const newRecipeValidationData = Object.assign({ title: {
        isRequired: true,
        type: "text"
    }, image: {
        isRequired: false,
        supportedFileTypes: ["image/jpeg", "image/png", "image/webp"],
        type: "file"
    } }, modifiedRecipeValidationData);
export const registerValidationData = {
    firstName: {
        isRequired: true,
        type: "text"
    }, lastName: {
        isRequired: true,
        type: "text"
    }, email: {
        isRequired: true,
        type: "email"
    }, password: {
        isRequired: true,
        type: "password"
    }, username: {
        isRequired: true,
        type: "text"
    }
};
export const loginValidationData = {
    password: {
        isRequired: true,
        type: "text"
    }, username: {
        isRequired: true,
        type: "text"
    }
};
export const profileValidationData = {
    email: {
        isRequired: true,
        type: "email"
    }, username: {
        isRequired: true,
        type: "text"
    }
};
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
function validateSingleInput(value, validationData) {
    const { type, isRequired } = validationData;
    const isEmpty = isEmptyValue(value, type);
    if (isEmpty) {
        return isRequired ? ERROR_TYPES.EMPTY : true;
    }
    if (type == "list") {
        return validateList(value);
    }
    else if (type == "text") {
        return validateText(value);
    }
    else if (type == "number") {
        return validateNumber(value, validationData);
    }
    else if (type == "file") {
        return validateFile(value, validationData);
    }
    else if (type == "password") {
        return validatePassword(value);
    }
    else if (type == "email") {
        return validateEmail(value);
    }
}
function isEmptyValue(value, type) {
    if (type == "list") {
        return !value || !value.length;
    }
    else if (["text", "email", "password"].includes(type)) {
        return isEmptyString(value);
    }
    else if (type == "number") {
        return value === undefined || value === null || value === "";
    }
    else if (type == "file") {
        return !value;
    }
}
function validateList(value) {
    let hasError = false;
    let errors = value.map(item => {
        if (isEmptyString(item)) {
            hasError = true;
            return ERROR_TYPES.EMPTY;
        }
        return false;
    });
    return hasError ? errors : true;
}
function validateText(value) {
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
function validatePassword(value) {
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
function validateEmail(value) {
    return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : ERROR_TYPES.TEXT_INVALID;
}
function isEmptyString(str) {
    return !str ||
        !str.toString() ||
        !str.toString().replace(/\s+/g, "").length;
}
//# sourceMappingURL=validator.js.map