import ExtendedClient from "../../classes/ExtendedClient";
import { ActionRowBuilder, Collection, Guild, GuildBasedChannel, GuildMember, 
    GuildTextBasedChannel, Interaction, InteractionType, ModalActionRowComponentBuilder, ModalBuilder, 
    TextInputBuilder, TextInputStyle, User } from "discord.js";
import { Event } from "../../classes/Event";
import { Logger } from "../../classes/LogManager";
import { formatString, generateCaptcha } from "../../classes/CommonFunctions";
import { DiscordConfig } from "../../configs/DiscordConfig";
import { DbCaptcha } from "../../mysql/models/DbCaptcha";
import { DbUser } from "../../mysql/models/DbUser";
import { DbUserDaoImpl } from "../../mysql/dao/implementations/DbUserDaoImpl";
import { IDao } from "../../mysql/dao/base/IDao";
import { DbCaptchaDaoImpl } from "../../mysql/dao/implementations/DbCaptchaDaoImpl";

export default new Event("interactionCreate", async (_: ExtendedClient, interaction: Interaction) => {
    if (interaction.type != InteractionType.MessageComponent) return;
    
    const userDao: DbUserDaoImpl = new DbUserDaoImpl();
    const captchaDao: DbCaptchaDaoImpl = new DbCaptchaDaoImpl();
    const guild: Guild | null = interaction.guild;
    const guildChannels: Collection<string, GuildBasedChannel> | undefined = guild?.channels.cache;
    const gettingStartedChannel: GuildTextBasedChannel = guildChannels?.find(channel => channel.id === DiscordConfig.channels.gettingStarted) as GuildTextBasedChannel;
    const targetUser: User = await interaction.user.fetch();
    var dbUser: DbUser | null = await userDao.readByUserIdAsync(targetUser.id);
    
    if (dbUser === null) {
        var newDbUser: DbUser = new DbUser();
        newDbUser.userId = targetUser.id;

        await userDao.createAsync(newDbUser);

        dbUser = await userDao.readByUserIdAsync(targetUser.id);

        if (dbUser === null) return;
    }

    if (dbUser.id === null) return;
    
    var targetUserCaptcha: DbCaptcha | null = await captchaDao.readByAssignedUserIdAsync(dbUser.id);
    
    if (targetUserCaptcha === null || targetUserCaptcha?.expires === null || targetUserCaptcha?.expires < new Date()) {
        if (targetUserCaptcha?.expires != null && targetUserCaptcha?.expires < new Date()) {
            await captchaDao.deleteAsync(targetUserCaptcha);
        }

        // Generate new captcha for the user
        var newCaptcha: DbCaptcha = await generateCaptcha();
        newCaptcha.assignedUser = dbUser.id;
        newCaptcha.expires = new Date(Date.now() + 600000);

        // Upload captcha to db
        await captchaDao.createAsync(newCaptcha);

        targetUserCaptcha = await captchaDao.readByAssignedUserIdAsync(dbUser.id);
    }

    if (targetUserCaptcha === null) return;
    if (targetUserCaptcha?.expires === null) return;
    if (targetUserCaptcha?.expires === undefined) return;
    if (targetUserCaptcha?.image === null) return;

    if (interaction.customId === DiscordConfig.staticMessages.verification.content.components[0].components[0].custom_id){
        // Show Captcha
        interaction.reply({
            ephemeral: true,
            content: formatString("Here is your CAPTCHA, it will expire in <t:{0}:R> on <t:{0}:f>", Math.floor(targetUserCaptcha.expires.getTime() / 1000)),
            files: [ targetUserCaptcha.image ]
        });
    
    } else if (interaction.customId === DiscordConfig.staticMessages.verification.content.components[0].components[1].custom_id){
        // Get Input
        interaction.showModal(
            new ModalBuilder()
                .setCustomId("verificationModal")
                .setTitle("SparrowStudios CAPTCHA Verification")
                .setComponents(
                    new ActionRowBuilder<ModalActionRowComponentBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("verificationModal_inputText_captcha")
                                .setLabel("Enter the text in your CAPTCHA")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                                .setMaxLength(6)
                                .setMinLength(6)
                        )
                )
        );

        const modalSubmission = await interaction.awaitModalSubmit({
            filter: (interaction) => interaction.customId === "verificationModal",
            time: 5 * 60 * 1000
        });

        console.log(modalSubmission);

        if (targetUserCaptcha?.expires < new Date()) {
            // Captcha expired
            modalSubmission.reply({
                ephemeral: true,
                content: "You CAPTCHA has expired, please try again!"
            });
        }

        if (modalSubmission.fields.getTextInputValue("verificationModal_inputText_captcha") === targetUserCaptcha?.value) {
            // interaction.deferReply();
            // Pass
            const gettingStartedRole = await guild?.roles.fetch(DiscordConfig.roles.gettingStarted);
            const memberRole = await guild?.roles.fetch(DiscordConfig.roles.member);
            const targetGuildMember = await guild?.members.fetch(targetUser.id);

            if (gettingStartedRole === null || memberRole === null || targetGuildMember === null) return;
            if (gettingStartedRole === undefined || memberRole === undefined || targetGuildMember === undefined) return;

            targetGuildMember?.roles.remove(gettingStartedRole);
            targetGuildMember?.roles.add(memberRole);
            
            if (dbUser === null) return;

            dbUser.passedCaptcha = 1;
            await userDao.updateAsync(dbUser);
        
            await captchaDao.deleteAsync(targetUserCaptcha);

            modalSubmission.reply({
                ephemeral: true,
                content: "CAPTCHA passed, your roles have been adjusted!"
            });
        } else {
            // Fail
            modalSubmission.reply({
                ephemeral: true,
                content: "CAPTCHA failed, please try again!"
            });
        }
    
    }
});
