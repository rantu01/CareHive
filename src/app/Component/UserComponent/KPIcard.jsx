
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
        <div className="flex bg-[var(--dashboard-blue)]/30 gap-6 p-4 rounded hover:translate-1 transition-all delay-200 duration-500">
            <div className="flex flex-col justify-between">

                <div>
                    <p className="text-xl">{title.toUpperCase() }</p>
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