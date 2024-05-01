import axios from "@/lib/axiosInstance";

export async function login(username:string, password:string) {
    const response = await axios.post("/login", { username: username, password: password})
    if (response) {
        return response.data
    } else {
        throw new Error("Unable to login")
    }
} 