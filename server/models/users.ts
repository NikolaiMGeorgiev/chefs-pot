import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { db } from "../db.js";

export async function getUserById(id: number) {
    const [results] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );
    return results && results[0];
}

export async function getUserByUsername(username: string) {
    const [results] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return results && results[0];
}

export async function getUserByUsernameAndPassword(username: string, password: string) {
    const [results] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    return results && results[0];
}

export async function addUser(
    username: string,
    firstName: string, 
    lastName: string,
    email: string, 
    password: string
) {
    const results = await db.execute<ResultSetHeader>(
        `INSERT INTO users (username, email, first_name, last_name, password)
        VALUES (?, ?, ?, ?, ?)`,
        [username, email, firstName, lastName, password]
    );
    return results && results[0];
}

export async function updateUserById(id: number, username: string, email: string) {
    const results = await db.execute(
        `UPDATE users
        SET username = ?, email = ?
        WHERE id = ?;`,
        [username, email, id]
    );
    return results && results[0];
}