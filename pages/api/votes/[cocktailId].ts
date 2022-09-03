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
            return checkVote(req, res);
        };
        case 'POST': {
            return postVote(req, res);
        };
    }
}

async function postVote(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cocktailId } = req.query;

        const forwarded = req.headers["x-forwarded-for"] as string;
        const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

        // connect to the database
        let { db } = await connectToDatabase();
        // add the post

        const cocktail = db
            .collection('cocktails')
            .findOne({ id: cocktailId });

        if (!cocktail) {
            return res.json({
                //@ts-ignore
                message: cocktail,
                success: false,
            });
        }

        await db.collection('cocktails').updateOne(
            {
                id: cocktailId,
            },
            { $set: { votes: (cocktail.votes ?? 0) + 1 } }
        );

        await db.collection('votes').insertOne({
            cocktailId: cocktailId,
            ip: ip,
            id: uuidv4()
        });

        // return a message
        return res.json({
            message: 'Voted Successfully',
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

async function checkVote(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cocktailId } = req.query;

        const forwarded = req.headers["x-forwarded-for"] as string;
        const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        const votes = await db.collection('votes')
            .find({ ip: ip, id: cocktailId })
            .toArray();

        if (votes.any()) {
            return res.json({
                voted: true,
                success: true,
            });
        } else {
            // return a message
            return res.json({
                voted: false,
                success: true,
            });
        }
    } catch (error) {
        // return an error
        return res.json({
            //@ts-ignore
            message: new Error(error).message,
            success: false,
        });
    }
}

export function uuidv4() {
    const webcrypto = require('crypto').webcrypto;
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ webcrypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
