import KPIcard from '@/app/Component/UserComponent/KPIcard';
import WelcomeBar from '@/app/Component/UserComponent/WelcomeBar';
import React from 'react';

const data=[
    
]

const UserDashboard = () => {
    return (
        <div>
            <div>
                <WelcomeBar name={"Dip Chondo"} />
            </div>
            <div>
                <KPIcard title={"bmi"} value={16}/>
            </div>
        </div>
    );
};

export default UserDashboard;