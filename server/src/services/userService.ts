import { users, User } from "../data/dataInterfaces";

export const getUser = (id: string) : User | null => {
    const actualUser = users.find((u) => u.id === id);
    if (!actualUser) {
        return null
    }
    return actualUser
}
