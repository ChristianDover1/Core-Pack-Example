import { db } from "@vercel/postgres";
import exp from "constants";

// export default async function getUsers() {

export async function getUser(username: string) {
    const client = await db.connect();
    const result = await client.query(`SELECT * FROM users WHERE username=${username}`);
    client.release();
    console.log(result.rows);
    return result.rows;
    }
export async function insertUser(id: string) {
    const client = await db.connect();
    const result = await client.query(`INSERT INTO users (id) VALUES (${id})`);
    client.release();
    console.log(result.rows);
    return result.rows;
    }


export async function getUsers() {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    console.log(result.rows);
    return result.rows;
    }
