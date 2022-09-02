import { sanitize } from "isomorphic-dompurify";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

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
            return getCocktails(req, res);
        };
        case 'POST': {
            return postCocktail(req, res);
        };
    }
}

async function postCocktail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('cocktails').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Cocktail Successfully Created',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            //@ts-ignore
            message: new Error(error).message,
            success: false,
        });
    }
}
async function getCocktails(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pageSize = 10;

    try {
        const query = req.query;
        const { q, p } = query;
        const cleanQuery = sanitize(q as string);
        let cleanPage = Number.parseInt(p as string);

        if (cleanPage < 0)
            cleanPage = 0;

        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let posts;
        let count = 0;

        if (!!cleanQuery) {
            posts = await db
                .collection('cocktails')
                .find({ $text: { $search: cleanQuery } })
                .sort({ published: -1 })
                .skip(cleanPage * pageSize)
                .limit(pageSize)
                .toArray();

            count = await db
                .collection('cocktails')
                .count({ $text: { $search: cleanQuery } });
        }
        else {
            posts = await db
                .collection('cocktails')
                .find({})
                .sort({ published: -1 })
                .skip(cleanPage * pageSize)
                .limit(pageSize)
                .toArray();

            count = await db
                .collection('cocktails')
                .count({});
        }
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            count: count,
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