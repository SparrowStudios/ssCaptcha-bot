import ExtendedClient from "../../classes/ExtendedClient";
import { GuildMember } from "discord.js";
import { Event } from "../../classes/Event";
import { Logger } from "../../classes/LogManager";
import { formatString, generateCaptcha } from "../../classes/CommonFunctions";
import { DiscordConfig } from "../../configs/DiscordConfig";
import { DbCaptcha } from "../../mysql/models/DbCaptcha";
import { DbUser } from "../../mysql/models/DbUser";
import { DbUserDaoImpl } from "../../mysql/dao/implementations/DbUserDaoImpl";
import { IDao } from "../../mysql/dao/base/IDao";
import { DbCaptchaDaoImpl } from "../../mysql/dao/implementations/DbCaptchaDaoImpl";

export default new Event("guildMemberAdd", async (_: ExtendedClient, member: GuildMember) => {
    const userDao: DbUserDaoImpl = new DbUserDaoImpl();
    
    try {
        const targetMember: GuildMember = await member.fetch();
        var dbUser: DbUser | null = await userDao.readByUserIdAsync(targetMember.id);
        
        if (dbUser === null) {
            var newDbUser: DbUser = new DbUser();
            newDbUser.userId = targetMember.id;
    
            await userDao.createAsync(newDbUser);
    
            dbUser = await userDao.readByUserIdAsync(targetMember.id);

            if (dbUser === null) return;
        }
    
        // Update user to reset captcha pass and fails
        dbUser.passedCaptcha = 0;
        await userDao.updateByUserIdAsync(dbUser);

        // Give them the Getting Started role
        const gettingStartedRole = await member.guild.roles.fetch(DiscordConfig.roles.gettingStarted);
        if (gettingStartedRole === null) return;
        await targetMember.roles.add(gettingStartedRole);
    } catch (e) {
        console.error(e);
    }
});
