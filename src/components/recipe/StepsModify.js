import { getItemEventHandlers } from "../../helpers/recipe";
import InputError from "./InputError";
import StepInputs from "./StepInputs";

export default function StepsModify({ data, errors, onValueChange, errorInputRef }) {
    const eventHandlers = getItemEventHandlers(data, "steps", onValueChange);
    return (
        <div>
            <h2>Steps:</h2>
            <ol className={data.length > 9 ?
                "ingredients-list modified list-indent-2-char" :
                "ingredients-list modified list-indent-1-char"}
            >
                {data.map((step, row) => (
                    <div className="input-control">
                        <StepInputs
                            id={step.id}
                            text={step.text}
                            row={row}
                            isOnlyRow={data.length === 1}
                            {...eventHandlers}
                        />
                        <InputError 
                            id={step.id}
                            text={errors["steps"] && errors["steps"][row]} 
                            errorInputRef={errorInputRef}
                        />
                    </div>
                ))}
            </ol>
        </div>
    )
}