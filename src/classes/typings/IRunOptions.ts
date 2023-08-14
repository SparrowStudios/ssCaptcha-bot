import { CommandInteractionOptionResolver } from "discord.js";
import IExtendedInteraction from "./IExtendedInteraction";
import ExtendedClient from "../ExtendedClient";

export default interface RunOptions {
    client: ExtendedClient;
    interaction: IExtendedInteraction;
    args: CommandInteractionOptionResolver;
}