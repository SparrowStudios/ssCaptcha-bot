import { DbModel } from "./base/DbModel";

export class DbInfoMessage extends DbModel {
    public messageId: string | null = null;
    public messageName: string | null = null;
}