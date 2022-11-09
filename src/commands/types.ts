import type { Interaction, SlashCommandBuilder } from "discord.js";

export interface BotCommand {
    command: SlashCommandBuilder,
    execute(interaction : Interaction): Promise<void>;
}