import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import useFormSubmiter from "../../hooks/useFormSubmiter";
import { getComponentFormData } from "../../data/validation-data";

export default function ValidatedForm({
    formId,
    initialData, 
    handleResponse,
    Component,
    className = "",
    externalData = null
}) {
    const [data, setData] = useState({...initialData});
    const {
        validationFn,
        sendData, 
        submitSuccessMessage
    } = getComponentFormData(formId);
    const {
        errors,
        setErrors,
        submitForm,
        showErrorModal,
        showSubmitPopup,
        setShowSubmitPopup,
        errorModalData
     } = useFormSubmiter(data, sendData, handleResponse, submitSuccessMessage);
    const errorInputRef = useRef(null);

    mergeExternalData(data, externalData, setData);

    useEffect(() => {
        if (errorInputRef.current) {
            errorInputRef.current.parentNode.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationResult = validationFn(data);
        if (validationResult !== true) {
            setErrors(validationResult);
            return;
        }
        submitForm();
    }

    const handleValueChange = (name, value, row = null) => {
        setData({
            ...data,
            [name]: value
        });
        clearError(name, row);
    }

    const clearError = (inputName, row) => {
        const newErrors = { ...errors };
        if (newErrors[inputName] instanceof Array) {
            newErrors[inputName][row] = true;
        } else {
            newErrors[inputName] = true;
        }
        setErrors(newErrors);
    }

    return (
        <>
            <form className={className} id={formId} onSubmit={handleSubmit}>
                <Component data={data} errors={errors} errorInputRef={errorInputRef} onValueChange={handleValueChange} />
            </form>
            { showErrorModal && <Modal {...errorModalData} /> }
            { showSubmitPopup && <Popup message={submitSuccessMessage} setShow={setShowSubmitPopup} /> }
        </>
    )
}

function mergeExternalData(data, externalData, setData) {
    if (!externalData) {
        return;
    }

    for (let key of Object.keys(externalData)) {
        if (data[key] != externalData[key]) {
            setData({
                ...data,
                ...externalData
            });
            break;
        }
    }
}