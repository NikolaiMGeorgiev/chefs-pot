import express, { type Request, type Response } from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { 
    addModifiedRecipe, 
    addRecipe, 
    getModifiedRecipeById, 
    getRecipeById, 
    getRecipesByIngredients, 
    getRecipesSummary, 
    getUserRecipesByIngredients, 
    getUserRecipesSummary, 
    updateRecipe 
} from "./models/recipes";
import { addUser, getUserById, getUserByUsernameAndPassword, updateUserById } from "./models/users";
import { HSOT_PORT } from "../config.js";
import { validateData } from "../src/helpers/validation.js";
import { newRecipeValidationData } from "../src/data/validation-data.js";
import { getIngredients } from "./models/ingredients";
import { addFavourite, getIsFavourite, removeFavourite } from "./models/favourites";
import type { SelectedRecipeTypes } from "./types/recipes";

const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/files"),
    filename: (req, file, cb) => {
        const encodedTitle = encodeURIComponent(req.body.title).replace(/%/g, "");
        const filename = btoa(encodedTitle + Date.now()).replace(/=+$/, ""); ;
        const extension = file.originalname.split(".")[1];
        cb(null, `${filename}.${extension}`)
    }
});
const fileUploader = multer({storage: fileStorage});
const cookieSettings = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 86400000
};

app.use(express.json()) 
app.use(express.static("public"))
app.use(express.static("dist"))
app.use(cookieParser());

app.get('/recipes', autheticateToken, async (req: Request<{}, {}, {}, {cursor?: number}>, res: Response) => {
    try {
        const { cursor } = req.query;
        const userId = req.user?.id as number;
        const results = await getRecipesSummary(userId, cursor);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/api/recipes/:recipeId', autheticateToken, async (req, res) => {
    try {
        const userId = req.user?.id;
        const recipeData = await getRecipeById(Number(req.params.recipeId));
        if (!recipeData) {
            throw new Error("invalid recipe ID");
        }
        const isFavourite = await getIsFavourite(Number(req.params.recipeId), Number(userId));
        const userData = await getUserById(recipeData["creator_id"]);
        const modifiedRecipeData = await getModifiedRecipeById(Number(userId), recipeData.id);

        if (!userData) {
            throw new Error("invalid user ID");
        }
        
        res.json({
            recipeData,
            modifiedRecipeData,
            user: userData["first_name"] + " " + userData["last_name"],
            isOwn: recipeData["creator_id"] == userId,
            favourite: isFavourite,
            isModifiable: userId !== undefined
        });
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/api/my-recipes', autheticateToken, async (req, res) => {
    try {
        const { cursor, types } = req.query as { cursor?: number, types?: string | string[] };
        if (!types) {
            res.json([]);
        }
        const recipeTypes = typeof types == "string" ? [types] : types;
        const selectedRecipeTypes: SelectedRecipeTypes = {};
        recipeTypes?.forEach((recipeType: string) => {
            selectedRecipeTypes[recipeType as keyof SelectedRecipeTypes] = recipeType;
        });
        const userId = req.user?.id;
        const results = await getUserRecipesSummary(Number(userId), selectedRecipeTypes, cursor);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/api/profile', autheticateToken, async (req, res) => {
    try {
        const userId = req.user?.id;
        const results = await getUserById(Number(userId));

        if (!results) {
            throw new Error("Invalid request")
        }

        res.json({
            username: results.username,
            email: results.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/api/search-ingredients/:ingredient', async (req, res) => {
    try {
        const ingredient = req.params.ingredient;
        const result = await getIngredients(ingredient);
        res.json({
            ingredients: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/api/filtered-recipes', autheticateToken, async (req, res) => {
    try {
        const { cursor, ingr, type, types } = req.query as { 
            cursor?: number, 
            ingr?: string | string[], 
            type?: string, 
            types?: string | string[] 
        };
        const recipeTypes = typeof types == "string" ? [types] : types;
        const selectedRecipeTypes: SelectedRecipeTypes = {};
        recipeTypes?.forEach((recipeType: string) => {
            selectedRecipeTypes[recipeType as keyof SelectedRecipeTypes] = recipeType;
        })
        const userId = req.user?.id;
        const result = await (type == "my" ? 
            getUserRecipesByIngredients(ingr ? ingr : "", Number(userId), Number(cursor), selectedRecipeTypes) :
            getRecipesByIngredients(ingr ? ingr : "", Number(cursor), Number(userId))
        );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post('/api/recipes/:recipeId', autheticateToken, async (req, res) => {
    try {
        const originalRecipeId = req.params.recipeId;
        const {
            ingredients,
            spices,
            steps,
            portions

        } = req.body;
        const user = req.user;
        await addModifiedRecipe(originalRecipeId, user.id, ingredients, spices, steps, portions);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post('/api/update-recipe/:recipeId', autheticateToken, async (req, res) => {
    try {
        const {
            ingredients,
            spices,
            steps,
            portions,
            title,
        } = req.body;
        const recipeId = req.params.recipeId;
        const user = req.user;
        const recipeData = await getRecipeById(recipeId);
        if (recipeData["creator_id"] != user.id) {
            return res.status(401).send();
        }
        await updateRecipe(recipeId, title, ingredients, spices, steps, portions);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post('/recipe', fileUploader.single("image"), autheticateToken, async (req, res) => {
    try {
        const {title, ingredients, spices, steps, portions} = req.body;
        const image = req.file ? req.file.fieldname : '';

        const validationResult = validateData({
            "ingredients-name": JSON.parse(ingredients).map(ingredient => ingredient.name),
            "ingredients-quantity": JSON.parse(ingredients).map(ingredient => ingredient.quantity),
            "ingredients-unit": JSON.parse(ingredients).map(ingredient => ingredient.unit),
            "spices-name": JSON.parse(spices).map(spice => spice.name),
            "spices-quantity": JSON.parse(spices).map(spice => spice.quantity),
            "spices-unit": JSON.parse(spices).map(spice => spice.unit),
            steps: JSON.parse(steps),
            title,
            portions
        }, newRecipeValidationData);

        if (validationResult !== true) {
            res.status(400).send("Invalid data");
        }

        const user = req.user;

        const newReicpeId = await addRecipe(
            title, 
            user.id,
            image, 
            ingredients, 
            spices, 
            steps, 
            portions
        );
        res.json({
            data: newReicpeId
        });
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post("/register", async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        const userQueryResult = await addUser(username, firstName, lastName, email, password);
        const token = jwt.sign({id: userQueryResult.insertId, username}, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("authcookie", token, cookieSettings);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userQueryResult = await getUserByUsernameAndPassword(username, password);
        if (!userQueryResult) {
            res.status(401).send("Incorrect login data");
        } else {
            const token = jwt.sign({ id: userQueryResult.id, username }, process.env.ACCESS_TOKEN_SECRET);
            res.cookie("authcookie", token, cookieSettings);
            res.send();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post("/profile", autheticateToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        const userQueryResult = await updateUserById(req.user.id, username, email);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post("/api/favourite", autheticateToken, async (req, res) => {
    try {
        const { recipeId, action } = req.body;
        const user = req.user;
        const result = action == "add" ? 
            await addFavourite(recipeId, user.id) : 
            await removeFavourite(recipeId, user.id);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.post("/logout", autheticateToken, async (req, res) => {
    try {
        res.clearCookie("authcookie", cookieSettings);
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send((error as Error).message);
    }
})

app.get('/*sourcePath', (req, res) => {
    res.sendFile("index.html", { root: 'dist' });
})

app.listen(HSOT_PORT, () => {})

const noCookieEndpoints = [
    /^\/recipes\??.*$/,
    /^\/api\/recipes\/[0-9]+$/,
    /\/api\/my-recipes/,
    /\/filtered-recipes/
]

function autheticateToken(req: Request, res: Response, next: Function) {
    const cookie = req.cookies["authcookie"];
    if (!cookie) {
        if (noCookieEndpoints.filter(endpoint => endpoint.test(req.originalUrl)).length) {
            req.user = null;
        } else {
            return res.status(401).send();
        }
    } else {
        jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err: Error, user: { id: number }) => {
            if (err) {
                return res.status(403).send();
            }
            req.user = user;
        });
    }
    next();
}