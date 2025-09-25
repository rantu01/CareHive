"use client";
import { use } from "react";
import { AuthContext } from "../context/authContext";



const UseAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default UseAuth;