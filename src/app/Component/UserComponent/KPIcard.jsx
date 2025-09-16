







// bmi , icon , value = bmiValue , compareValue= string or number like "Normal" or 1000  

import { Activity, Heart, TrendingUp, Weight } from "lucide-react";


const KPIcard = ({ title, value, target = '', }) => {

    const iconsMap = {
        "bmi": <Activity/>,
        "daily-step": <TrendingUp />,
        "heart-rate": <Heart />,
        "weight": <Weight />
    };

    const status =
        value < 18.5 ? "Low" :
            value <= 24.9 ? "Normal" :
                "High";

    return (
        <div className="flex bg-amber-800 gap-6 p-4 w-fit">
            <div>

                <div>
                    <p className="text-xl">{title }</p>
                </div>
                <div>
                    {
                        title === "bmi" && <> <span className="text-3xl">{value}</span> {status} </> // conditional bmi status
                    }
                    {
                        title === "daily-step" && <><span>{value}</span> {target}</>
                    }
                    {
                        title === 'heart-rate' && <><span>{value}</span> <span>bpm</span></>
                    }

                    {
                        title === "weight" && <><span>{value}</span> <span>kg</span></>
                    }

                </div>
            </div>

            <div className="bg-[var(--dashboard-blue)] flex justify-center items-center w-fit">
                {
                    iconsMap[title] // conditional icon
                }
            </div>
        </div>
    );
};

export default KPIcard;