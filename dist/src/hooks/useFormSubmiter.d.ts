export default function useFormSubmiter(data: {
    [field: string]: any;
}, sendData: Function, handleResponse: Function, submitSuccessMessage: boolean): {
    showErrorModal: boolean;
    showSubmitPopup: boolean;
    setShowSubmitPopup: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    errors: {};
    setErrors: import("react").Dispatch<import("react").SetStateAction<{}>>;
    submitForm: () => void;
    errorModalData: {
        type: string;
        title: string;
        message: string;
        onCancel: () => void;
    };
};
//# sourceMappingURL=useFormSubmiter.d.ts.map