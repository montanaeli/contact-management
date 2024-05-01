import { User } from "../data/dataInterfaces";
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(__dirname, '..', 'data');
const usersDataPath = path.join(dataDirectory, 'users.json');

function findUser(userId: string) {
  const usersJson = fs.readFileSync(usersDataPath, 'utf8');
  let users = JSON.parse(usersJson);
  const user = users.find((u : any) => u.id === userId);
  if (!user) {
    return null;
  }
  return user;
}

export const getUser = (id: string) : User | null => {
    const actualUser = findUser(id)
    if (!actualUser) {
        return null
    }
    return actualUser
}
