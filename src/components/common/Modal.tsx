import type { MouseEventHandler } from "react";
import "../../styles/modal.css"

type Props = {
    type: string, 
    title: string, 
    message: string, 
    onCancel: MouseEventHandler<HTMLButtonElement>, 
    submitText?: string, 
    onSubmit?: MouseEventHandler<HTMLButtonElement>
}

export default function Modal({ 
    type, 
    title, 
    message, 
    onCancel, 
    submitText = "OK", 
    onSubmit = (f: any) => f
}: Props) {
    let footer = <></>;
    if (type == "alert") {
        footer = (
            <div id="modal__footer">
                <button id="modal-submit-btn" onClick={onCancel}>OK</button>
            </div>
        )
    } else if (type == "modal") {
         footer = (
            <div id="modal__footer">
                <button id="modal-submit-btn" onClick={onSubmit}>{submitText}</button>
                <button id="modal-cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        )
    }

    return (
        <>
            <div id="modal__background"></div>
            <div id="modal">
                <div id="modal__container">
                    <button id="modal__close-btn" onClick={onCancel}>X</button>
                    <h2>{title}</h2>
                    <p id="modal__body">{message}</p>
                    {footer}
                </div>
            </div>
        </>
    )
}