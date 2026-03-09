import type { RefObject } from "react";
import { getItemEventHandlers } from "../../helpers/recipe";
import type { GenericMap } from "../../types/common";
import InputError from "./InputError";
import StepInputs from "./StepInputs";
import type { ModifyStepData } from "../../types/recipe";

type Props = {
    data: GenericMap, 
    errors: GenericMap, 
    onValueChange: Function, 
    errorInputRef: RefObject<HTMLElement | null>
}

export default function StepsModify({ data, errors, onValueChange, errorInputRef }: Props) {
    const eventHandlers = getItemEventHandlers(data, "steps", onValueChange);
    return (
        <div>
            <h2>Steps:</h2>
            <ol className={data.length > 9 ?
                "ingredients-list modified list-indent-2-char" :
                "ingredients-list modified list-indent-1-char"}
            >
                {data.map((step: ModifyStepData, row: number) => (
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