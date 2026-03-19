import mysql from "mysql2/promise"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config.js";

export const db = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});