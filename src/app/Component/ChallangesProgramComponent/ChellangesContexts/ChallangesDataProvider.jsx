"use client";

import { ChallangesDataContext } from "./ChallangesDataContext";


const ChallangesDataProvider = ({ children }) => {


    const challanges = "challanges data provider"


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