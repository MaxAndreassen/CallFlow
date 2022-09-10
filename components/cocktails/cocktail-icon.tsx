import { NextPage } from "next";
import { CocktailMeasurement } from "./cocktail-measurement";

type CocktailIconProps = {
    category: string
}

export const CocktailIcon: NextPage<CocktailIconProps> = ({ category }) => {
    return (<>
        {category == "Beer" && <>🍺</>}
        {category == "Cocktail" && <>🍸</>}
        {category == "Ordinary Drink" && <>🍸</>}
        {category == "Coffee / Tea" && <>🧋</>}
        {category == "Shot" && <>🥃</>}
        {category == "Shake" && <>🥤</>}
        {category == "Punch / Party Drink" && <>🍹</>}
        {category == "Soft Drink" && <>🥤</>}
        {category != "Beer" &&
            category != "Cocktail" &&
            category != "Ordinary Drink" &&
            category != "Coffee / Tea" &&
            category != "Shot" &&
            category != "Shake" &&
            category != "Punch / Party Drink" &&
            category != "Soft Drink" &&
            <>🍸</>}
    </>
    )
};

export const getNeonColour = (category: any) => {
    if (category == "Beer")
        return 'neon-box-orange';

    if (category == "Cocktail")
        return 'neon-box-green';

    if (category == "Ordinary Drink")
        return 'neon-box-green';

    if (category == "Coffee / Tea")
        return 'neon-box-orange';

    if (category == "Shot")
        return 'neon-box-orange';

    if (category == "Shake")
        return 'neon-box-pink';

    if (category == "Punch / Party Drink")
        return 'neon-box-pink';

    if (category == "Soft Drink")
        return 'neon-box-pink';

    return 'neon-box-blue';
};

export const getNeonHoverColour = (category: any) => {
    if (category == "Beer")
        return 'hover:bg-amber-300';

    if (category == "Cocktail")
        return 'hover:bg-lime-300';

    if (category == "Ordinary Drink")
        return 'hover:bg-lime-300';

    if (category == "Coffee / Tea")
        return 'hover:bg-amber-300';

    if (category == "Shot")
        return 'hover:bg-amber-300';

    if (category == "Shake")
        return 'hover:bg-fuchsia-400';

    if (category == "Punch / Party Drink")
        return 'hover:bg-fuchsia-400';

    if (category == "Soft Drink")
        return 'hover:bg-fuchsia-400';

    return 'hover:bg-blue-300';
};