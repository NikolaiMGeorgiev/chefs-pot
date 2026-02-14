import Selector from "../common/Selector.js"
import units from "../../units.js"
import PlusIcon from "../icons/PlusIcon.js"
import ExIcon from "../icons/ExIcon.js"

export default function IngredientInputs({ 
    name = "", 
    quantity = 0, 
    unit = "", 
    type,
    row, 
    isOnlyRow,
    onItemAdd, 
    onItemRemove,
    onValueChange
}) {
    const unitSelectorAttrs = {
        placeholder: "Select unit"
    }

    return (
        <div key={row} className="ingredient">
            <label className="labeled-input name-label">
                <span>Name:</span>
                <input 
                    name={`${type}-name`} 
                    className="ingredient-name"
                    placeholder="Name" 
                    type="text"
                    value={name} 
                    onChange={(e) => onValueChange(row, "name", e.target.value)} 
                    autoComplete="off"
                />
            </label>
            <label className="labeled-input">
                <span>Quantity:</span>
                <input 
                    name={`${type}-quantity`} 
                    className="ingredient-quantity" 
                    placeholder="Quantity" 
                    type="number"
                    value={quantity} 
                    onChange={(e) => onValueChange(row, "quantity", e.target.value)} 
                    autoComplete="off"
                />
            </label>
            <label className="labeled-input">
                <span>Unit:</span>
                <Selector
                    items={units}
                    attributes={unitSelectorAttrs} 
                    name={`${type}-unit`} 
                    value={unit} 
                    onChange={value => onValueChange(row, "unit", value)}
                />
            </label>
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
    )
}