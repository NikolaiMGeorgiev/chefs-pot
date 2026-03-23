import { 
    type Dispatch,
    type SetStateAction,
    useEffect, 
    useRef, 
    useState, 
    type ComponentType, 
    type SubmitEvent 
} from "react";
import Modal from "./Modal";
import Popup from "./Popup";
import useFormSubmiter from "../../hooks/useFormSubmiter";
import { getComponentFormData } from "../../data/validation-data";
import type { GenericMap } from "../../types/common";
import type { ValidatedFormProps } from "../../types/formsData";


type Props = {
    formId: string,
    initialData: object, 
    handleResponse: Function,
    Component: ComponentType<ValidatedFormProps>,
    className?: string,
    externalData?: GenericMap
}

export default function ValidatedForm({
    formId,
    initialData, 
    handleResponse,
    Component,
    className = "",
    externalData = {}
}: Props) {
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
     } = useFormSubmiter(data, sendData, handleResponse, submitSuccessMessage ? true : false);
    const errorInputRef = useRef<HTMLElement>(null);

    mergeExternalData(data, externalData, setData);

    useEffect(() => {
        if (errorInputRef.current) {
            (errorInputRef.current.parentNode as HTMLElement).scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [errors])

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const validationResult = validationFn(data);
        if (validationResult !== true) {
            setErrors(validationResult);
            return;
        }
        submitForm();
    }

    const handleValueChange = (name: string, value: any, row: number | undefined = undefined) => {
        setData({
            ...data,
            [name]: value
        });
        clearError(name, row);
    }

    const clearError = (inputName: string, row?: number) => {
        const newErrors: { 
            [key:string]: (string | true) | (string | true)[] 
        } = { ...errors };
        if (newErrors[inputName] instanceof Array && row !== undefined) {
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
            { showSubmitPopup && <Popup message={submitSuccessMessage as string} setShow={setShowSubmitPopup} /> }
        </>
    )
}

function mergeExternalData(data: GenericMap, externalData: GenericMap, setData: Dispatch<SetStateAction<object>>) {
    if (!Object.keys(externalData).length) {
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