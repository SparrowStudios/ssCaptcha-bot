import { UTCTimestamp, UTCDate, formatString } from "./CommonFunctions";
import { writeFile } from "node:fs";

export class Logger {
    /**
     * @param {string} message content to log to console
     * @param {string} module the module where the log originates from
     */
    static log(message: string, module: string) {
        const output: string = formatString("{0} [{1}] LOG: {2}", UTCTimestamp(), module.toLocaleUpperCase(), message.trim());

        console.log(output);
        writeFile(formatString("./logs/{0}.log", UTCDate()), formatString("\n{0}", output), { flag: "a+" }, function(err) { });
    }

    /**
     * @param {string} error content to log to console
     * @param {string} module the module where the error originates from
     */
    static error(error: Error, module: string) {
        const output: string = formatString("{0} [{1}] ERROR: {2}", UTCTimestamp(), module.toLocaleUpperCase(), error.message.trim());
        
        console.log(error.stack);
        writeFile(formatString("./errors/{0}.log", UTCDate()), formatString("\n{0}", output), { flag: "a+" }, function(err) { });
    }
}