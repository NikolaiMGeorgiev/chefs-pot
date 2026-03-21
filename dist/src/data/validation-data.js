import { sendLogin, sendNewRecipe, sendProfileUpdate, sendRegistration, updateRecipe } from "../helpers/data";
import { validateLoginForm, validateModifiedRecipeForm, validateNewRecipeForm, validateProfileForm, validateRegisterForm } from "../helpers/validation";
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
export function getComponentFormData(formId) {
    return formData[formId] ? formData[formId] : {
        validationFn: (f) => f,
        sendData: (f) => f
    };
}
const formData = {
    "recipe-form": {
        validationFn: validateModifiedRecipeForm,
        sendData: updateRecipe,
    },
    "add-recipe-form": {
        validationFn: validateNewRecipeForm,
        sendData: sendNewRecipe,
    },
    "login-form": {
        validationFn: validateLoginForm,
        sendData: sendLogin,
    },
    "register-form": {
        validationFn: validateRegisterForm,
        sendData: sendRegistration,
    },
    "profile-form": {
        validationFn: validateProfileForm,
        sendData: sendProfileUpdate,
        submitSuccessMessage: "Profile data was updated",
    }
};
//# sourceMappingURL=validation-data.js.map