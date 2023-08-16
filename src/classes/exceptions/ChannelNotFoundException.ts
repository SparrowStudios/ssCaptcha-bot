import { formatString } from "../CommonFunctions";
export class ChannelNotFoundException extends Error {
    constructor(channelId: string) {
        super(formatString("Could not find channel with id \"{0}\"", channelId));
        Object.setPrototypeOf(this, ChannelNotFoundException.prototype);
    }
}