import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";
export default function IngredientsSummary({ ingredients, spices }) {
    const data = [...ingredients, ...spices];
    const listRef = useRef(null);
    const summaryRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    useLayoutEffect(() => {
        if (listRef.current &&
            summaryRef.current &&
            listRef.current.clientHeight >= summaryRef.current.clientHeight) {
            setShowScrollButton(true);
        }
    }, []);
    const handleScrollButtonClick = (e, type) => {
        var _a;
        e.stopPropagation();
        const scrollBy = type == "up" ? -100 : 100;
        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollBy({
            top: scrollBy,
            left: 0,
            behavior: "smooth",
        });
    };
    const getScrollButton = (type) => {
        if (!showScrollButton) {
            return null;
        }
        return (_jsx("div", { className: "ingredietns-summary__button-container", children: _jsx("button", { id: `scroll-btn-${type}`, className: "scroll-btn", onClick: (e) => handleScrollButtonClick(e, type), children: _jsx(ArrowIcon, {}) }) }));
    };
    return (_jsxs("div", { className: "ingredietns-summary", children: [_jsx("h4", { children: "Ingredients:" }), _jsxs("div", { ref: summaryRef, className: "ingredietns-summary__wrapper", children: [getScrollButton("up"), _jsx("ul", { ref: listRef, className: "ingredietns-summary__container", children: data.map(({ name }) => _jsx("li", { children: name }, name)) }), getScrollButton("down")] })] }));
}
//# sourceMappingURL=IngredientsSummary.js.map