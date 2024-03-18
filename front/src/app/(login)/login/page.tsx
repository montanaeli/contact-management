"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // TODO: use axios
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // TODO: Use token as state session, Redux
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="font-bold max-w-4xl px-4 w-full md:w-3/4 lg:w-2/4 xl:w-96 mx-auto h-full flex flex-col justify-center items-center gap-3">
      <h1 className={`${inter.className} font-extrabold text-3xl py-4`}>
        Welcome
      </h1>
      <Input
        title="Add"
        placeholder="john@doe.com"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        title="Password"
        placeholder="**************"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="LOGIN" onClick={handleLogin} />
    </div>
  );
};

export default Login;
