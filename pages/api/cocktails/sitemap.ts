import { SitemapStream, streamToPromise } from 'sitemap';
import clientPromise from '../../../lib/mongodb';

export default async (req: any, res: any) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      //@ts-ignore
      cacheTime: 600000,
    });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // List of cocktails
    const cocktails = await db
    .collection('cocktails')
    .find({})
    .sort({ createdAt: 1, name: 1 })
    .toArray();

    // Create each URL row
    cocktails.forEach(cocktail => {
      //@ts-ignore
      cocktail._id = null;
      //@ts-ignore
      cocktail.createdAt = null;

      smStream.write({
        url: `/cocktails/${cocktail.name}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}