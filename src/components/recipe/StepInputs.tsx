import ExIcon from "../icons/ExIcon"
import PlusIcon from "../icons/PlusIcon"

type Props = {
    id: string,
    text: string, 
    row: number, 
    isOnlyRow: boolean,
    onItemAdd: Function, 
    onItemRemove: Function, 
    onValueChange: Function
}

export default function StepInputs({ 
    id,
    text, 
    row, 
    isOnlyRow,
    onItemAdd, 
    onItemRemove, 
    onValueChange 
}: Props) {
    return (
        <li key={id}>
            <div className="step-wrapper">
                <textarea 
                    name="step" 
                    placeholder="Step instructions" 
                    value={text} 
                    onChange={(e) => onValueChange(row, "step", e.target.value)} 
                />
                <button className="add-row-btn" type="button" onClick={() => onItemAdd(row)}>
                    <PlusIcon />
                </button>
                <button 
                    className={isOnlyRow ? "remove-row-btn invisible" : "remove-row-btn"} 
                    type="button" 
                    onClick={() => {isOnlyRow ? null : onItemRemove(row)}}
                >
                    <ExIcon />
                </button>
            </div>
        </li>
    )
}