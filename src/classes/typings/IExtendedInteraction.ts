import { CommandInteraction, GuildMember } from "discord.js";

export default interface IExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}