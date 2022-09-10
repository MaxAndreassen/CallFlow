import { NextPage } from "next";
import { Measurement } from "../shared/measurement";
import { CocktailMeasurement } from "./cocktail-measurement";

type CocktailIngredientsProps = {
    ingredients: any[];
    showCancel?: boolean;
    onCancel?: (name: string) => void;
}

export const CocktailIngredients: NextPage<CocktailIngredientsProps> = ({ ingredients, showCancel, onCancel }) => {
    return (<>
        {ingredients.sort((a, b) => b.amount - a.amount)?.map(p =>
            <div className="mr-3" style={{minWidth: "130px"}}><CocktailMeasurement amount={p.amount} name={p.name} showCancel={showCancel} onCancel={onCancel}></CocktailMeasurement>
            </div>)}
    </>)
};