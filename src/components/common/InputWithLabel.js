import InputError from "../recipe/InputError";

export default function InputWithLabel({ 
    name, 
    id = name,
    value, 
    type = "text", 
    labelText, 
    errorText, 
    onValueChange, 
}) {
    return (
        <div className="input-control">
            <label>
                <span>{labelText}:</span>
                <input type={type} name={name} id={id}
                    value={value}
                    onChange={(e) => onValueChange(name, e.target.value)}
                    autoCorrect="off"
                    autoComplete="off"
                />
            </label>
            <InputError text={errorText} />
        </div>
    )
}