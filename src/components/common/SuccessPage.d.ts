import type { MouseEventHandler } from "react";
import "../../styles/success-page.css";
type Props = {
    title: string;
    message: string;
    heroImage?: string;
    actionBtnText: string;
    onActionBtnSubmit: MouseEventHandler<HTMLButtonElement>;
};
export default function SuccessPage({ title, message, heroImage, actionBtnText, onActionBtnSubmit }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SuccessPage.d.ts.map