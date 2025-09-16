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
        <div className='max-w-9/12 mx-auto'>
            <div className='mb-4'>
                <WelcomeBar name={"Dip Chondo"} />
            </div>
            <div className='grid md:grid-cols-4 gap-6 sm:grid-cols-2 grid-cols-1'>
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