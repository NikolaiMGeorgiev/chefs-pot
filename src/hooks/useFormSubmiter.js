import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isResponseJSON } from "../helpers/data";

export default function useFormSubmiter(data, sendData, handleResponse, submitSuccessMessage) {
    const navigator = useNavigate();
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const errorModalData = {
        type: "alert",
        title: "Error",
        message: "An error occured when submiting your data. Please check the data and try again.",
        onCancel: () => setShowErrorModal(false)
    };

    const handleInvalidRequest = (status) => {
        switch(status) {
            case 401: {
                if ("password" in data) {
                    setErrors({
                        ...errors,
                        password: "Inorrect username or password"
                    });
                    break;
                } else {
                    navigator("/login");
                }
            }
            case 200: break;
            default: setShowErrorModal(true);;
        }
    }

     const submitForm = () => {
        sendData(data)
            .then(response => {
                handleInvalidRequest(response.status);
                return response;
            })
            .then(response => response.ok ? 
                (
                    isResponseJSON(response) ? 
                    response.json() : 
                    data
                ) :  
                null)
            .then(data => {
                if (submitSuccessMessage) {
                    setShowSubmitPopup(true);
                }
                if (data) {
                    handleResponse(data);
                }
            })
            .catch(error => {
                console.error(error);
                setShowErrorModal(true);
            })
    }
    
    return {
        showErrorModal,
        showSubmitPopup,
        errors,
        setErrors,
        submitForm,
        errorModalData
    }
}