"use client";

import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Inter } from "next/font/google";
import axiosInstance from "@/lib/axiosInstance";
import { loggedUser } from "@/lib/reducers/userSlice";

const inter = Inter({ subsets: ["latin"] });

const UserLoaded = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(!token || token === ""){
            return;
        }
        const process = async () => {
            const response = await axiosInstance.get("/me",{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            dispatch(loggedUser({ name: response.data.name, contacts: response.data.contacts }));
        }
        process()
    }, [])
    const name = useSelector((state: RootState) => state.userSlice.name);

  return (
    <label className={`${inter.className} font-thin`}>Hi, {name}</label>
  );
};

export default UserLoaded;
