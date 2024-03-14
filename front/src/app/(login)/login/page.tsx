"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="font-bold max-w-4xl px-4 w-full md:w-3/4 lg:w-2/4 xl:w-96 mx-auto h-full flex flex-col justify-center items-center gap-3">
            <h1 className= {`${inter.className} font-extrabold text-3xl py-4`}>Welcome</h1>
            <Input title="Add" placeholder="john@doe.com" value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
            <Input title="Password" placeholder="**************" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button text="LOGIN" onChange={() => console.log("clicked")} />
        </div>
    );
}

export default Login;