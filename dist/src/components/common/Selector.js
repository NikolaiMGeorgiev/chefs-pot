var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/selector.css";
import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";
export default function Selector(_a) {
    var { items, name, value, onChange } = _a, _b = _a.attributes, { id = null, className = null, placeholder = null } = _b, rest = __rest(_b, ["id", "className", "placeholder"]);
    const [isExpanded, setIsExpanded] = useState(false);
    const selectedOptionText = value ? items[value] : placeholder;
    className = className ? `${className} selector` : "selector";
    if (isExpanded) {
        className += " expanded";
    }
    const hadnleClick = (e) => {
        const target = e.currentTarget;
        if (target.classList.value.split(" ").includes("selector__option")) {
            onChange(target.dataset.value);
            setIsExpanded(!isExpanded);
            return;
        }
        if (clickShouldTriggerExapnd(target)) {
            setIsExpanded(!isExpanded);
        }
    };
    const clickShouldTriggerExapnd = (target) => {
        let shouldTriggerExpand = false;
        while (target && !target.classList.value.includes("selector__wrapper")) {
            if (target.classList.value.includes("selector__selected-option")) {
                shouldTriggerExpand = true;
                break;
            }
            target = target.parentNode;
        }
        return shouldTriggerExpand;
    };
    return (_jsx("div", { className: "selector__wrapper", children: _jsxs("div", Object.assign({ id: id, className: className }, rest, { onClick: hadnleClick, children: [_jsxs("div", { className: "selector__selected-option", children: [_jsx("span", { children: selectedOptionText }), _jsx(ArrowIcon, {})] }), _jsx("div", { className: "selector__options-wrapper", children: _jsx("div", { className: "selector__options", children: Object.keys(items).map(itemValue => _jsx(SelectorOption, { value: itemValue, text: items[itemValue], selectedValue: value })) }) }), _jsx("input", { type: "hidden", name: name, value: value })] })) }));
}
function SelectorOption({ value, text, selectedValue }) {
    const className = "selector__option " + (value == selectedValue ? "selected" : "");
    return (_jsx("div", { className: className, "data-value": value, children: text }, value));
}
//# sourceMappingURL=Selector.js.map