import { ClientEvents } from "discord.js";
import ExtendedClient from "./ExtendedClient";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public run: (client: ExtendedClient, ...args: ClientEvents[Key]) => any
    ) {}
}