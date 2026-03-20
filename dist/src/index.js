import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles/vars.css";
import "./styles/main.css";
import "./styles/icons.css";
import { createRoot } from "react-dom/client";
import Recipes from "./components/Recipes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipe from "./components/Recipe";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Header from "./components/common/Header";
import LogIn from "./components/LogIn";
import MyRecipes from "./components/MyRecipes";
import AddRecipe from "./components/AddRecipe";
import RegisterSuccessPage from "./components/RegisterSuccessPage";
const root = createRoot(document.getElementById("app"));
root.render(_jsx(App, {}));
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Recipes, {}) }), _jsx(Route, { path: "/my-recipes", element: _jsx(MyRecipes, {}) }), _jsx(Route, { path: "/recipes/:id", element: _jsx(Recipe, {}) }), _jsx(Route, { path: "/add-recipe", element: _jsx(AddRecipe, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/login", element: _jsx(LogIn, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/register/success", element: _jsx(RegisterSuccessPage, {}) })] })] }));
}
//# sourceMappingURL=index.js.map