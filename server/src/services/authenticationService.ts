import { User } from "../data/dataInterfaces";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(__dirname, '..', 'data');
const usersDataPath = path.join(dataDirectory, 'users.json');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

function findUserByUsernameAndPassword(username: string, password: string) {
  const usersJson = fs.readFileSync(usersDataPath, 'utf8');
  let users = JSON.parse(usersJson);
  const user = users.find((u : any) => u.username === username && u.password === password);
  if (!user) {
    return null;
  }
  return user;
}

export const authenticateUser = (username: string, password: string): string | null => {
  const user: User | undefined = findUserByUsernameAndPassword(username, password)
  if (user && secretKey) {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "3h" });
  }
  return null;
};
