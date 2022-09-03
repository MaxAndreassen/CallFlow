import { NextPage } from "next";
import { IndividualMeasurement } from "./individual-measurement";

type MeasurementProps = {
    amount: number;
    showCancel?: boolean;
    onCancel?: () => void;
}

export const Measurement: NextPage<MeasurementProps> = ({ amount, showCancel, onCancel = () => {}}) => {
    return (<>
        <div className="flex">
            <IndividualMeasurement amount={amount}></IndividualMeasurement>
            {amount > 1 && <IndividualMeasurement amount={amount - 1}></IndividualMeasurement>}
            {amount > 2 && <IndividualMeasurement amount={amount - 2}></IndividualMeasurement>}
            {amount > 3 && <IndividualMeasurement amount={amount - 3}></IndividualMeasurement>}
            {amount > 4 && <IndividualMeasurement amount={amount - 4}></IndividualMeasurement>}
            {showCancel && <button onClick={() => onCancel()} className="bg-red-600 p-1 border-rounded text-white mt-1 ml-0.5" style={{ borderRadius: '20px', height: '25px', width: '25px', fontSize: '11px' }}>X</button>}
        </div>
    </>)
}