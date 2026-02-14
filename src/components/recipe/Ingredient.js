export default function Ingredient({ 
    name, 
    quantity, 
    unit, 
    portionModificator, 
}) {
    const fixedQuantity = quantity ? (
        Number.isInteger(quantity * portionModificator) ? 
            quantity * portionModificator : 
            Number.parseFloat(quantity * portionModificator).toFixed(1)
        ) : "";

    return (
        <li key={name} className="ingredient">
            <span className="ingredient__text">
                <span className="ingredient__name">{name}: </span>
                <span className="ingredient__quantity">{fixedQuantity} {unit != "none" ? unit : ""}</span>
            </span>
        </li>
    )
} 