import { DbManager } from "../../dbManager";
import { Logger } from "../../../classes/LogManager";
import { PreparedStatementInfo } from "mysql2/promise";
import { MysqlConfig } from "../../../configs/mysqlConfig";
import { IDbUserDao } from "../IDbUserDao";
import { DbUser } from "../../models/DbUser";
import { IDbInfoMessageDao } from "../IDbInfoMessageDao";
import { DbInfoMessage } from "../../models/DbInfoMessage";

export class DbInfoMessageDaoImpl implements IDbInfoMessageDao {
    private readonly dbManager: DbManager;

    constructor() {
        this.dbManager = new DbManager(MysqlConfig);
    }

    async createAsync(item: DbInfoMessage): Promise<void> {
        try {
            // Define variables
            const query = "INSERT INTO infomessages (messageId, messageName) VALUES (?, ?)";
            const params = [item.messageId, item.messageName];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }
    }
    
    async readByIdAsync(id: number): Promise<DbInfoMessage | null> {
        try {
            // Define variables
            const query = "SELECT * FROM infomessages WHERE id = ?";
            const params = [id];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === undefined) return null;
            const value: DbInfoMessage = new DbInfoMessage();
            value.id = results[0].id;
            value.messageId = results[0].messageId;
            value.messageName = results[0].messageName;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }

        return null;
    }

    async readByNameAsync(name: string): Promise<DbInfoMessage | null> {
        try {
            // Define variables
            const query = "SELECT * FROM infomessages WHERE messageName = ?";
            const params = [name];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === undefined) return null;
            const value: DbInfoMessage = new DbInfoMessage();
            value.id = results[0].id;
            value.messageId = results[0].messageId;
            value.messageName = results[0].messageName;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }

        return null;
    }
    
    async readAllAsync(): Promise<DbInfoMessage[]> {
        try {
            // Define variables
            const query = "SELECT * FROM infomessages";
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query);

            // Process results
            const value: DbInfoMessage[] = new Array<DbInfoMessage>();
            results.forEach((result) => {
                const item: DbInfoMessage = new DbInfoMessage();
                item.id = result.id;
                item.messageId = result.messageId;
                item.messageName = result.messageName;
                item.created = result.created;
                item.updated = result.updated;
                value.push(item);
            });

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }

        return new Array<DbInfoMessage>();
    }
    
    async updateAsync(item: DbInfoMessage): Promise<void> {
        try {
            // Define variables
            const query = "UPDATE infomessages SET messageId = ?, messageName = ? WHERE id = ?";
            const params = [item.messageId, item.messageName, item.id];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }
    }
    
    async updateByNameAsync(item: DbInfoMessage): Promise<void> {
        try {
            // Define variables
            const query = "UPDATE infomessages SET messageId = ? WHERE messageName = ?";
            const params = [item.messageId, item.messageName];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbInfoMessageDaoImpl");
        }
    }
    
    async deleteAsync(item: DbInfoMessage): Promise<void> {
        try {
            // Define variables
            const query = "DELETE FROM infomessages WHERE id = ?";
            const params = [item.id];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
}