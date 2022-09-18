import { NextPage } from "next";
import { Measurement } from "../shared/measurement";

type CocktailMeasurementProps = {
    amount: number;
    name: string;
    unit?: string;
    large?: boolean;
    showCancel?: boolean;
    onCancel?: (name: string) => void;
}

export const CocktailMeasurement: NextPage<CocktailMeasurementProps> = ({ amount, unit, name, showCancel, onCancel = () => { }, large = false }) => {
    return (<>
        <p className="text-gray-300">{name + (unit ? " (" + amount + " " + unit + ")" : "")}</p>
        <Measurement large={large} amount={amount} onCancel={() => onCancel(name)} showCancel={showCancel}></Measurement>
    </>)
};