import { SlashCommandBuilder } from "discord.js";
import { BotCommand } from "./types";

const FaceCommand : BotCommand = {
    command: new SlashCommandBuilder()
        .setName("montage")
        .setDescription("get a montage"),
    execute: async (interaction) => {
        if(!interaction.isRepliable()) return;
        await interaction.reply({
            embeds: [
                {
                    image: {
                        url: "http://lookthats.me/montage"
                    },
                    title: "A Face"
                }
            ],
            ephemeral: true
        })
    }
}

export default FaceCommand;