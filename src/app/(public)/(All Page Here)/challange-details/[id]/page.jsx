"use client"

import StepChallenge from '@/app/Component/ChallangesProgramComponent/StepChallenge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import React, { use } from 'react';

const page = () => {

    const { id } = useParams()


    const fetchChallengeDetails = async () => {
        try {
            const response = await axios.get(`/api/challenges-details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching challenge details:", error);
        }
    }

    const {
        data: challengeDetails = [],
        isLoading: isChallengeDetailsLoading,
        error: isChallengeDetailsError,
    } = useQuery({
        queryFn: fetchChallengeDetails,
        queryKey: ['challengeDetails', id],
    })

    console.log("this is the challenge details", challengeDetails)



    isChallengeDetailsLoading && <p>Loading...</p>;
    isChallengeDetailsError && <p>Error loading challenge details.</p>;




    return (
        <div className='pt-32'>
            <StepChallenge challengeDetails={challengeDetails}/>
        </div>
    );
};

export default page;