import { ApplicationCommandDataResolvable } from "discord.js";

export interface IRegisterCommandsOptions {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}