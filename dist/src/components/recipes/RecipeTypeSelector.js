import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/recipe-type-selector.css";
import ExIcon from "../icons/ExIcon";
import PlusIcon from "../icons/PlusIcon";
export const recipeTypes = [
    {
        type: "favourite",
        text: "Favourite"
    }, {
        type: "modified",
        text: "Modified"
    }, {
        type: "own",
        text: "Own"
    }
];
export default function RecipeTypeSelector({ selectedTypes, setSelectedTypes }) {
    const getIsSelected = (type) => {
        return selectedTypes.some(selectedType => selectedType == type);
    };
    const types = recipeTypes.map(typeData => (Object.assign(Object.assign({}, typeData), { isSelected: getIsSelected(typeData.type) })));
    const handleClick = (e) => {
        var _a;
        const target = e.currentTarget;
        const type = target.dataset.type;
        const isTypeSelected = (_a = types.find(typeData => typeData.type == type)) === null || _a === void 0 ? void 0 : _a.isSelected;
        if (isTypeSelected) {
            setSelectedTypes(selectedTypes.filter(selectedType => selectedType != type));
        }
        else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };
    return (_jsxs("div", { id: "recipe-type", children: [_jsx("span", { children: "Recipe types: " }), types.map(typeData => _jsxs("button", { className: typeData.isSelected ? "button selected" : "button", "data-type": typeData.type, type: "button", onClick: handleClick, children: [typeData.isSelected ? _jsx(ExIcon, {}) : _jsx(PlusIcon, {}), _jsx("span", { children: typeData.text })] }))] }));
}
//# sourceMappingURL=RecipeTypeSelector.js.map