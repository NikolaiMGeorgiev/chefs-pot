export default function InputError({text, errorInputRef, id}) {
    return (
        errorInputRef && typeof text == "string" ? 
            <span key={id} ref={errorInputRef} className="input-error">{text}</span> :
            <span key={id} className="input-error">{text}</span>
    )
}