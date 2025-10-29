"use client"

import React, { use } from 'react';
import { Check, Sparkles } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';


const SubscriptionCard = ({ icon, price, status, facilityArray, isPopular = false }) => {

    const { user } = use(AuthContext)
    const router = useRouter();

    const handleSubscription = async (price, status) => {

        const subscriberData = {
            userId: user?.uid,
            name: user?.displayName || "ABCD",
            userEmail: user?.email || "email",
            price: price,
            subscrtiptionType: status,
            paymentType: "premium"

        }

        if (price === "Free") {
            router.push('/');
        } else {
            try {
                const response = await axios.post("/api/subscription-payment", subscriberData);
                const responseData = response.data;
                window.location.href = responseData.url;
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="relative bg-[var(--bg-color-all)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[var(--color-secondary)] ">
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] text-[var(--text-color-all)] px-4 py-1 rounded-bl-2xl flex items-center gap-1 text-sm font-semibold">
                    <Sparkles size={14} />
                    Popular
                </div>
            )}

            {/* Header */}
            <header className="p-6 pb-4">
                <div className="space-y-3">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        {icon || <Sparkles size={28} />}
                    </div>

                    {/* Status */}
                    <h3 className="text-2xl font-bold text-[var(--text-color-all)]">
                        {status || 'Starter'}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold bg-gradient-to-r from-[#19b4b4] to-[#3b7f81] bg-clip-text text-transparent">
                            {price || 'Free'}
                        </span>
                        {price !== 'Free' && (
                            <span className="text-[var(--text-color-all)] text-sm">/month</span>
                        )}
                    </div>
                </div>
            </header>

            {/* Divider */}
            <div className="px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-[#e2e8f0] dark:via-[#334155] to-transparent"></div>
            </div>

            {/* Main - Facilities */}
            <main className="p-6 py-5">
                <ul className="space-y-3">
                    {facilityArray && facilityArray.length > 0 ? (
                        facilityArray.map((facility, index) => (
                            <li key={index} className="flex items-start gap-3 group/item">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#19b4b4]/10 dark:bg-[#19b4b4]/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#19b4b4]/20 transition-colors">
                                    <Check size={14} className="text-[#19b4b4]" strokeWidth={3} />
                                </div>
                                <span className="text-[var(--text-color-all)] text-sm leading-relaxed">
                                    {facility}
                                </span>
                            </li>
                        ))
                    ) : (
                        <>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#19b4b4]/10 flex items-center justify-center flex-shrink-0">
                                    <Check size={14} className="text-[#19b4b4]" strokeWidth={3} />
                                </div>
                                <span className="text-[#1e293b] dark:text-[#f1f5f9] text-sm">Basic features included</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#19b4b4]/10 flex items-center justify-center flex-shrink-0">
                                    <Check size={14} className="text-[#19b4b4]" strokeWidth={3} />
                                </div>
                                <span className="text-[#1e293b] dark:text-[#f1f5f9] text-sm">24/7 Customer support</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#19b4b4]/10 flex items-center justify-center flex-shrink-0">
                                    <Check size={14} className="text-[#19b4b4]" strokeWidth={3} />
                                </div>
                                <span className="text-[#1e293b] dark:text-[#f1f5f9] text-sm">Easy setup process</span>
                            </li>
                        </>
                    )}
                </ul>
            </main>

            {/* Footer */}
            <footer className="p-6 pt-2 ">
                <button onClick={() => handleSubscription(price, status)} className="cursor-pointer w-full py-3.5 px-6 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:from-[#3b7f81] hover:to-[#19b4b4] text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                    Get Started
                </button>
            </footer>
        </div>
    );
};


export default SubscriptionCard

