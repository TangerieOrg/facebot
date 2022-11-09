import { Interaction, REST, Routes } from "discord.js";
import { BotCommand } from "./types";

// const GUILD_IDS = ["425585563605925888"];

async function ClearCommands(rest : REST, BOT_CLIENT_ID : string, guild_id : string) {
    const existingCommands : any[] = await rest.get(Routes.applicationGuildCommands(BOT_CLIENT_ID, guild_id)) as any[];
    for(const command of existingCommands) {
        await rest.delete(Routes.applicationGuildCommand(BOT_CLIENT_ID, guild_id, command.id));
    }
}

async function RegisterGuildCommands(rest : REST, BOT_CLIENT_ID : string, guild_id : string) {
    await rest.put(Routes.applicationGuildCommands(BOT_CLIENT_ID, guild_id), {
        body: Object.values(commands).map(command => command.command.toJSON())
    });
}

const commands : Record<string, BotCommand> = {};

export function addCommand(...cs : BotCommand[]) {
    for(const c of cs) {
        commands[c.command.name] = c;
    }
}

export async function executeCommand(interaction : Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = commands[interaction.commandName];

    if(!command) {
        interaction.reply({
            content: "Invalid command",
            ephemeral: true
        })
    } else {
        try {
            command.execute(interaction);
        } catch {
            interaction.reply({
                content: "There was an error running this command",
                ephemeral: true
            })
        }
    }
}

export default async function RegisterCommands() {
    const BOT_CLIENT_ID = process.env.BOT_CLIENT_ID as string;

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);

    const guilds = await rest.get(Routes.userGuilds()) as any[];

    const GUILD_IDS = guilds.map(guild => guild.id);

    console.log(guilds.map(g => g.name));

    await Promise.all(GUILD_IDS.map(id => ClearCommands(rest, BOT_CLIENT_ID, id)));
    console.log(`Deleted commands from ${GUILD_IDS.length} guilds`);

    await Promise.all(GUILD_IDS.map(id => RegisterGuildCommands(rest, BOT_CLIENT_ID, id)));

    console.log(`Registered ${Object.values(commands).length} commands`);
}