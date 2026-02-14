import { createRoot } from "react-dom/client";
import Recipes from "./components/Recipes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipe from "./components/Recipe";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Header from "./components/common/Header";
import LogIn from "./components/LogIn"
import MyRecipes from "./components/MyRecipes";
import AddRecipe from "./components/AddRecipe";
import RegisterSuccessPage from "./components/RegisterSuccessPage";
import "./styles/vars.css";
import "./styles/main.css";
import "./styles/icons.css";

const root = createRoot(document.getElementById("app"));
root.render(
    <BrowserRouter >
        <Header />
        <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccessPage />} />
        </Routes>
    </BrowserRouter >);