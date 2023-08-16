import { IDao } from "./base/IDao";
import { DbInfoMessage } from "../models/DbInfoMessage";

export interface IDbInfoMessageDao extends IDao<DbInfoMessage> {
    readByNameAsync(name: string): Promise<DbInfoMessage | null>
}