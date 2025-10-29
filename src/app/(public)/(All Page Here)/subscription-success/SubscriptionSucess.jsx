"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { CheckCircle, BadgeCheck } from 'lucide-react';

const SubscriptionSucess = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const getPaymentData = async () => {
        const response = await axios.get(`/api/payment-session/${sessionId}`);
        return response.data;
    };

    const { data: paymentData, isLoading, isError } = useQuery({
        queryFn: getPaymentData,
        queryKey: ['paymentData'],
        enabled: !!sessionId,
    });

    const successInformation = paymentData?.metadata;

    if (isLoading) return <p className="text-center mt-20 text-[var(--text-color-all)]">Loading...</p>;
    if (isError) return <p className="text-center mt-20 text-red-500">Something went wrong!</p>;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-color-all)]">
            <div className="w-full max-w-lg bg-[var(--color-white)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--bg-color-all)]">

                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--color-primary)] via-[#7FE87F] to-[var(--color-primary)] text-center py-12 px-6">
                    <div className="flex flex-col items-center">
                        <div className="bg-[var(--color-white)] p-4 rounded-full shadow-xl mb-4">
                            <CheckCircle size={56} className="text-[var(--color-primary)]" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-black)] mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-[var(--color-black)] text-lg flex items-center justify-center gap-2 opacity-80">
                            <BadgeCheck size={22} />
                            Subscription Confirmed
                        </p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-8 md:p-10 space-y-5">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-semibold text-[var(--color-secondary)]">Subscription Details</h2>
                        <div className="mt-1 h-1 w-16 bg-[var(--color-secondary)] mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4 text-[var(--text-color-all)]">
                        <p className="flex justify-between border-b pb-2">
                            <span className="text-[var(--color-black)] font-medium">Name:</span>
                            <span className='text-[var(--color-black)]'>{successInformation?.name}</span>
                        </p>
                        <p className="flex justify-between border-b pb-2">
                            <span className="text-[var(--color-black)] font-medium">Price:</span>
                            <span className='text-[var(--color-black)]'>${successInformation?.price}</span>
                        </p>
                        {/* <p className="flex justify-between border-b pb-2">
              <span className=" text-[var(--color-black)] font-medium">Subscription Type:</span>
              <span className='text-[var(--color-black)]'>{successInformation?.subscriptionType}</span>
            </p> */}
                        <p className="text-[var(--color-black)] flex justify-between border-b pb-2">
                            <span className="text-[var(--color-black)] font-medium">Email:</span>
                            <span>{successInformation?.userEmail}</span>
                        </p>
                    </div>

                    <div className="text-center pt-6">
                        <p className="text-sm text-gray-500">
                            A confirmation email has been sent to{" "}
                            <span className="font-semibold text-[var(--color-secondary)]">
                                {successInformation?.userEmail}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSucess;
