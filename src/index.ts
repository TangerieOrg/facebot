import { Client } from "discord.js";

import dotenv from "dotenv";
import RegisterCommands, { addCommand } from "./commands";
import FaceCommand from "./commands/face";
import ScanCommand from "./commands/scan";
import SimilarCommand from "./commands/similar";
import listeners from "./listeners";
dotenv.config();

console.log("Starting Client");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildBans",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildWebhooks",
        "GuildInvites",
        "GuildVoiceStates",
        "GuildPresences",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "DirectMessages",
        "DirectMessageReactions",
        "DirectMessageTyping",
        "MessageContent",
        "GuildScheduledEvents",
        "AutoModerationConfiguration",
        "AutoModerationExecution"
    ]
})

// addCommand(PingCommand);
addCommand(FaceCommand);
addCommand(SimilarCommand);
addCommand(ScanCommand)

RegisterCommands();

listeners(client);

client.login(process.env.BOT_TOKEN);
