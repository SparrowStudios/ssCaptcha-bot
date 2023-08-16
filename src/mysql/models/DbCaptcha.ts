import { DbModel } from "./base/DbModel";

export class DbCaptcha extends DbModel {
    public assignedUser: number | null = null;
    public image: Buffer | null = null;
    public dataUrl: string | null = null;
    public value: string | null = null;
    public expires: Date | null = null;
}