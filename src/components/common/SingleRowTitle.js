import "../../styles/single-row-title.css";

import { useLayoutEffect, useRef } from "react";

export default function SingleRowTitle({title, Header}) {
    const titleElement = useRef(null);
    const titleElipsis = useRef(null);

    useLayoutEffect(() => {
        const fontSize = Number.parseInt(getComputedStyle(titleElement.current).getPropertyValue('font-size'));
        const titleHeight = titleElement.current.parentNode.scrollHeight;
        const elipsisWidth = titleElipsis.current.offsetWidth;
        if (titleHeight > fontSize * 2) {
            titleElement.current.style.maxWidth = `calc(100% - ${elipsisWidth}px)`;
        } else {
            titleElipsis.current.style.display = "none";
        }
    }, [])

    return (
        <Header className="single-row-title">
            <span className="single-row-title__text" ref={titleElement}>{title}</span>
            <span className="single-row-title__elipsis" ref={titleElipsis}>...</span>
        </Header>
    )
}