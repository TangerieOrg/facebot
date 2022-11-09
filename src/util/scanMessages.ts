import { Client } from "discord.js";

import fs from "fs";

export default async function ScanMessages(client: Client, guild_id : string) {
    for (const [channelName, channel] of await client.guilds.cache.get(guild_id)?.channels.fetch() ?? []) {
        if (!channel || !channel?.isTextBased()) continue;

        const foldername = `data/${guild_id}/${channel.name}`;

        fs.mkdirSync(foldername, {
            recursive: true
        });

        console.log("Fetching messages for", channel.name);

        // Create message pointer
        let message = await channel.messages
            .fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

        let i = 0;
        while (message) {
            const msgPage = await channel.messages.fetch({ limit: 100, before: message.id })
            // Update our message pointer to be last message in page of messages
            message = 0 < msgPage.size ? msgPage.at(msgPage.size - 1) : null;
            fs.writeFileSync(`${foldername}/${i}.json`, JSON.stringify(msgPage, null, 2));
            i++;
        }

    }
}