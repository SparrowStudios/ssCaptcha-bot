import { formatString } from "../CommonFunctions";
export class FileNotEventException extends Error {
    constructor(file: string) {
        super(formatString("File in event folder is not a event ({0})", file));
        Object.setPrototypeOf(this, FileNotEventException.prototype);
    }
}