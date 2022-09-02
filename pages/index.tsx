import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router';
import { Pagination } from '../components/shared/pagination';
import Link from 'next/link';
import { Loading } from '../components/shared/loading';
import { Logo } from '../components/shared/logo';
import { CocktailSummary } from '../components/cocktails/cocktail-summary';
import { SearchIcon } from '@heroicons/react/solid';
import { DebounceInput } from 'react-debounce-input';

const Home: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!router.isReady)
      return;

    search(router.query.q as string);
    setSearchTerm(router.query.q as string);

  }, [router.isReady, router.query]);

  const search = (searchWord: string) => {
    setLoading(true);

    const search = !searchWord ? '' : searchWord;
    const page = router.query.hasOwnProperty('p') ? router.query.p : 0;

    fetch(`/api/cocktails/full?q=${search}&p=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data['message']);
        setCount(data['count']);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    Router.push({
      pathname: process.env.BASE_URL,
      query: { q: e.target.value, p: 0 },
    });
  }

  return (
    <>
      <div className="flex" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column' }}>
        <div className="flex justify-between">
          <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
            <Logo></Logo>
          </div>
          <Link href="/post-a-job">
            <button
              type="button"
              className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-orange-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Create Cocktail
            </button>
          </Link>
        </div>
        <h2 className="top-banner mx-4">Will you build the next big cocktail?</h2>
        <div className="search-wrapper">
          <SearchIcon className="flex-shrink-0 mr-1.5 h-8 w-8 text-gray-700 search-icon" aria-hidden="true" />
          <DebounceInput className="search" type="text" placeholder="find a cocktail" value={searchTerm} debounceTimeout={300} onChange={(e) => { handleSearch(e) }}>
          </DebounceInput>
        </div>
      </div>
      {loading && <div className='mx-auto text-center mt-10'>
        <Loading></Loading>
      </div>}
      {count > 0 && <>
        <div className="mt-6 px-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!!cocktails && cocktails.map((cocktail, i) => (
            <CocktailSummary cocktail={cocktail}></CocktailSummary>
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={!!router.query.p ? Number.parseInt(router.query.p as string) : 0}
            totalCount={count}
            onPrevClicked={() => {
              Router.push({
                pathname: process.env.BASE_URL,
                query: { q: router.query.q, p: Number.parseInt(router.query.p as string) - 1 },
              });
            }}
            onNextClicked={() => {
              Router.push({
                pathname: process.env.BASE_URL,
                query: { q: router.query.q, p: Number.parseInt(router.query.p as string) + 1 },
              });
            }}
          ></Pagination>
        </div></>}
    </>
  )
}

export default Home;
