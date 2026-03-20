import type { MouseEventHandler } from "react";
import "../../styles/modal.css";
type Props = {
    type: string;
    title: string;
    message: string;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    submitText?: string;
    onSubmit?: MouseEventHandler<HTMLButtonElement>;
};
export default function Modal({ type, title, message, onCancel, submitText, onSubmit }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Modal.d.ts.map