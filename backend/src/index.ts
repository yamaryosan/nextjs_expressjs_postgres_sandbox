import express from "express";
import type { Request, Response, NextFunction } from "express";
import pgPromise from "pg-promise";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const db = pgPromise()("postgres://myuser:mypassword@localhost:5432/mydb");

const app = express();
// CORSを許可
app.use(cors());

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
    const params = req.query;

    let whereClauses = "";

    if (params.gender) {
        whereClauses += `AND gender = '${params.gender}'`;
    }
    if (params.department) {
        whereClauses += `AND department = '${params.department}'`;
    }

    const sql = `
        SELECT * FROM "User" WHERE true ${whereClauses};
    `;
    const users = await db.any(sql);
    res.status(200).json(users);
});

app.get("/facets", async (req: Request, res: Response) => {
    try {
        const params = req.query;

        const gender = params.gender || null;
        const department = params.department || null;

        const sql = `
        (
            SELECT 'gender' AS facet_kind, gender AS facet_value, COUNT(*) AS cnt
            FROM "User"
            WHERE ($2 IS NULL OR department = $2)
            GROUP BY gender
        )
        UNION ALL
        (
            SELECT 'gender' AS facet_kind, '未選択' AS facet_value, COUNT(*) AS cnt
            FROM "User"
            WHERE ($2 IS NULL OR department = $2)
        )
        UNION ALL
        (
            SELECT 'department' AS facet_kind, department AS facet_value, COUNT(*) AS cnt
            FROM "User"
            WHERE ($1 IS NULL OR gender = $1)
            GROUP BY department
        )
        UNION ALL
        (
            SELECT 'department' AS facet_kind, '未選択' AS facet_value, COUNT(*) AS cnt
            FROM "User"
            WHERE ($1 IS NULL OR gender = $1)
        )
        `;
        const facets = await db.any(sql, [gender, department]);
        res.status(200).json(facets);
    } catch (error) {
        console.error(error);
        res.status(500).send("error");
    }
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
