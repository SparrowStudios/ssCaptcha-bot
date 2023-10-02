import { DbManager } from "../../dbManager";
import { Logger } from "../../../classes/LogManager";
import { PreparedStatementInfo } from "mysql2/promise";
import { MysqlConfig } from "../../../configs/mysqlConfig";
import { IDbCaptchaDao } from "../IDbCaptchaDao";
import { DbCaptcha } from "../../models/DbCaptcha";

export class DbCaptchaDaoImpl implements IDbCaptchaDao {
    private readonly dbManager: DbManager;

    constructor() {
        this.dbManager = new DbManager(MysqlConfig);
    }

    async createAsync(item: DbCaptcha): Promise<void> {
        try {
            console.log(item);
            // Define variables
            const query = "INSERT INTO captchas (assignedUser, image, dataURL, value, expires) VALUES (?, BINARY(?), ?, ?, ?)";
            const params = [item.assignedUser, item.image, item.dataUrl, item.value, item.expires];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbCaptchaDaoImpl");
        }
    }
    
    async readByIdAsync(id: number): Promise<DbCaptcha | null> {
        try {
            // Define variables
            const query = "SELECT * FROM captchas WHERE id = ?";
            const params = [id];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === null || results[0] === undefined || results[0].id === null || results[0].id === undefined) return null;
            const value: DbCaptcha = new DbCaptcha();
            value.id = results[0].id;
            value.assignedUser = results[0].assignedUser;
            value.image = results[0].image;
            value.dataUrl = results[0].dataURL;
            value.value = results[0].value;
            value.expires = results[0].expires;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbCaptchaDaoImpl");
        }

        return null;
    }
    
    async readByAssignedUserIdAsync(id: number): Promise<DbCaptcha | null> {
        try {
            // Define variables
            const query = "SELECT * FROM captchas WHERE assignedUser = ?";
            const params = [id];
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query, params);

            // Process results
            if (results[0] === null || results[0] === undefined || results[0].id === null || results[0].id === undefined) return null;
            const value: DbCaptcha = new DbCaptcha();
            value.id = results[0].id;
            value.assignedUser = results[0].assignedUser;
            value.image = results[0].image;
            value.dataUrl = results[0].dataURL;
            value.value = results[0].value;
            value.expires = results[0].expires;
            value.created = results[0].created;
            value.updated = results[0].updated;

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbCaptchaDaoImpl");
        }

        return null;
    }
    
    async readAllAsync(): Promise<DbCaptcha[]> {
        try {
            // Define variables
            const query = "SELECT * FROM captchas";
            
            // Execute query
            const [results] = await this.dbManager.queryRows(query);

            // Process results
            const value: DbCaptcha[] = new Array<DbCaptcha>();
            results.forEach((result) => {
                const item: DbCaptcha = new DbCaptcha();
                item.id = result.id;
                item.assignedUser = result.assignedUser;
                item.image = result.image;
                item.dataUrl = result.dataURL;
                item.value = result.value;
                item.expires = result.expires;
                item.created = result.created;
                item.updated = result.updated;
                value.push(item);
            });

            return value;
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbCaptchaDaoImpl");
        }

        return new Array<DbCaptcha>();
    }
    
    async updateAsync(item: DbCaptcha): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async deleteAsync(item: DbCaptcha): Promise<void> {
        try {
            // Define variables
            const query = "DELETE FROM captchas WHERE id = ?";
            const params = [item.id];
            
            // Execute query
            const [inserted] = await this.dbManager.executeResult(query, params);
        } catch (error) {
            if (error instanceof Error) Logger.error(error, "DbCaptchaDaoImpl");
        }
    }
}