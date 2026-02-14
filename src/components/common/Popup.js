import "../../styles/popup.css";

export default function Popup({message, setShow}) {
    setTimeout(() => {
        setShow(false);
    }, 4000);

    return (
        <div className="popup__wrapper">
            <div className="popup__container">
                <p className="popup">{message}</p>
            </div>
        </div>
    )
}