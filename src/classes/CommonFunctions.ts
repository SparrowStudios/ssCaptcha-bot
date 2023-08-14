export function formatString(str: string, ...replacements: any[]): string {
    return str.replace(/{(\d+)}/g, function(match, number) { return typeof replacements[number] != 'undefined' ? replacements[number] : match; });
}

export function UTCDate(): string {
    const dateNow: Date = new Date(Date.now());
    const formatStr: string = "{0}-{1}-{2}";
    return formatString(formatStr,
        dateNow.getUTCMonth().toString().padStart(2, "0"),
        dateNow.getUTCDate().toString().padStart(2, "0"),
        dateNow.getUTCFullYear().toString()
    );
}

export function UTCTime(): string {
    const dateNow: Date = new Date(Date.now());
    const formatStr: string = "{0}:{1}:{2}";
    return formatString(formatStr,
        dateNow.getUTCHours().toString().padStart(2, "0"),
        dateNow.getUTCMinutes().toString().padStart(2, "0"),
        dateNow.getUTCMilliseconds().toString().padStart(2, "0")
    );
}

export function UTCTimestamp(): string {
    const formatStr: string = "{0} {1} UTC";
    return formatString(formatStr,
        UTCDate(),
        UTCTime()
    );
}

// export async function recursiveFileSearch(path: string, callback?: Function): Promise<string[]> {
//     return new Promise(async function(promiseResolve: any, promiseReject: any) {
//         try {
//             var result: string[] = [];

//             readdir(path, async function(error, files) {
//                 if (error) promiseReject();
//                 var i: number = 0;

//                 async function next(): Promise<void> {
//                     var file: string = files[i++];
//                     if (file === undefined || !file) return promiseResolve(result);
                    
//                     file = resolve(path, file);

//                     stat(file, async function(_error, stat) {
//                         if (stat && stat.isDirectory()) {
//                             await recursiveFileSearch(path, async function(e: any, _result: any) {
//                                 result = result.concat(_result);
//                                 next();
//                             });
//                         } else {
//                             result.push(file);
//                             next();
//                         }
//                     });
//                 }

//                 await next();
//             });
//         } catch (error) { promiseReject(error); }
//     });
// }

// export async function loadEvents(): Promise<Array<BotEvent>> {
//     Logger.log("Starting to load events", "init");

//     const events: Array<BotEvent> = new Array<BotEvent>();
//     const eventsDir: string = formatString("{0}\\src\\client\\events", projectRoot);
//     const eventFiles = await recursiveFileSearch(eventsDir);
    
//     for (let i = 0; i < eventFiles.length; i++) {
//         const file = eventFiles[i];
        
//         const raw = await import(file);
//         const event = raw.default ?? raw[Object.getOwnPropertyNames(raw).filter(n => n !== "__esModule")[0]];
        
//         if (!(event.prototype instanceof BotEvent)) throw new FileNotEventException(file);

//         events.push(event);
//     }

//     Logger.log("Finished loading events", "init");

//     return events;
// }

// export async function loadCommands(): Promise<Array<BotCommand>> {
//     Logger.log("Starting to load commands", "init");

//     const commands: Array<BotCommand> = new Array<BotCommand>();
//     const commandsDir: string = formatString("{0}\\src\\client\\commands", projectRoot);
//     const commandFiles = await recursiveFileSearch(commandsDir);
    
//     for (let i = 0; i < commandFiles.length; i++) {
//         const file = commandFiles[i];
        
//         const raw = await import(file);
//         const command = raw.default ?? raw[Object.getOwnPropertyNames(raw).filter(n => n !== "__esModule")[0]];
        
//         if (!(command.prototype instanceof BotCommand)) throw new FileNotCommandException(file);
        
//         commands.push(command);
//     }

//     Logger.log("Finished loading commands", "init");

//     return commands;
// }