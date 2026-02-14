export const modifiedRecipeErrorTexts = {
    "ingredients-name": {
        EMPTY: "Ingredient name is required",
    }, "ingredients-quantity": {
        EMPTY: "Ingredient quantity is required",
    }, "ingredients-unit": {
        EMPTY: "Measuring unit is required",
    }, "spices-name": {
        EMPTY: "Spice name is required",
    }, "spices-quantity": {
        EMPTY: "Spice quantity is required",
    }, "spices-unit":{
        EMPTY: "Measuring unit is required",
    }, steps: {
        EMPTY: "Step description is required",
    }, portions: {
        EMPTY: "Portion number is required",
        NUMBER_ZERO: "Enter a non-zero number",
        NUMBER_NAN: "Enter a valid number",
    },
};

export const newRecipeErrorTexts = {
    title: {
        EMPTY: "Title is required",
    }, image: {
        FILE_INVALID_TYPE: "Select a jpeg, png, or webp file"
    },
    ...modifiedRecipeErrorTexts
};

export const registerErrorTexts = {
    firstName: {
        EMPTY: "Name is required",
    }, lastName: {
        EMPTY: "Name is required",
    }, username: {
        EMPTY: "Username is required",
    }, email: {
        EMPTY: "Email is required",
        TEXT_INVALID: "Email is invalid"
    },  password: {
        EMPTY: "Password is required",
        PASSWORD_NO_NUMBER: "Password must contain a digit",
        PASSWORD_NO_SYMBOL: "Password must contain a symbol",
        PASSWORD_LENGTH: "Password must have at least 8 character"
    }
}

export const profileErrorTexts = {
    username: {
        EMPTY: "Username is required",
    }, email: {
        EMPTY: "Email is required",
        TEXT_INVALID: "Email is invalid"
    }
}