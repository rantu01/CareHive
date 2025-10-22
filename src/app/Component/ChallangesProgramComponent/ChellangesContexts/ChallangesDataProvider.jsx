"use client";

import { useQuery } from "@tanstack/react-query";
import { ChallangesDataContext } from "./ChallangesDataContext";
import axios from "axios";


const ChallangesDataProvider = ({ children }) => {


    const challanges = "challanges data provider"

    const fetchChallangesData = async () => {
        try {
            const response = await axios.get('/api/challenges');
            console.log(response)
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


    console.log("the challenges data is",challangesData)

    const allChallangesData = {
        challanges

    };

    return (
        <ChallangesDataContext.Provider value={allChallangesData}>
            {children}
        </ChallangesDataContext.Provider>
    );
};

export default ChallangesDataProvider;