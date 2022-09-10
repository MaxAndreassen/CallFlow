import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanitize } from 'isomorphic-dompurify';

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
            return getLandingPageData(req, res);
        };
    }
}

export const getLandingPage = async (slug: string) => {
    const cleanSlug = sanitize(slug as string);

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const page = await db
        .collection('cocktails')
        .findOne({ name: cleanSlug });

    //@ts-ignore
    page._id = null;

    //@ts-ignore
    page.createdAt = null;

    // return the posts
    return page;
}

async function getLandingPageData(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { slug } = req.query;

        // connect to the database
        const page = await getLandingPage(slug as string);

        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(page)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            //@ts-ignore
            message: new Error(error).message,
            success: false
        });
    }
}