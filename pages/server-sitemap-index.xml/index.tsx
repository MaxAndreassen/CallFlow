// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import clientPromise from '../../lib/mongodb';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  // List of cocktails
  const cocktails = await db
  .collection('cocktails')
  .find({})
  .sort({ createdAt: 1, name: 1 })
  .toArray();

  const urls = cocktails.map(p => {
    return `https://cocktailrecipe.co/cocktails/${p.name}`;
  }) as string[];

  return getServerSideSitemapIndex(ctx, urls);
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}