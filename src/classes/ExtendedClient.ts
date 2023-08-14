import glob from "glob";
import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import { CommandType } from "./typings/CommandType";
import { Logger } from "../classes/LogManager";
import { Event } from "./Event";
import { DiscordConfig } from "../configs/DiscordConfig";
import { promisify } from "util";
import { IRegisterCommandsOptions } from "./typings/IRegisterCommandsOptions";
import { Command } from "./Command";
import { FileNotCommandException } from "./exceptions/FileNotCommandException";
import { formatString } from "./CommonFunctions";

const globPromise = promisify(glob);

export default class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    slashCommands: ApplicationCommandDataResolvable[] = [];

    constructor() {
        super({
            intents: DiscordConfig.intents
        });
    }

    async start() {
        await this.registerCommands();
        await this.registerEvents();
        
        this.login(DiscordConfig.token);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerSlashCommands({ commands, guildId }: IRegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            Logger.log(formatString("Registering commands to guild with id \"{0}\"", guildId), "init");
        } else {
            this.application?.commands.set(commands);
            Logger.log("Registering commands globally", "init");
        }
    }

    async registerCommands() {
        Logger.log("Starting to load commands", "init");

        const commandFiles = await globPromise(`${__dirname}/../client/commands/*{.ts,.js}`);

        for (let i = 0; i < commandFiles.length; i++) {
            const filePath = commandFiles[i];
            const command = await this.importFile(filePath);
            
            if (!command.name) return;

            this.commands.set(command.name, command);
            this.slashCommands.push(command);

            Logger.log(formatString("Loaded {0} command", command.name), "init");
        }

        Logger.log("Finished loading commands", "init");
    }

    async registerEvents() {
        Logger.log("Starting to load events", "init");

        const eventFiles = await globPromise(`${__dirname}/../client/events/*{.ts,.js}`);

        for (let i = 0; i < eventFiles.length; i++) {
            const filePath = eventFiles[i];
           
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);

            this.on(event.event, (...args) => event.run(this, ...args));

            Logger.log(formatString("Loaded {0} event", event.event), "init");
        }

        Logger.log("Finished loading events", "init");
    }
    
}