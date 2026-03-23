import { type FormChangeHandler } from "../../types/functions";
import InputError from "../recipe/InputError";

type Props = {
    name: string, 
    id?: string,
    value: string, 
    type?: string, 
    labelText: string, 
    errorText: string, 
    onValueChange: FormChangeHandler, 
}

export default function InputWithLabel({ 
    name, 
    id = name,
    value, 
    type = "text", 
    labelText, 
    errorText, 
    onValueChange, 
}: Props) {
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