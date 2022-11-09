import { Client } from "discord.js";

import dotenv from "dotenv";
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

listeners(client);

client.login(process.env.BOT_TOKEN);
