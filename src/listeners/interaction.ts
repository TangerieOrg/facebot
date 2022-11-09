import { Client } from "discord.js";
import { executeCommand } from "../commands";

export default (client : Client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand()) {
            await executeCommand(interaction);
        }
    })
}