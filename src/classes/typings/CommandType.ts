import { ChatInputApplicationCommandData, PermissionResolvable } from "discord.js"
import { RunFunction } from "./RunFunction";

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;