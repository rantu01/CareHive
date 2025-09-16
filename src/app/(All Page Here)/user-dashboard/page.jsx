import KPIcard from '@/app/Component/UserComponent/KPIcard';
import WelcomeBar from '@/app/Component/UserComponent/WelcomeBar';
import React from 'react';

const data = [
    {
        "title": "bmi",
        "value": 50
    },
    {
        "title": "daily-step",
        "value": 5000,
        "target": 6000
    },
    {
        "title": "heart-rate",
        "value": 90
    },
    {
        "title": "weight",
        "value": 36
    }
]

const UserDashboard = () => {
    return (
        <div>
            <div>
                <WelcomeBar name={"Dip Chondo"} />
            </div>
            <div className='flex justify-between'>
                {/* <KPIcard title={"bmi"} value={16} /> */}
                {
                    data.map((activity)=>(
                        <KPIcard key={activity.title} title={activity.title} value={activity.value} target={activity?.target} />
                    ))
                }
            </div>
        </div>
    );
};

export default UserDashboard;