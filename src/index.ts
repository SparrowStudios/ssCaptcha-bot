require("dotenv").config();
import ExtendedClient from "./classes/ExtendedClient";

export const client = new ExtendedClient();

client.start();