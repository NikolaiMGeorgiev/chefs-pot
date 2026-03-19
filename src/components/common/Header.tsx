import "../../styles/header.css";

import Menu from "./Menu";

export default function Header() {
    return (
        <div id="header">
            <a href="/">
                <img id="header__logo" src="/images/logo.png" />
            </a>
            <Menu />
        </div>
    )
}