import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/single-row-title.css";
import { useLayoutEffect, useRef } from "react";
export default function SingleRowTitle({ title, Header }) {
    const titleElement = useRef(null);
    const titleElipsis = useRef(null);
    const titleRef = useRef(null);
    useLayoutEffect(() => {
        if (!titleElement.current || !titleElipsis.current || !titleRef.current) {
            return;
        }
        const fontSize = Number.parseInt(getComputedStyle(titleElement.current).getPropertyValue('font-size'));
        const titleHeight = titleRef.current.scrollHeight;
        const elipsisWidth = titleElipsis.current.offsetWidth;
        if (titleHeight > fontSize * 2) {
            titleElement.current.style.maxWidth = `calc(100% - ${elipsisWidth}px)`;
        }
        else {
            titleElipsis.current.style.display = "none";
        }
    }, []);
    return (_jsxs(Header, { className: "single-row-title", ref: titleRef, children: [_jsx("span", { className: "single-row-title__text", ref: titleElement, children: title }), _jsx("span", { className: "single-row-title__elipsis", ref: titleElipsis, children: "..." })] }));
}
//# sourceMappingURL=SingleRowTitle.js.map