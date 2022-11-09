import { SlashCommandBuilder } from "discord.js";
import { BotCommand } from "./types";

const PingCommand : BotCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    execute: async (iteraction) => {
        if(iteraction.isRepliable()) {
            iteraction.reply("Pong!");
        }
    }
}

export default PingCommand;