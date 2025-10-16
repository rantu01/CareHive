"use client"

import TimeLineBar from '@/app/Component/symptoms-analyzer-component/TimeLineBar';
import React, { useState } from 'react';

const page = () => {



  return (
    <div className=''>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] bg-clip-text ">
        Your Path To Undertand Your Health
      </h1>
      <div>
        <div className='grid grid-cols-2'>
          <div className='col-span-1'>
            <TimeLineBar />
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;