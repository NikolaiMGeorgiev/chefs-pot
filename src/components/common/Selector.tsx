
import "../../styles/selector.css";

import { useState, type UIEvent } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import type { GenericMap } from "../../types/common";

type SelectorProps = {
    items: GenericMap, 
    name: string,
    value: string,
    onChange: Function,
    attributes: GenericMap
}

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
}: SelectorProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const selectedOptionText = value ? items[value] : placeholder;

    className = className ? `${className} selector` : "selector";
    if (isExpanded) {
        className += " expanded";
    }

    const hadnleClick = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        
        if (target.classList.value.split(" ").includes("selector__option")) {
            onChange(target.dataset.value);
            setIsExpanded(!isExpanded);
            return;
        }

        if (clickShouldTriggerExapnd(target)) {
            setIsExpanded(!isExpanded);
        }
    }

    const clickShouldTriggerExapnd = (target: HTMLElement) => {
        let shouldTriggerExpand = false;

        while(target && !target.classList.value.includes("selector__wrapper")) {
            if (target.classList.value.includes("selector__selected-option")) {
                shouldTriggerExpand = true;
                break;
            }
            target = target.parentNode as HTMLElement
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

type OptionProps = {
    value: any, 
    text: string, 
    selectedValue: any
}

function SelectorOption({ value, text, selectedValue }: OptionProps) {
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