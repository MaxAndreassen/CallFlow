import { NextPage } from "next";
import { Measurement } from "../shared/measurement";

type CocktailMeasurementProps = {
    amount: number;
    name: string;
    large?: boolean;
    showCancel?: boolean;
    onCancel?: (name: string) => void;
}

export const CocktailMeasurement: NextPage<CocktailMeasurementProps> = ({ amount, name, showCancel, onCancel = () => { }, large = false }) => {
    return (<>
        <p className="text-gray-300">{name}</p>
        <Measurement large={large} amount={amount} onCancel={() => onCancel(name)} showCancel={showCancel}></Measurement>
    </>)
};