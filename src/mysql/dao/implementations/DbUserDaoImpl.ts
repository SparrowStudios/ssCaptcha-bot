import { DbManager } from "../../dbManager";
import { Logger } from "../../../classes/LogManager";
import { PreparedStatementInfo } from "mysql2/promise";
import { MysqlConfig } from "../../../configs/mysqlConfig";
import { IDbUserDao } from "../IDbUserDao";
import { DbUser } from "../../models/DbUser";

export class DbUserDaoImpl implements IDbUserDao {
    private readonly dbManager: DbManager;

    constructor() {
        this.dbManager = new DbManager(MysqlConfig);
    }

    async createAsync(item: DbUser): Promise<void> {
        try {
            // Define variables
            const query = "INSERT INTO users (userId) VALUES (?)";
            const params = [item.userId];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
    
    async readByIdAsync(id: number): Promise<DbUser | null> {
        try {
            // Define variables
            const query = "SELECT * FROM users WHERE id = ?";
            const params = [id];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === undefined) return null;
            const value: DbUser = new DbUser();
            value.id = results[0].id;
            value.userId = results[0].userId;
            value.passedCaptcha = results[0].passedCaptcha;
            value.captchaFails = results[0].captchaFails;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }

        return null;
    }

    async readByUserIdAsync(id: string): Promise<DbUser | null> {
        try {
            // Define variables
            const query = "SELECT * FROM users WHERE userId = ?";
            const params = [id];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === undefined) return null;
            const value: DbUser = new DbUser();
            value.id = results[0].id;
            value.userId = results[0].userId;
            value.passedCaptcha = results[0].passedCaptcha;
            value.captchaFails = results[0].captchaFails;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }

        return null;
    }
    
    async readAllAsync(): Promise<DbUser[]> {
        try {
            // Define variables
            const query = "SELECT * FROM users";
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query);

            // Process results
            const value: DbUser[] = new Array<DbUser>();
            results.forEach((result) => {
                const item: DbUser = new DbUser();
                item.id = result.id;
                item.userId = result.userId;
                item.passedCaptcha = result.passedCaptcha;
                item.captchaFails = result.captchaFails;
                item.created = result.created;
                item.updated = result.updated;
                value.push(item);
            });

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }

        return new Array<DbUser>();
    }
    
    async updateAsync(item: DbUser): Promise<void> {
        try {
            // Define variables
            const query = "UPDATE users SET userId = ?, passedCaptcha = ?, captchaFails = ? WHERE id = ?";
            const params = [item.userId, item.passedCaptcha, item.captchaFails, item.id];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
    
    async updateByUserIdAsync(item: DbUser): Promise<void> {
        try {
            // Define variables
            const query = "UPDATE users SET passedCaptcha = ?, captchaFails = ? WHERE userId = ?";
            const params = [item.passedCaptcha, item.captchaFails, item.userId];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
    
    async deleteAsync(item: DbUser): Promise<void> {
        try {
            // Define variables
            const query = "DELETE FROM users WHERE id = ?";
            const params = [item.id];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
    
    async deleteByUserIdAsync(item: DbUser): Promise<void> {
        try {
            // Define variables
            const query = "DELETE FROM users WHERE userId = ?";
            const params = [item.userId];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbUserDaoImpl");
        }
    }
}