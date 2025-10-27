"use client"
import ChallangeDetails from '@/app/Component/ChallangesProgramComponent/StepChallenge';
import ChallengeCard from '@/app/Component/ChallangesProgramComponent/ChallengeCard';
import { ChallangesDataContext } from '@/app/Component/ChallangesProgramComponent/ChellangesContexts/ChallangesDataContext';
import Dropdown from '@/app/Component/ChallangesProgramComponent/Dropdown';
import { use } from 'react';

const page = () => {
    const { challangesData } = use(ChallangesDataContext);
    
    return (
        <div className='min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
            <div className=' mx-auto'>
                {/* Header Section */}
                <header className='mb-8 sm:mb-12'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <div className='flex-1'>
                            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-primary)] leading-tight">
                                Discover Your Next Challenge!
                            </h1>
                            <p className='text-sm sm:text-base opacity-70 mt-2'>
                                Browse and join challenges that match your goals
                            </p>
                        </div>
                        <div className='sm:ml-4'>
                            <Dropdown
                                title="Menu"
                                items={[
                                    "Profile",
                                    "Settings",
                                ]}
                            />
                        </div>
                    </div>
                </header>

                {/* Challenges Grid */}
                <main>
                    {challangesData && challangesData.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                            {challangesData.map((challenges) => (
                                <ChallengeCard
                                    key={challenges._id}
                                    challenges={challenges}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-12'>
                            <p className='text-lg opacity-60'>No challenges available at the moment</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default page;