"use client"

import ChallangeDetails from '@/app/Component/ChallangesProgramComponent/ChallangeDetails';
import ChallengeCard from '@/app/Component/ChallangesProgramComponent/ChallengeCard';
import { ChallangesDataContext } from '@/app/Component/ChallangesProgramComponent/ChellangesContexts/ChallangesDataContext';
import Dropdown from '@/app/Component/ChallangesProgramComponent/Dropdown';
import { use } from 'react';

const page = () => {
    
    return (
        <div className='pt-32'>

            {/* header / sorting and filtering buttons */}
            <header className='flex justify-between'>
                <h1 className="font-bold text-2xl md:text-4xl mb-2 text-[var(--color-primary)] leading-tight">
                    Discover Your Next Challenge!
                </h1>

                <div>
                    <Dropdown
                        title="Menu"
                        items={[
                            "Profile",
                            "Settings",
                        ]}
                    />

                </div>

            </header>


            {/* card display section */}

            <main >
                <div className='grid grid-cols-1 md:grid-cols-4'>
                    {/* <ChallengeCard />
                    <ChallengeCard />
                    <ChallengeCard />
                    <ChallengeCard />
                    <ChallengeCard />
                    <ChallengeCard /> */}


                </div>

                <div>
                    <ChallangeDetails />
                </div>
            </main>



        </div>
    );
};

export default page;