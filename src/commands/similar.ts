import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder } from "discord.js";
import { BotCommand } from "./types";

const allowedFileTypes = ["image/png", "image/jpeg"];

const SimilarCommand: BotCommand = {
    command: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search for similar faces")
        .addAttachmentOption(option => (
            option.setName('face')
                .setDescription('An image containing at least one face')
                .setRequired(true)
        )) as SlashCommandBuilder,
    execute: async (interaction) => {
        if (!interaction.isCommand() || !interaction.isChatInputCommand()) return;

        const face = interaction.options.getAttachment('face');

        if (!face) {
            await interaction.reply({
                content: `No valid attachment found`,
                ephemeral: true
            })
            return
        }

        await interaction.reply({
            content: `Searching...`,
            embeds: [{
                image: {
                    url: face.url
                }
            }]
        })


        const faceImg = await fetch(face.url).then(x => x.blob());
        // console.log(faceImg);

        if (!allowedFileTypes.includes(faceImg.type)) {
            await interaction.editReply({
                content: `File must be an image`
            })
            return
        }

        const formData = new FormData();
        formData.append('file', faceImg, face.name ?? "image.png");

        const facesResponse = await fetch("http://lookthats.me/test/find_closest_new", {
            method: 'POST',
            body: formData
        }).then(x => x.json());

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("previous")
                    .setLabel("<")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("next")
                    .setLabel(">")
                    .setStyle(ButtonStyle.Primary)
            )

        let currentUrl = 0;

        const makeUrl = () => {
            const { location: [top, right, bottom, left], origin } = facesResponse[currentUrl];
            return `http://lookthats.me/image?origin=${origin}&top=${top}&right=${right}&bottom=${bottom}&left=${left}`
        };

        await interaction.editReply({
            content: "",
            embeds: [{
                image: {
                    url: makeUrl()
                }
            }],
            components: [row as any]
        });


        const previousCollector = (await interaction.fetchReply()).createMessageComponentCollector({ filter: i => i.customId === 'previous' || i.customId === 'next', componentType: ComponentType.Button })!;

        previousCollector.on('collect', async i => {
            currentUrl = Math.min(Math.max(currentUrl + (i.customId === 'next' ? 1 : -1), 0), facesResponse.length);
            await i.deferUpdate();
            await i.message.edit({
                content: "",
                embeds: [{
                    image: {
                        url: makeUrl()
                    }
                }],
                components: [row as any]
            });
        });
    }
}

export default SimilarCommand;