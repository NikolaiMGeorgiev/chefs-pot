import "../../styles/single-row-title.css";

import { useLayoutEffect, useRef, type ReactElement } from "react";

type Props = {
    title: string,
    Header: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export default function SingleRowTitle({title, Header}: Props) {
    const titleElement = useRef<HTMLSpanElement>(null);
    const titleElipsis = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        if (!titleElement.current || !titleElipsis.current || !titleRef.current) {
            return;
        }
        const fontSize = Number.parseInt(getComputedStyle(titleElement.current).getPropertyValue('font-size'));
        const titleHeight = titleRef.current.scrollHeight;
        const elipsisWidth = titleElipsis.current.offsetWidth;
        if (titleHeight > fontSize * 2) {
            titleElement.current.style.maxWidth = `calc(100% - ${elipsisWidth}px)`;
        } else {
            titleElipsis.current.style.display = "none";
        }
    }, [])

    return (
        <Header className="single-row-title" ref={titleRef}>
            <span className="single-row-title__text" ref={titleElement}>{title}</span>
            <span className="single-row-title__elipsis" ref={titleElipsis}>...</span>
        </Header>
    )
}