







// bmi , icon , value = bmiValue , compareValue= string or number like "Normal" or 1000  

import { Activity, Heart, TrendingUp, Weight } from "lucide-react";


const KPIcard = ({ title}) => {

    const iconsMap = {
        "bmi": <Activity />,
        "daily-step": <TrendingUp />,
        "heart-rate": <Heart />,
        "weight": <Weight />
    };

    return (
        <div>
            {
               iconsMap[title]
            }
        </div>
    );
};

export default KPIcard;