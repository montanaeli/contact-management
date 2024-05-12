import db from '../models';
const Userdb = db.user
import { User } from "../data/dataInterfaces";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(__dirname, '..', 'data');
const usersDataPath = path.join(dataDirectory, 'users.json');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

async function findUserByUsernameAndPassword(username: string, password: string) {
  const whereClause = { username, password }
  return await Userdb.findOne({ where: whereClause });
}

export const authenticateUser = async (username: string, password: string): Promise<string | null> => {
  const user: User | undefined = await findUserByUsernameAndPassword(username, password)
  if (user && secretKey) {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "3h" });
  }
  return null;
};
