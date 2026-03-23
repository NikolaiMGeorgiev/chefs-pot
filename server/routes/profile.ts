import { 
    type CookieOptions, 
    type NextFunction, 
    type Request, 
    type Response 
} from "express";
import jwt, { type Secret } from "jsonwebtoken";
import { 
    addUser, 
    getUserById, 
    getUserByUsernameAndPassword, 
    updateUserById 
} from "../models/users.js";

const cookieSettings: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 86400000
};

export async function getProfile(req: Request, res: Response, next: NextFunction) {
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
        next(error)
    }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        const userQueryResult = await addUser(username, firstName, lastName, email, password);
        const token = jwt.sign({id: userQueryResult.insertId, username}, process.env.ACCESS_TOKEN_SECRET as Secret);
        res.cookie("authcookie", token, cookieSettings);
        res.send();
    } catch (error) {
        next(error)
    }
}

export async function loginUser (req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const userQueryResult = await getUserByUsernameAndPassword(username, password);
        if (!userQueryResult) {
            res.status(401).send("Incorrect login data");
        } else {
            const token = jwt.sign({ id: userQueryResult.id, username }, process.env.ACCESS_TOKEN_SECRET as Secret);
            res.cookie("authcookie", token, cookieSettings);
            res.send();
        }
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email } = req.body;
        const userId = Number(req.user?.id);
        const userQueryResult = await updateUserById(userId, username, email);
        res.send();
    } catch (error) {
        next(error)
    }
}


export async function logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("authcookie", cookieSettings);
        res.send();
    } catch (error) {
        next(error)
    }
}