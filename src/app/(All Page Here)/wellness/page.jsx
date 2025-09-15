import BmiCalculator from '@/app/Component/BmiCalculator';
import Navbar from '@/app/Component/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-30'>
                Welcome to wellness 
                <BmiCalculator></BmiCalculator>
            </div>
        </div>
    );
};

export default page;