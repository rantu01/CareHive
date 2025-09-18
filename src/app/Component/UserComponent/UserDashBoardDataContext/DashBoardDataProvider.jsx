import React from 'react';
import { DashBoardDataContext } from './DashboardDataContext';

const DashBoardDataProvider = ({ children }) => {



    

    return <DashBoardDataContext >{children}</DashBoardDataContext>


};

export default DashBoardDataProvider;