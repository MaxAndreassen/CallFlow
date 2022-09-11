import { sanitize } from "isomorphic-dompurify";
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
        const forwarded = req.headers["x-forwarded-for"] as string;
        const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

        const insert = JSON.parse(req.body);

        try {
            const data = await (await fetch(`http://ip-api.com/json/` + ip)).json();

            insert.country = data.country;
            insert.regionName = data.regionName;
            insert.city = data.city;
            insert.ip = ip;
        } catch (error) {

        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        // add the post
        await db.collection('cocktails').insertOne(insert);
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
        const { q, p, s } = query;
        const cleanQuery = sanitize(q as string);
        const cleanSort = sanitize(s as string);

        let cleanPage = Number.parseInt(p as string);

        if (cleanPage < 0)
            cleanPage = 0;

        // connect to the database
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        // fetch the posts
        let posts;
        let count = 0;

        if (!!cleanQuery && cleanSort == 'new') {
            posts = await db
                .collection('cocktails')
                .find({ $text: { $search: cleanQuery } })
                .sort({ createdAt: 1, name: 1 })
                .skip(cleanPage * pageSize)
                .limit(pageSize)
                .toArray();

            count = await db
                .collection('cocktails')
                .count({ $text: { $search: cleanQuery } });
        } else if (!!cleanQuery) {
            posts = await db
                .collection('cocktails')
                .find({ $text: { $search: cleanQuery } })
                .sort({ votes: -1, name: 1 })
                .skip(cleanPage * pageSize)
                .limit(pageSize)
                .toArray();

            count = await db
                .collection('cocktails')
                .count({ $text: { $search: cleanQuery } });
        } else if (!cleanQuery && cleanSort == 'new') {
            posts = await db
                .collection('cocktails')
                .find({})
                .sort({ createdAt: 1, name: 1 })
                .skip(cleanPage * pageSize)
                .limit(pageSize)
                .toArray();

            count = await db
                .collection('cocktails')
                .count({});
        }
        else {
            posts = await db
                .collection('cocktails')
                .find({})
                .sort({ votes: -1, name: 1 })
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