import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { HSOT_PORT } from "./config.js";
import { getIngredients } from "./models/ingredients.js";
import { 
    createModifiedRecipe, 
    createOriginalRecipe, 
    getAllRecipes, 
    getFilteredRecipes, 
    getMyRecipes, 
    getRecipe, 
    updateFavouriteRecipe, 
    updateOriginalRecipe 
} from "./routes/recipes.js";
import { 
    getProfile, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateUser 
} from "./routes/profile.js";
import errorHandler from "./middleware/errorHandler.js";
import autheticateToken from "./middleware/authenticateToken.js";
import { fileUploader } from "./middleware/fileUploader.js";

const app = express();

app.use(express.json()) 
app.use(express.static("public"))
app.use(express.static("dist"))
app.use(cookieParser());

app.get('/recipes', autheticateToken, getAllRecipes)

app.get('/api/recipes/:recipeId', autheticateToken, getRecipe)

app.get('/api/my-recipes', autheticateToken, getMyRecipes)

app.get('/api/search-ingredients/:ingredient', getIngredients)

app.get('/api/filtered-recipes', autheticateToken, getFilteredRecipes)

app.post('/recipe', fileUploader.single("image"), autheticateToken, createOriginalRecipe)

app.post('/api/recipes/:recipeId', autheticateToken, createModifiedRecipe)

app.post('/api/update-recipe/:recipeId', autheticateToken, updateOriginalRecipe)

app.post("/api/favourite", autheticateToken, updateFavouriteRecipe)

app.post("/register", registerUser)

app.post("/login", loginUser)

app.get('/api/profile', autheticateToken, getProfile)

app.post("/profile", autheticateToken, updateUser)

app.post("/logout", autheticateToken, logoutUser)

app.get('/*sourcePath', (req, res) => {
    res.sendFile("index.html", { root: 'dist' });
})

app.use(errorHandler);

app.listen(HSOT_PORT, () => {})