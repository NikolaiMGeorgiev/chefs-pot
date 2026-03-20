import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import useFormSubmiter from "../../hooks/useFormSubmiter";
import { getComponentFormData } from "../../data/validation-data";
export default function ValidatedForm({ formId, initialData, handleResponse, Component, className = "", externalData = {} }) {
    const [data, setData] = useState(Object.assign({}, initialData));
    const { validationFn, sendData, submitSuccessMessage } = getComponentFormData(formId);
    const { errors, setErrors, submitForm, showErrorModal, showSubmitPopup, setShowSubmitPopup, errorModalData } = useFormSubmiter(data, sendData, handleResponse, submitSuccessMessage ? true : false);
    const errorInputRef = useRef(null);
    mergeExternalData(data, externalData, setData);
    useEffect(() => {
        if (errorInputRef.current) {
            errorInputRef.current.parentNode.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [errors]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationResult = validationFn(data);
        if (validationResult !== true) {
            setErrors(validationResult);
            return;
        }
        submitForm();
    };
    const handleValueChange = (name, value, row = undefined) => {
        setData(Object.assign(Object.assign({}, data), { [name]: value }));
        clearError(name, row);
    };
    const clearError = (inputName, row) => {
        const newErrors = Object.assign({}, errors);
        if (newErrors[inputName] instanceof Array && row !== undefined) {
            newErrors[inputName][row] = true;
        }
        else {
            newErrors[inputName] = true;
        }
        setErrors(newErrors);
    };
    return (_jsxs(_Fragment, { children: [_jsx("form", { className: className, id: formId, onSubmit: handleSubmit, children: _jsx(Component, { data: data, errors: errors, errorInputRef: errorInputRef, onValueChange: handleValueChange }) }), showErrorModal && _jsx(Modal, Object.assign({}, errorModalData)), showSubmitPopup && _jsx(Popup, { message: submitSuccessMessage, setShow: setShowSubmitPopup })] }));
}
function mergeExternalData(data, externalData, setData) {
    if (!Object.keys(externalData).length) {
        return;
    }
    for (let key of Object.keys(externalData)) {
        if (data[key] != externalData[key]) {
            setData(Object.assign(Object.assign({}, data), externalData));
            break;
        }
    }
}
//# sourceMappingURL=ValidatedForm.js.map