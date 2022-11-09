import { Client } from "discord.js";
import onReady from "./ready";

export default (client : Client) => {
    onReady(client);
}