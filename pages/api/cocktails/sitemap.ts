import { SitemapStream, streamToPromise } from 'sitemap'
import { IncomingMessage, ServerResponse } from 'http'
import clientPromise from '../../../lib/mongodb';

export default async function sitemapFunc(req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Content-Type', 'text/xml')
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const cocktails = await db
            .collection('cocktails')
            .find({})
            .sort({ createdAt: 1, name: 1 })
            .toArray();

        const smStream = new SitemapStream({ hostname: 'https://' + req.headers.host })
        for (const cocktail of cocktails) {
            smStream.write({
                url: `https://cocktailrecipe.co/cocktails/${cocktail.name}`,
                lastmod: cocktail.created_at
            })
        }
        smStream.end()
        const sitemap = await streamToPromise(smStream)
            .then(sm => sm.toString())
        res.write(sitemap)
        res.end();
    } catch (e) {
        console.log(e)
        res.statusCode = 500
        res.end()
    }
}