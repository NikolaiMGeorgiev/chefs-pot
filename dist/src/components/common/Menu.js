import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
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
    return (_jsxs("div", { id: "menu", className: isExpanded ? "expanded" : "", children: [_jsx("div", { id: "menu__icon-container", onClick: () => setIsExpanded(!isExpanded), children: _jsx(MenuIcon, {}) }), _jsxs("div", { id: "menu__container", children: [_jsx("h2", { children: "Menu" }), _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(MenuLink, { href: "/", isActive: activeLink == "/" }) }), _jsx("li", { children: _jsx(MenuLink, { href: "/my-recipes", isActive: activeLink == "/my-recipes" }) }), _jsx("li", { children: _jsx(MenuLink, { href: "/profile", isActive: activeLink == "/profile" }) })] }) })] })] }));
}
function MenuLink({ href, isActive }) {
    const linksData = {
        "/": {
            linkName: "all-recipes",
            icon: _jsx(AllRecipesIcon, {}),
            text: "All Recipes"
        },
        "/my-recipes": {
            linkName: "my-recipes",
            icon: _jsx(MyRecipesIcon, {}),
            text: "My Recipes"
        },
        "/profile": {
            linkName: "profile",
            icon: _jsx(ProfileIcon, {}),
            text: "Profile"
        }
    };
    const navigator = useNavigate();
    const linkData = linksData[href] ? linksData[href] : linksData['/'];
    const handleLinkClick = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const url = new URL(target.href);
        navigator(url.pathname);
    };
    return (_jsxs("a", { href: href, "data-name": linkData.linkName, className: isActive ? "active" : "", onClick: handleLinkClick, children: [linkData.icon, _jsx("span", { children: linkData.text })] }));
}
//# sourceMappingURL=Menu.js.map