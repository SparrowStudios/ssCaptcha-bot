import { DbModel } from "./base/DbModel";

export class DbUser extends DbModel {
    public userId: string | null = null;
    public passedCaptcha: number | null = null;
    public captchaFails: number | null = null;
}