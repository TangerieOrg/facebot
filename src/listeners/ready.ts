import { ActivityType, Client } from "discord.js";
import ScanMessages from "../util/scanMessages";

export default (client : Client) => {
    client.on("ready", async () => {
        console.log(`Online as ${client.user?.username} [${client.user?.tag}]`);

        client.user?.setPresence({
            status: "online",
            afk: false,
            activities: [{
                name: "you sleep",
                type: ActivityType.Watching,
                url: "http://lookthats.me/search"
            }]
        })
    })
}