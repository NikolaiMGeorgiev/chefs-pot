import "../../styles/success-page.css";

export default function SuccessPage({
    title, 
    message, 
    heroImage = "", 
    actionBtnText, 
    onActionBtnSubmit}
) {
    return (
        <div id="success-page">
            <h1>{title}</h1>
            <img id="success-page__hero" src={heroImage} />
            <p>{message}</p>
            <div id="success-page__footer">
                <button type="button" onClick={onActionBtnSubmit}>{actionBtnText}</button>
            </div>
        </div>
    )
}