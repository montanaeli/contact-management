import axios from "@/lib/axiosInstance"

export async function getUser(token: string) {
    const response = await axios.get("/me",{
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    if (response) {
        return response.data
    } else {
        throw new Error("Unable to get user data");
    }
}