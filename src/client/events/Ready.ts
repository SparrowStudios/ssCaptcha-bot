import ExtendedClient from "../../classes/ExtendedClient";
import { Channel, ChannelType, Client, Collection, Guild, GuildBasedChannel, GuildTextBasedChannel, Message, TextChannel } from "discord.js";
import { Event } from "../../classes/Event";
import { Logger } from "../../classes/LogManager";
import { formatString, sendOnlineWebhook } from "../../classes/CommonFunctions";
import { DiscordConfig } from "../../configs/DiscordConfig";
import { DbInfoMessageDaoImpl } from "../../mysql/dao/implementations/DbInfoMessageDaoImpl";
import { DbInfoMessage } from "../../mysql/models/DbInfoMessage";
import { ChannelNotFoundException } from "../../classes/exceptions/ChannelNotFoundException";

export default new Event("ready", async (extendedClient: ExtendedClient, client: Client) => {
    Logger.log(formatString("{0} is online", client.user != null ? client.user.username : "Bot"), "event_ready");
    if (DiscordConfig.guildId === undefined) return;

    const infoMessageDao: DbInfoMessageDaoImpl = new DbInfoMessageDaoImpl();
    const dbInfoMessages: DbInfoMessage[] = await infoMessageDao.readAllAsync();
    const guild: Guild | undefined = client.guilds.cache.get(DiscordConfig.guildId);
    const guildChannels: Collection<string, GuildBasedChannel> | undefined = guild?.channels.cache;
    const guildTextChannels: Collection<string, GuildTextBasedChannel> | undefined = guildChannels?.filter(channel => channel.type === ChannelType.GuildText) as Collection<string, GuildTextBasedChannel> | undefined;
    
    extendedClient.registerSlashCommands({
        commands: extendedClient.slashCommands,
        guildId: DiscordConfig.guildId
    });

    // Send static messages
    let key: keyof typeof DiscordConfig.staticMessages;
    for (key in DiscordConfig.staticMessages) {
        const value: any = DiscordConfig.staticMessages[key];
        const targetChannel: GuildTextBasedChannel | undefined = guildTextChannels?.get(value.targetChannel);
        
        if (targetChannel === null) {
            Logger.error(new ChannelNotFoundException(value.targetChannel), "event_ready");
            return;
        }

        // Check if the message is in the DB
        if (dbInfoMessages.map(msg => msg.messageName).includes(key)) {
            const targetDbMessage = dbInfoMessages.find(msg => msg.messageName === key)
            if (targetDbMessage?.messageId != null && targetDbMessage?.messageId != undefined) {
                // Try to fetch the message by it's ID
                const targetMessage: Message | undefined = await targetChannel?.messages.fetch(targetDbMessage?.messageId);

                if (targetMessage != undefined) await targetMessage.delete();
            } 
        }

        const newMessage: Message | undefined = await targetChannel?.send(value.content);
        if (newMessage != undefined) {
            const newDbInfoMessage: DbInfoMessage = new DbInfoMessage();
            newDbInfoMessage.messageId = newMessage.id;
            newDbInfoMessage.messageName = key;
        
            if (dbInfoMessages.map(msg => msg.messageName).includes(key)) {
                await infoMessageDao.updateByNameAsync(newDbInfoMessage);
            } else {
                await infoMessageDao.createAsync(newDbInfoMessage);
            }
        }
    }

    // Send online webhook
    await sendOnlineWebhook();
});
