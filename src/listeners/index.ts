import { Client } from "discord.js";
import onReady from "./ready";
import onInteractionCreate from "./interaction";

export default (client : Client) => {
    onReady(client);
    onInteractionCreate(client);
}