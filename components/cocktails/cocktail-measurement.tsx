import { NextPage } from "next";
import { Measurement } from "../shared/measurement";

type CocktailMeasurementProps = {
    amount: number;
    name: string;
}

export const CocktailMeasurement: NextPage<CocktailMeasurementProps> = ({ amount, name }) => {
    return (<>
        <p className="text-gray-300">{name}</p>
        <Measurement amount={amount}></Measurement>
    </>)
};