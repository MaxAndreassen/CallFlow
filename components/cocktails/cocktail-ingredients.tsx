import { NextPage } from "next";
import { Measurement } from "../shared/measurement";
import { CocktailMeasurement } from "./cocktail-measurement";

type CocktailIngredientsProps = {
    ingredients: any[];
    showCancel?: boolean;
    large?: boolean;
    onCancel?: (name: string) => void;
}

export const CocktailIngredients: NextPage<CocktailIngredientsProps> = ({ ingredients, large, showCancel, onCancel }) => {
    return (<>
        {ingredients.sort((a, b) => b.amount - a.amount)?.map(p =>
            <div className="mr-3" style={{width: !large ? "130px" : "210px"}}><CocktailMeasurement amount={p.amount} large={large} name={p.name} showCancel={showCancel} onCancel={onCancel}></CocktailMeasurement>
            </div>)}
    </>)
};