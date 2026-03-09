import type { RefObject } from "react"

type Props = {
    text: string, 
    errorInputRef: RefObject<HTMLElement | null>, 
    id?: string
}

export default function InputError({text, errorInputRef, id = ""}: Props) {
    return (
        errorInputRef && typeof text == "string" ? 
            <span key={id} ref={errorInputRef} className="input-error">{text}</span> :
            <span key={id} className="input-error">{text}</span>
    )
}