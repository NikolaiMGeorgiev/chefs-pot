import { useLayoutEffect, useRef, useState, type UIEvent } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import type { Ingredient } from "../../types/recipe";

type Props = {
    ingredients: Ingredient[], 
    spices: Ingredient[]
}

type ScrollButtonType = "up" | "down";

export default function IngredientsSummary({ ingredients, spices }: Props) {
    const data = [...ingredients, ...spices];
    const listRef = useRef<HTMLUListElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);


    useLayoutEffect(() => {
        if (listRef.current && 
            summaryRef.current && 
            listRef.current.clientHeight >= summaryRef.current.clientHeight
        ) {
            setShowScrollButton(true);
        }
    }, [])

    const handleScrollButtonClick = (e: UIEvent<HTMLButtonElement>, type: ScrollButtonType) => {
        e.stopPropagation();
        const scrollBy = type == "up" ? -100 : 100;
        listRef.current?.scrollBy({
            top: scrollBy,
            left: 0,
            behavior: "smooth",
        });
    }

    const getScrollButton = (type: ScrollButtonType) => {
        if (!showScrollButton) {
            return null;
        }

        return (
            <div className="ingredietns-summary__button-container">
                <button 
                    id={`scroll-btn-${type}`} 
                    className="scroll-btn" 
                    onClick={(e) => handleScrollButtonClick(e, type)}
                >
                    <ArrowIcon />
                </button>
            </div>
        )
    }

    return (
        <div className="ingredietns-summary">
            <h4>Ingredients:</h4>
            <div ref={summaryRef} className="ingredietns-summary__wrapper">
                { getScrollButton("up") }
                <ul ref={listRef} className="ingredietns-summary__container">
                    {data.map(({name}) => <li key={name}>{name}</li>)}
                </ul>
                { getScrollButton("down") }
            </div>
        </div>
    )
}