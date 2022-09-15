import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CocktailIcon, getNeonColour } from '../../components/cocktails/cocktail-icon';
import { CocktailIngredients } from '../../components/cocktails/cocktail-ingredients';
import { AffiliateLink } from '../../components/shared/affiliate-link';
import { Logo } from '../../components/shared/logo';
import { getLandingPage } from '../api/cocktails/[slug]';
import { usePlausible } from 'next-plausible';
import { useState, useEffect } from 'react';
import { ArrowCircleUpIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { Loading } from '../../components/shared/loading';

type LandingPageProps = {
    props: { cocktail: any }
}

const LandingPage: NextPage<LandingPageProps> = (props: any) => {
    const router = useRouter();
    const plausible = usePlausible();

    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState(props?.cocktail?.votes as number)

    useEffect(() => {
        fetch(`/api/votes/${props?.cocktail?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setVoted(data['voted']);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const randomCocktail = async () => {
        let response = await fetch('/api/cocktails/random');

        // get the data
        let data = await response.json();

        if (data.success) {
            plausible('random-cocktail-buttonclick');
            router.push(`${data.message.name}`);
        } else {
            // set the error
            console.log(data.message);
        }
    }

    const handleVote = () => {
        if (loading)
            return;

        if (voted) {
            deleteVote();
        } else {
            vote();
        }
    }

    const vote = async () => {
        if (loading)
            return;

        setLoading(true);
        setVotes(!votes ? 1 : votes + 1);
        setVoted(true);

        try {
            // save the post
            let response = await fetch('/api/votes/' + props?.cocktail.id, {
                method: 'POST'
            });

            // get the data
            let data = await response.json();
        } finally {
            setLoading(false);
        }
    };

    const deleteVote = async () => {
        if (loading)
            return;

        setLoading(true);
        setVotes(!votes ? 0 : votes - 1);
        setVoted(false);

        try {
            // save the post
            let response = await fetch('/api/votes/' + props?.cocktail?.id, {
                method: 'DELETE'
            });

            // get the data
            let data = await response.json();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>{props?.cocktail?.name} Cocktail Recipe</title>
                <meta name="description" content={"Cocktail recipe for " + props?.cocktail?.name + " | " + props?.cocktail?.description}></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex pb-6" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column', minHeight: '60px', borderWidth: '0', borderTop: '0', borderLeft: '0', borderRight: '0' }}>
                <div className="flex justify-between">
                    <Link href={'/'}>
                        <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
                            <Logo></Logo>
                        </div>
                    </Link>
                    <div className='flex'>
                        <button
                            type="button"
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => randomCocktail()}
                            className="my-3 mr-3 inline-flex items-center px-2 md:px-4 py-2 border border-transparent rounded-md shadow-sm md:text-sm text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 neon-box-blue hover:bg-blue-300"
                        >
                            Random 🍸
                        </button>
                        <Link href="/">
                            <button
                                type="button"
                                className="mr-3 my-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 neon-box-green"
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex' style={{ height: '0px' }}>
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
                                                <div className='flex justify-center flex-wrap gap-y-6 gap-x-2 md:gap-12 md:pt-4 xl:mb-7 mx-4'>
                                                    <CocktailIngredients ingredients={props?.cocktail?.ingredients} large={true}></CocktailIngredients>
                                                    {props?.cocktail?.ingredients?.length % 2 == 1 ? <div className="mr-3" style={{ width: '210px' }}> </div> : <></>}
                                                </div>
                                            </div>
                                            <div className="col-span-3 sm:col-span-3 border-2 pb-2 md:pb-2" style={{ borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
                                                <p className='text-white text-center font-bold text-sm mt-6'>Recommended Glass: {props?.cocktail?.glassType}</p>
                                                <p className="text-center mb-0 mt-3 text-white font-bold text-sm">{votes ?? 0} votes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                    </div>
                    <div className="lg:col-span-1">
                    </div>
                    <div className='lg:col-span-2 neon-box-green hover:bg-lime-300 mt-4 p-4' style={{ cursor: 'pointer' }}>
                        {loading ?
                            <div className="group relative px-3 md:px-5 pt-3" style={{ marginBottom: 'auto', marginTop: 'auto' }} onClick={() => handleVote()}>
                                <div className='flex justify-center'>
                                    <Loading></Loading>
                                </div>
                            </div> :
                            <div className="group relative px-3 md:px-5 pt-3" style={{ marginBottom: 'auto', marginTop: 'auto' }} onClick={() => handleVote()}>
                                {!voted ?
                                    <div className='flex justify-center'>
                                        <div className='mr-2'>
                                            <ArrowCircleUpIcon className="text-white" style={{ width: "26px", height: "26px" }}></ArrowCircleUpIcon>
                                        </div>
                                        <p className="text-center mb-3 mr-2 text-white font-bold">UPVOTE COCKTAIL</p>
                                    </div> :
                                    <div className='flex justify-center'>
                                        <div className='mr-2'>
                                            <CheckCircleIcon className="text-lime-500" style={{ width: "26px", height: "26px" }}></CheckCircleIcon>
                                        </div>
                                        <p className="text-center mb-3 mr-2 text-lime-500 font-bold">COCKTAIL UPVOTED</p>
                                    </div>}
                            </div>}
                    </div>
                    <div className="lg:col-span-1">
                    </div>
                    <div className="lg:col-span-1">
                    </div>
                    <div className="lg:col-span-2 p-4 mt-4 neon-box-pink hover:bg-fuchsia-400">
                        <AffiliateLink></AffiliateLink>
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