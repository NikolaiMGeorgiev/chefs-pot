
import "../../styles/selector.css";

import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

export default function Selector({ 
    items, 
    name,
    value,
    onChange,
    attributes: {
        id=null,
        className=null,
        placeholder=null,
        ...rest
    }
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const selectedOptionText = value ? items[value] : placeholder;

    className = className ? `${className} selector` : "selector";
    if (isExpanded) {
        className += " expanded";
    }

    const hadnleClick = (e) => {
        let target = e.target;
        
        if (target.classList.value.split(" ").includes("selector__option")) {
            onChange(target.dataset.value);
            setIsExpanded(!isExpanded);
            return;
        }

        if (clickShouldTriggerExapnd(target)) {
            setIsExpanded(!isExpanded);
        }
    }

    const clickShouldTriggerExapnd = (target) => {
        let shouldTriggerExpand = false;

        while(target && !target.classList.value.includes("selector__wrapper")) {
            if (target.classList.value.includes("selector__selected-option")) {
                shouldTriggerExpand = true;
                break;
            }
            target = target.parentNode
        }

        return shouldTriggerExpand;
    }

    return (
        <div className="selector__wrapper">
            <div id={id} className={className} {...rest} onClick={hadnleClick}>
                <div className="selector__selected-option">
                    <span>{selectedOptionText}</span>
                    <ArrowIcon />
                </div>
                <div className="selector__options-wrapper">
                    <div className="selector__options">
                        {Object.keys(items).map(itemValue => 
                            <SelectorOption value={itemValue} text={items[itemValue]} selectedValue={value}/>)}
                    </div>
                </div>
                <input type="hidden" name={name} value={value} />
            </div>
        </div>
        
    )
}

function SelectorOption({value, text, selectedValue}) {
    const className = "selector__option " + (value == selectedValue ? "selected" : "");

    return (
        <div 
            className={className} 
            key={value} 
            data-value={value}
        >
            {text}
        </div>
    )
}