import { IDbModel } from "./IDbModel";

export abstract class DbModel implements IDbModel {
    public id: number | null = null;
    public created: Date | null = null;
    public updated: Date | null = null;
}