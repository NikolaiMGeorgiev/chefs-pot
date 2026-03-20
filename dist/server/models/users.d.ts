import { type ResultSetHeader, type RowDataPacket } from "mysql2";
export declare function getUserById(id: number): Promise<RowDataPacket | undefined>;
export declare function getUserByUsername(username: string): Promise<RowDataPacket | undefined>;
export declare function getUserByUsernameAndPassword(username: string, password: string): Promise<RowDataPacket | undefined>;
export declare function addUser(username: string, firstName: string, lastName: string, email: string, password: string): Promise<ResultSetHeader>;
export declare function updateUserById(id: number, username: string, email: string): Promise<import("mysql2").QueryResult>;
//# sourceMappingURL=users.d.ts.map