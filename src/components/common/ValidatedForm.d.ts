import { type ComponentType } from "react";
import type { GenericMap } from "../../types/common";
import type { ValidatedFormProps } from "../../types/data";
type Props = {
    formId: string;
    initialData: object;
    handleResponse: Function;
    Component: ComponentType<ValidatedFormProps>;
    className?: string;
    externalData?: GenericMap;
};
export default function ValidatedForm({ formId, initialData, handleResponse, Component, className, externalData }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ValidatedForm.d.ts.map