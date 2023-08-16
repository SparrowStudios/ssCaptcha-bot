import { channel } from "diagnostics_channel";
import { GatewayIntentBits } from "discord.js";

export const DiscordConfig = {
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.GUILD_ID,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
    ],
    roles: {
        gettingStarted: "1116896669456421004",
        member: "1116893407114186874",
    },
    channels: {
        gettingStarted: "1116901299183702056",
    },
    staticMessages: {
        "verification": {
            type: "embed",
            targetChannel: "1116901299183702056",
            content: {
                channel_id: "1116901299183702056",
                content: "",
                tts: false,
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                style: 1,
                                label: "Show Captcha",
                                custom_id: "verificationMessage_row1_button_showCaptcha",
                                disabled: false,
                                type: 2,
                            },
                            {
                                style: 1,
                                label: "Verify",
                                custom_id: "verificationMessage_row1_button_verify",
                                disabled: false,
                                type: 2,
                            },
                        ],
                    },
                ],
                embeds: [
                    {
                        type: "rich",
                        title: "SparrowStudios Verification",
                        description: "To gain access to the SparrowStudios Discord you must first complete a CAPTCHA to verify you are human.\n\nWhen you are ready to take the CAPTCHA click the `Verify` button attached to this message",
                        color: 0xeb212e,
                        footer: {
                            text: "ssCaptcha Bot was designed by SparrowStudios",
                        },
                    },
                ],
            }
        }
    },
};
