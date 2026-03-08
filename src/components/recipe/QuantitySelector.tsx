import "../../styles/quantity-selector.css";

type Props = {
    portions: number, 
    onPortionChange: Function
}

export default function QuantitySelector({portions, onPortionChange}: Props) {
    const quantities = [2, 3, 4, 6, 8];
    
    return (
        <div id="quantity-selector">
            <span id="quantity-selector__text">Portions:</span>
            <div id="quantity-selector__container">
                {quantities.map(quantity => 
                    <button 
                        className={portions == quantity ? "button qunatity-btn selected" : "button qunatity-btn"}
                        onClick={() => onPortionChange(quantity)}
                        type="button"
                    >x{quantity}</button>)}
                {/* <input id="qtty-custom" className="qunatity-btn" type="number" /> */}
            </div>
        </div>
    )
}