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
          <Link href="/cocktails/create">
            <button
              type="button"
              className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-lime-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Create Cocktail
            </button>
          </Link>
        </div>
        <h1 className="text-lg top-banner mx-4 display-none display-block-md">Will you create the next big cocktail?</h1>
        <div className="search-wrapper">
          <SearchIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600 search-icon" aria-hidden="true" />
          <DebounceInput className="search" type="text" placeholder="find a cocktail" value={searchTerm} debounceTimeout={300} onChange={(e) => { handleSearch(e) }}>
          </DebounceInput>
        </div>
        <div>
          <select
            id="department"
            name="department"
            autoComplete="department"
            style={{width: '320px', borderRadius: '999px', height: '30px', fontSize: '12px', lineHeight: 1, fontWeight: 500}}
            className="mt-3 mx-auto block py-2 px-3 border text-gray-500 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option>🏆 Best Cocktails</option>
            <option>🆕 Newest Cocktails</option>
          </select>
        </div>
      </div>
      {loading && <div className='mx-auto text-center mt-10'>
        <Loading></Loading>
      </div>}
      {count > 0 && <>
        <div className="mt-4 px-6 grid grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-8">
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
                query: { q: router.query.q, p: !!router.query.p ? Number.parseInt(router.query.p as string) + 1 : 1 },
              });
            }}
          ></Pagination>
        </div></>}
    </>
  )
}

export default Home;
