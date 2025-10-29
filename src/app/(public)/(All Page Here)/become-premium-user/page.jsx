import SubscriptionCard from '@/app/Component/PremiumUserComponent/SubscriptionCard';
import { plans } from '@/app/utils/iterableVariable';
import { Heart } from 'lucide-react';
import React from 'react';

const page = () => {
    return (
        <div className='py-32 max-w-7xl mx-auto'>

            <header>
                <div className="text-center mb-12">
                    <h1 className="text-4xl text-[var(--color-primary)] font-bold  mb-3">
                        Choose Your Plan
                    </h1>
                    <p className="text-[var(--text-color)]">
                        Select the perfect plan for your needs
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <SubscriptionCard
                        key={index}
                        status={plan.status}
                        price={plan.price}
                        facilityArray={plan.facilityArray}
                        isPopular={plan.isPopular}
                    />
                ))}
            </div>

        </div>
    );
};

export default page;