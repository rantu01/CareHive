







// bmi , icon , value = bmiValue , compareValue= string or number like "Normal" or 1000  

import { Activity } from "lucide-react";

const data=[
    {
        "title":"BMI",
        "value":22.5,
    }
]

const KPIcard = ({title,icon,value,growOrDownValue}) => {
    return (
        <div>
            <Activity />
        </div>
    );
};

export default KPIcard;