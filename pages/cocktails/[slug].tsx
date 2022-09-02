import type { NextPage } from 'next';
import Head from 'next/head';
import { getLandingPage } from '../api/cocktails/[slug]';

type LandingPageProps = {
    title: string;
    sections: any[];
}

const LandingPage: NextPage<LandingPageProps> = ({ title, sections }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>{title}</h1>

            {sections?.map(section => {
                <p>{section?.value}</p>
            })}
        </>
    )
};

export async function getStaticProps({ params }: any) {
    const postData = getLandingPage(params.slug);
    return {
        props: {
            postData,
        },
    };
};

export default LandingPage;