import { useEffect, useState, type JSX, type UIEvent } from "react";
import AllRecipesIcon from "../icons/AllRecipesIcon";
import MenuIcon from "../icons/MenuIcon";
import MyRecipesIcon from "../icons/MyRecipesIcon";
import ProfileIcon from "../icons/ProfileIcon";
import { useLocation, useNavigate } from "react-router-dom";

export default function Menu() {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
        setIsExpanded(false);
    }, [location.pathname]);

    return (
        <div id="menu" className={isExpanded ? "expanded" : ""}>
            <div id="menu__icon-container" onClick={() => setIsExpanded(!isExpanded)}>
                <MenuIcon />
            </div>
            <div id="menu__container">
                <h2>Menu</h2>
                <nav>
                    <ul>
                        <li><MenuLink href="/" isActive={activeLink == "/"} /></li>
                        <li><MenuLink href="/my-recipes" isActive={activeLink == "/my-recipes"} /></li>
                        <li><MenuLink href="/profile" isActive={activeLink == "/profile"} /></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

type LinksDataType = {
    [href: string]: {
        linkName: string,
        icon: JSX.Element,
        text: string
    }
}

function MenuLink({ href, isActive }: { href: string, isActive: boolean }) {
    const linksData: LinksDataType = {
        "/": {
            linkName: "all-recipes",
            icon: <AllRecipesIcon />,
            text: "All Recipes"
        }, 
        "/my-recipes": {
            linkName: "my-recipes",
            icon: <MyRecipesIcon />,
            text: "My Recipes"
        }, 
        "/profile": {
            linkName: "profile",
            icon: <ProfileIcon />,
            text: "Profile"
        }
    };
    const navigator = useNavigate();
    const linkData = linksData[href] ? linksData[href] : linksData['/'] as LinksDataType[keyof LinksDataType];

    
    const handleLinkClick = (e: UIEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const url = new URL(target.href);
        navigator(url.pathname);
    }

    return (
         <a href={href} data-name={linkData.linkName} className={isActive ? "active" : ""} onClick={handleLinkClick}>
            {linkData.icon}
            <span>{linkData.text}</span>
        </a>
    )
}