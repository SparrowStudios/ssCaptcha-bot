import { IDao } from "./base/IDao";
import { DbCaptcha } from "../models/DbCaptcha";

export interface IDbCaptchaDao extends IDao<DbCaptcha> {}