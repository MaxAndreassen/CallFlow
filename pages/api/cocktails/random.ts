import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getRandomCocktail(req, res);
        };
    }
}

async function getRandomCocktail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // connect to the database
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        // fetch the posts

        const cocktail = await db
            .collection('cocktails')
            .aggregate([{ $sample: { size: 1 } }])
            .next();

        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(cocktail)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            //@ts-ignore
            message: new Error(error).message,
            success: false,
            count: 0
        });
    }
}