import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { CocktailIcon, getNeonColour, getNeonHoverColour } from "./cocktail-icon";

type Props = {
  cocktail: Cocktail
}

interface Cocktail {
  _id: any;
  id: string;
  name: string;
  description: string;
  owner: string;
  ingredients: any[];
  votes: number;
  category: string;
  glassType: string;
}

export const CocktailSummary: NextPage<Props> = ({ cocktail }) => {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/votes/${cocktail.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVoted(data['voted']);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const vote = async () => {
    if (loading)
      return;

    setLoading(true);
    cocktail.votes = !cocktail.votes ? 1 : cocktail.votes + 1;
    setVoted(true);

    try {
      // save the post
      let response = await fetch('/api/votes/' + cocktail.id, {
        method: 'POST'
      });

      // get the data
      let data = await response.json();
    } finally {
      setLoading(false);
    }
  }

  const deleteVote = async () => {
    if (loading)
      return;

    setLoading(true);
    cocktail.votes = !cocktail.votes ? 0 : cocktail.votes - 1;
    setVoted(false);

    try {
      // save the post
      let response = await fetch('/api/votes/' + cocktail.id, {
        method: 'DELETE'
      });

      // get the data
      let data = await response.json();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div key={cocktail.id} style={{ "borderRadius": "8px" }} className={"group relative flex " + getNeonColour(cocktail?.category) + " " + getNeonHoverColour(cocktail?.category)}>
      <div className="group relative px-3 md:px-5 pt-3" style={{ marginBottom: 'auto', marginTop: 'auto' }}>
        <p className="text-center mb-3"><CocktailIcon category={cocktail?.category}></CocktailIcon></p>
      </div>
      <Link href={"/cocktails/" + cocktail.name}>
        <div className="px-3 flex-grow my-3" style={{ borderWidth: "4px", borderTop: "0", borderBottom: "0", whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <div>
            <h2 className="text-md text-white font-bold">
              <span aria-hidden="true" className="absolute inset-0" />
              {cocktail.name}
            </h2>
          </div>
          <p className="text-sm font-medium text-gray-300 mt-0.5">{cocktail.description}</p>
          <p className="mt-1 text-xs text-gray-600">by {cocktail.owner} | {cocktail.category} | {cocktail.glassType}</p>
          <div className="flex justify-left flex-wrap">
            {/*cocktail.ingredients && cocktail.ingredients.map(ingredient =>
            <div className="mr-4 mt-3">
              <CocktailMeasurement name={ingredient.name} amount={ingredient.amount}></CocktailMeasurement>
            </div>
          )*/}
          </div>
        </div>
      </Link>
      <div className="group relative px-3 md:px-5 pt-3" style={{ marginBottom: 'auto', marginTop: 'auto' }}>
        {!voted ? <button onClick={vote}>
          <ArrowCircleUpIcon className="text-white" style={{ width: "26px", height: "26px" }}></ArrowCircleUpIcon>
          <p className="text-center mb-3 text-white">{cocktail?.votes ?? 0}</p>
        </button> :
          <button onClick={deleteVote}>
            <ArrowCircleUpIcon className="text-lime-500" style={{ width: "26px", height: "26px" }}></ArrowCircleUpIcon>
            <p className="text-center mb-3 text-lime-500">{cocktail?.votes ?? 0}</p>
          </button>}
      </div>
    </div>
  )
}