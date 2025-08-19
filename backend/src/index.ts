import express from "express";
import type { Request, Response, NextFunction } from "express";
import pgPromise from "pg-promise";
import { PrismaClient } from "@prisma/client";

const db = pgPromise()("postgres://myuser:mypassword@localhost:5432/mydb");

const app = express();

const prisma = new PrismaClient();

// ルーティングとミドルウェア

/** 
app.get("/insert", async (req, res) => {
    try {
        const makeRows = (
            gender: string,
            department: string,
            n: number,
            prefix: string
        ) =>
            Array.from({ length: n }, (_, i) => ({
                name: `${prefix}${i + 1}`,
                gender,
                department,
            }));

        const rows = [
            ...makeRows("男", "営業", 10, "男_営業_"),
            ...makeRows("男", "開発", 20, "男_開発_"),
            ...makeRows("女", "営業", 5, "女_営業_"),
            ...makeRows("女", "開発", 10, "女_開発_"),
        ];

        const { count } = await prisma.user.createMany({
            data: rows,
        });
        res.json({ inserted: count });
    } catch (error) {
        res.status(500).send("error");
    }
});
*/

app.get("/users", async (req, res) => {
    const users = await db.any(`select * from "User"`);
    console.log(users);
    res.status(200).json(users);
});

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

// 包括的エラーハンドリング
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Internal Server Error");
});

// サーバ起動
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
