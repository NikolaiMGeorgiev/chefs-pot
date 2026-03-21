export declare const modifiedRecipeValidationData: {
    "ingredients-name": {
        isRequired: boolean;
        type: string;
    };
    "ingredients-quantity": {
        isRequired: boolean;
        type: string;
    };
    "ingredients-unit": {
        isRequired: boolean;
        type: string;
    };
    "spices-name": {
        isRequired: boolean;
        type: string;
    };
    "spices-quantity": {
        isRequired: boolean;
        type: string;
    };
    "spices-unit": {
        isRequired: boolean;
        type: string;
    };
    steps: {
        isRequired: boolean;
        type: string;
    };
    portions: {
        isRequired: boolean;
        nonZero: boolean;
        type: string;
    };
};
export declare const newRecipeValidationData: {
    "ingredients-name": {
        isRequired: boolean;
        type: string;
    };
    "ingredients-quantity": {
        isRequired: boolean;
        type: string;
    };
    "ingredients-unit": {
        isRequired: boolean;
        type: string;
    };
    "spices-name": {
        isRequired: boolean;
        type: string;
    };
    "spices-quantity": {
        isRequired: boolean;
        type: string;
    };
    "spices-unit": {
        isRequired: boolean;
        type: string;
    };
    steps: {
        isRequired: boolean;
        type: string;
    };
    portions: {
        isRequired: boolean;
        nonZero: boolean;
        type: string;
    };
    title: {
        isRequired: boolean;
        type: string;
    };
    image: {
        isRequired: boolean;
        supportedFileTypes: string[];
        type: string;
    };
};
export declare const registerValidationData: {
    firstName: {
        isRequired: boolean;
        type: string;
    };
    lastName: {
        isRequired: boolean;
        type: string;
    };
    email: {
        isRequired: boolean;
        type: string;
    };
    password: {
        isRequired: boolean;
        type: string;
    };
    username: {
        isRequired: boolean;
        type: string;
    };
};
export declare const loginValidationData: {
    password: {
        isRequired: boolean;
        type: string;
    };
    username: {
        isRequired: boolean;
        type: string;
    };
};
export declare const profileValidationData: {
    email: {
        isRequired: boolean;
        type: string;
    };
    username: {
        isRequired: boolean;
        type: string;
    };
};
export declare function getComponentFormData(formId: string): {
    validationFn: Function;
    sendData: Function;
    submitSuccessMessage?: string;
};
//# sourceMappingURL=validation-data.d.ts.map