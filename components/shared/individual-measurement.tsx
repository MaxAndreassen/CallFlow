import { NextPage } from "next";

type IndividualMeasurementProps = {
    amount: Number;
    large?: boolean;
}

export const IndividualMeasurement: NextPage<IndividualMeasurementProps> = ({ amount, large = false }) => {
    return (<div className="mr-0.5 mt-1">
        <div className="flex">
            {amount > 0
                ? <div className={!large ? "top-left-quarter-circle" : "top-left-quarter-circle-large"}>
                </div>
                : <div className={!large ? "top-left-quarter-circle" : "top-left-quarter-circle-large"} style={{ backgroundColor: "transparent", borderColor: "gray" }}>
                </div>
            }
            {amount > 0.75
                ? <div className={!large ? "top-right-quarter-circle" : "top-right-quarter-circle-large"}>
                </div>
                : <div className={!large ? "top-right-quarter-circle" : "top-right-quarter-circle-large"} style={{ backgroundColor: "transparent", borderColor: "gray" }}>
                </div>
            }
        </div>
        <div className="flex">
            {amount > 0.25
                ? <div className={!large ? "bottom-left-quarter-circle" : "bottom-left-quarter-circle-large"}>
                </div>
                : <div className={!large ? "bottom-left-quarter-circle" : "bottom-left-quarter-circle-large"} style={{ backgroundColor: "transparent", borderColor: "gray" }}>
                </div>
            }
            {amount > 0.5
                ? <div className={!large ? "bottom-right-quarter-circle" : "bottom-right-quarter-circle-large"}>
                </div>
                : <div className={!large ? "bottom-right-quarter-circle" : "bottom-right-quarter-circle-large"} style={{ backgroundColor: "transparent", borderColor: "gray" }}>
                </div>
            }
        </div>
    </div>)
}