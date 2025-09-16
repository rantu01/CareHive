import KPIcard from '@/app/Component/UserComponent/KPIcard';
import WelcomeBar from '@/app/Component/UserComponent/WelcomeBar';
import React from 'react';

const UserDashboard = () => {
    return (
        <div>
            <div>
                <WelcomeBar name={"Dip Chondo"} />
            </div>
            <div>
                <KPIcard title={"weight"}/>
            </div>
        </div>
    );
};

export default UserDashboard;