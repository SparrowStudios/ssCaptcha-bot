import ExtendedClient from "../../classes/ExtendedClient";
import { Client } from "discord.js";
import { Event } from "../../classes/Event";
import { Logger } from "../../classes/LogManager";
import { formatString } from "../../classes/CommonFunctions";
import { DiscordConfig } from "../../configs/DiscordConfig";

export default new Event("ready", (extendedClient: ExtendedClient, client: Client) => {
    Logger.log(formatString("{0} is online", client.user != null ? client.user.username : "Bot"), "event_ready");

    extendedClient.registerSlashCommands({
        commands: extendedClient.slashCommands,
        guildId: DiscordConfig.guildId
    });
});
