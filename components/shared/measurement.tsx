import { NextPage } from "next";
import { IndividualMeasurement } from "./individual-measurement";

type MeasurementProps = {
    amount: number;
}

export const Measurement: NextPage<MeasurementProps> = ({ amount }) => {
    return (<>
        <div className="flex">
            <IndividualMeasurement amount={amount}></IndividualMeasurement>
            {amount > 1 && <IndividualMeasurement amount={amount - 1}></IndividualMeasurement>}
            {amount > 2 && <IndividualMeasurement amount={amount - 2}></IndividualMeasurement>}
            {amount > 3 && <IndividualMeasurement amount={amount - 3}></IndividualMeasurement>}
            {amount > 4 && <IndividualMeasurement amount={amount - 4}></IndividualMeasurement>}
        </div>
    </>)
}