import { db } from "../db.js";

export async function getUserById(id) {
    const [results] = await db.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );
    return results && results[0];
}

export async function getUserByUsername(username) {
    const [results] = await db.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return results && results[0];
}

export async function getUserByUsernameAndPassword(username, password) {
    const [results] = await db.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    return results && results[0];
}

export async function addUser(username, firstName, lastName, email, password) {
    const results = await db.execute(
        `INSERT INTO users (username, email, first_name, last_name, password)
        VALUES (?, ?, ?, ?, ?)`,
        [username, email, firstName, lastName, password]
    );
    return results && results[0];
}

export async function updateUserById(id, username, email) {
    const results = await db.execute(
        `UPDATE users
        SET username = ?, email = ?
        WHERE id = ?;`,
        [username, email, id]
    );
    return results && results[0];
}