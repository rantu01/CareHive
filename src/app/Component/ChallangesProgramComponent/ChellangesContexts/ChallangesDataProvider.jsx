"use client";

import { useQuery } from "@tanstack/react-query";
import { ChallangesDataContext } from "./ChallangesDataContext";
import axios from "axios";


const ChallangesDataProvider = ({ children }) => {



    const fetchChallangesData = async () => {
        try {
            const response = await axios.get('/api/challenges');
            return response.data
        } catch (error) {
            console.error("Error fetching challanges data:", error);
            return [];
        }
    };

    const {
        data: challangesData = [],
        isLoading: isChallangesLoading,
        error: isChallangesError,
    } = useQuery({
        queryKey: ['challangesData'],
        queryFn: fetchChallangesData
    })


    const allChallangesData = {

        // challengesData,
        challangesData

    };

    return (
        <ChallangesDataContext.Provider value={allChallangesData}>
            {children}
        </ChallangesDataContext.Provider>
    );
};

export default ChallangesDataProvider;