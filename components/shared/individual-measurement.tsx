import { NextPage } from "next";

type IndividualMeasurementProps = {
    amount: Number;
}

export const IndividualMeasurement: NextPage<IndividualMeasurementProps> = ({ amount }) => {
    return (<div className="mr-0.5 mt-1">
        <div className="flex">
            {amount > 0
                ? <div className="top-left-quarter-circle">
                </div>
                : <div className="top-left-quarter-circle" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                </div>
            }
            {amount > 0.75
                ? <div className="top-right-quarter-circle">
                </div>
                : <div className="top-right-quarter-circle" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                </div>
            }
        </div>
        <div className="flex">
            {amount > 0.25
                ? <div className="bottom-left-quarter-circle">
                </div>
                : <div className="bottom-left-quarter-circle" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                </div>
            }
            {amount > 0.5
                ? <div className="bottom-right-quarter-circle">
                </div>
                : <div className="bottom-right-quarter-circle" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                </div>
            }
        </div>
    </div>)
}