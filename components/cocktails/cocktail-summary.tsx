import { NextPage } from "next";
import { CocktailMeasurement } from "./cocktail-measurement";

type Props = {
  cocktail: Cocktail
}

interface Cocktail {
  _id: any;
  name: string;
  description: string;
  owner: string;
  ingredients: any[];
}

export const CocktailSummary: NextPage<Props> = ({ cocktail }) => {
  return (
    <div key={cocktail._id} style={{ "borderRadius": "8px" }} className="group relative border-4">
      <div className="group relative px-3 pt-3" style={{ borderWidth: "4px", borderTop: "0", borderLeft: "0", borderRight: "0" }}>
        <p className="text-center mb-3">🍸</p>
      </div>
      <div className="px-3 pb-3">
        <div className="mt-4">
          <h2 className="text-md text-white font-bold">
            <span aria-hidden="true" className="absolute inset-0" />
            {cocktail.name}
          </h2>
        </div>
        <p className="text-sm font-medium text-gray-300 mt-0.5">{cocktail.description}</p>
        <p className="mt-1 text-xs text-gray-600">by {cocktail.owner}</p>
        <div className="flex justify-left flex-wrap">
          {cocktail.ingredients && cocktail.ingredients.map(ingredient =>
            <div className="mr-4 mt-3">
              <CocktailMeasurement name={ingredient.name} amount={ingredient.amount}></CocktailMeasurement>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}