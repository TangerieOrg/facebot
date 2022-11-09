import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import ScanMessages from "../util/scanMessages";
import { BotCommand } from "./types";

const ScanCommand : BotCommand = {
    command: new SlashCommandBuilder()
        .setName('scan')
        .setDescription('Scans the messages of the server')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction) => {
        ScanMessages(interaction.client, interaction.guildId!)
        if(interaction.isRepliable()) await interaction.reply({
            content: "Scanning",
            ephemeral: true
        }) 
    }
}

export default ScanCommand;