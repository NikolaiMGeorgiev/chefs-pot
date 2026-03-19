import { useNavigate } from "react-router-dom";
import SuccessPage from "./common/SuccessPage";

export default function RegisterSuccessPage({onActionBtnSubmit}: {onActionBtnSubmit?: Function}) {
    const navigator = useNavigate();
    return (
        <SuccessPage 
            title={"Welcome"} 
            message={"Registration was successful. Log in to your profile to start exploring our inspiring recipes."}
            heroImage={"/images/success-register-hero.png"}
            actionBtnText={"Log In"}
            onActionBtnSubmit={() => navigator("/login")}
        />
    )
}