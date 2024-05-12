import db from '../models';
const Userdb = db.user
import { User } from "../data/dataInterfaces";
import * as fs from 'fs';
import * as path from 'path';

const dataDirectory = path.join(__dirname, '..', 'data');
const usersDataPath = path.join(dataDirectory, 'users.json');

async function findUser(userId: string) {
  const whereClause = { id: userId }
  return await Userdb.findOne({ where: whereClause });
}

export const getUser = async (id: string) : Promise<User | null> => {
    const actualUser = await findUser(id)
    if (!actualUser) {
        return null
    }

    return actualUser
}
