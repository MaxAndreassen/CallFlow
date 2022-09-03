import { NextPage } from "next";
import { Measurement } from "../shared/measurement";

type CocktailMeasurementProps = {
    amount: number;
    name: string;
    showCancel?: boolean;
    onCancel?: (name: string) => void;
}

export const CocktailMeasurement: NextPage<CocktailMeasurementProps> = ({ amount, name, showCancel, onCancel = () => { } }) => {
    return (<>
        <p className="text-gray-300">{name}</p>
        <Measurement amount={amount} onCancel={() => onCancel(name)} showCancel={showCancel}></Measurement>
    </>)
};