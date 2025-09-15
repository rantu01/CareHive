import BmiCalculator from '@/app/Component/BmiCalculator';
import Navbar from '@/app/Component/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-30'>
                Welcome to health and wellness
                e you can tack your calorioes, bmi and more about our website
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum sit eum, iste voluptatum culpa similique accusantium quo mollitia soluta est.
                <BmiCalculator></BmiCalculator>
            </div>
        </div>
    );
};

export default page;