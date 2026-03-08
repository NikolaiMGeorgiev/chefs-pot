import "../../styles/popup.css";

type Props = {
    message: string, 
    setShow: Function
}

export default function Popup({ message, setShow }: Props) {
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