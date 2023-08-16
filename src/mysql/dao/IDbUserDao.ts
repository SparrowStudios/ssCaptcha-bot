import { IDao } from "./base/IDao";
import { DbUser } from "../models/DbUser";

export interface IDbUserDao extends IDao<DbUser> {
    readByUserIdAsync(id: string): Promise<DbUser | null>
}