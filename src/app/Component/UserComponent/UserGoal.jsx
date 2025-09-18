import { Goal } from "lucide-react";
import { useState } from "react";


const UserGoal = () => {



    return (
        <div className="border-1 border-gray-200 p-4 rounded">

            <div className="flex items-center gap-2">
                <div>
                    <Goal color="blue" />
                </div>
                <h1 className="2xl font-bold">Health Goal</h1>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default UserGoal;