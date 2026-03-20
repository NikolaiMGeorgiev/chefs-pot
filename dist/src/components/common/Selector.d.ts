import "../../styles/selector.css";
import type { GenericMap } from "../../types/common";
type SelectorProps = {
    items: GenericMap;
    name: string;
    value: string;
    onChange: Function;
    attributes: GenericMap;
};
export default function Selector({ items, name, value, onChange, attributes: { id, className, placeholder, ...rest } }: SelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Selector.d.ts.map