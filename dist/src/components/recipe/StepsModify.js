import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getItemEventHandlers } from "../../helpers/recipe";
import InputError from "./InputError";
import StepInputs from "./StepInputs";
export default function StepsModify({ data, errors, onValueChange, errorInputRef }) {
    const eventHandlers = getItemEventHandlers(data, "steps", onValueChange);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Steps:" }), _jsx("ol", { className: data.length > 9 ?
                    "ingredients-list modified list-indent-2-char" :
                    "ingredients-list modified list-indent-1-char", children: data.map((step, row) => (_jsxs("div", { className: "input-control", children: [_jsx(StepInputs, Object.assign({ id: step.id, text: step.text, row: row, isOnlyRow: data.length === 1 }, eventHandlers)), _jsx(InputError, { id: step.id, text: errors["steps"] && errors["steps"][row], errorInputRef: errorInputRef })] }))) })] }));
}
//# sourceMappingURL=StepsModify.js.map