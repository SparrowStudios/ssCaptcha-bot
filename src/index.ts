require("dotenv").config();
import { generateCaptcha } from "./classes/CommonFunctions";
import ExtendedClient from "./classes/ExtendedClient";
import { registerFont } from "canvas";
import { DbCaptcha } from "./mysql/models/DbCaptcha";

registerFont(require("path").resolve(__dirname, "../assets/Swift.ttf"), {
	family: "swift"
});

export const client = new ExtendedClient();

client.start();