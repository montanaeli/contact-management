"use client";

import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Inter } from "next/font/google";
import { loggedUser } from "@/lib/reducers/userSlice";
import { getUser } from "@/api-client/user"

const inter = Inter({ subsets: ["latin"] });

const UserLoaded = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.authSlice.authToken);

    useEffect(() => {
        if(!token || token === ""){
            return;
        }
        const process = async () => {
            try {
                const response = await getUser(token);
                dispatch(loggedUser({ name: response.name, contacts: response.contacts }));
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        process()
    }, [])
    const name = useSelector((state: RootState) => state.userSlice.name);

  return (
    <label className={`${inter.className} font-thin`}>Hi, {name}</label>
  );
};

export default UserLoaded;
