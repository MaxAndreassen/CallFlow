import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { CocktailIcon, getNeonColour } from '../../components/cocktails/cocktail-icon';
import { CocktailIngredients } from '../../components/cocktails/cocktail-ingredients';
import { Logo } from '../../components/shared/logo';
import { getLandingPage } from '../api/cocktails/[slug]';

type LandingPageProps = {
    props: { cocktail: any }
}

const LandingPage: NextPage<LandingPageProps> = (props: any) => {
    return (
        <>
            <Head>
                <title>{props?.cocktail?.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex pb-6" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column', minHeight: '60px', borderWidth: '0', borderTop: '0', borderLeft: '0', borderRight: '0' }}>
                <div className="flex justify-between">
                    <Link href={'/'}>
                        <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
                            <Logo></Logo>
                        </div>
                    </Link>
                    <Link href="/">
                        <button
                            type="button"
                            className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 neon-box-green"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </div>
            <div className='flex' style={{height: '0px'}}>
                <div style={{ marginLeft: 'auto', height: '40px', marginRight: 'auto', zIndex: 100 }}
                    className={"top-title-cocktail-page " + getNeonColour(props?.cocktail?.category)}>
                    <CocktailIcon category={props?.cocktail?.category}></CocktailIcon> {props?.cocktail?.name} <CocktailIcon category={props?.cocktail?.category}></CocktailIcon>
                </div>
            </div>
            <div className="p-4 pt-1">
                <div className="lg:grid lg:grid-cols-4 md:gap-y=6 mb-14 mt-4">
                    <div className="lg:col-span-1">
                    </div>
                    <div className={"lg:col-span-2 " + getNeonColour(props?.cocktail?.category)}>
                        <div className="sm:px-0">
                            <div>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6 bg-black">
                                        <div className="grid grid-cols-3 gap-y-6">
                                            <div className="col-span-3 sm:col-span-3 border-2 pb-10 md:pb-2" style={{ borderLeft: 0, borderRight: 0, borderTop: 0 }}>
                                                <p className='text-white text-center font-bold text-sm mt-6 md:pb-6' style={{ whiteSpace: "pre-wrap" }}>{props?.cocktail?.description}</p>
                                            </div>
                                            <div className='col-span-3'>
                                                <div className="flex justify-start flex-wrap gap-6 md:gap-12 md:pt-4 mb-7 mx-4">
                                                    <CocktailIngredients ingredients={props?.cocktail?.ingredients}></CocktailIngredients>
                                                </div>
                                            </div>
                                            <div className="col-span-3 sm:col-span-3 border-2 pb-2 md:pb-2" style={{ borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
                                                <p className='text-white text-center font-bold text-sm mt-6'>Recommended Glass: {props?.cocktail?.glassType}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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