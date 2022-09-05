import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { CocktailIngredients } from '../../components/cocktails/cocktail-ingredients';
import { Logo } from '../../components/shared/logo';
import { getLandingPage } from '../api/cocktails/[slug]';

type LandingPageProps = {
    props: {cocktail: any}
}

const LandingPage: NextPage<LandingPageProps> = (props: any) => {
    return (
        <>
            <Head>
                <title>{props?.cocktail?.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex pb-3" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column', minHeight: '60px', borderWidth: '4px', borderTop: '0', borderLeft: '0', borderRight: '0' }}>
                <div className="flex justify-between">
                    <Link href={'/'}>
                        <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
                            <Logo></Logo>
                        </div>
                    </Link>
                    <h1 className="pt-4 pr-4 font-bold mt-1" style={{ "color": "white" }}>{props?.cocktail?.name}</h1>
                </div>
            </div>
            <div className='pb-10 mx-10 md:pt-10 pt-4' style={{ borderWidth: '4px', borderLeft: '0', borderRight: '0', borderTop: '0', borderStyle: 'dashed' }}>
                <h1 className='text-white text-center font-bold text-md mt-6'>{props?.cocktail?.name}</h1>
                <p className='text-white text-center font-bold text-md mt-6 md:pb-10'>{props?.cocktail?.description}</p>
            </div>
            <div className="flex mx-10 mt-10 justify-evenly flex-wrap gap-6 md:gap-12 md:pt-6 md:mx-16">
                <CocktailIngredients ingredients={props?.cocktail?.ingredients}></CocktailIngredients>
            </div>
        </>
    )
};

export async function getServerSideProps(context: any) {
    const { slug } = context.query;

    const result = await getLandingPage(slug);

    return {
        props: {
            cocktail: result
        }, // will be passed to the page component as props
    }
}

export default LandingPage;