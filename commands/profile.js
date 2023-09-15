const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { request } = require('undici');
const { join } = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('kinda gets users profile'),
	async execute(interaction) {

        const canvas = createCanvas(1920, 1080);
        const context = canvas.getContext('2d');
        // load fonts
        GlobalFonts.registerFromPath(join(__dirname, 'Minecraft.ttf'), 'Minecraft')
        console.log(GlobalFonts.families)

        // load and draw background
        const background = await loadImage('./background.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        // the text
        //tittle
        context.font = '100px Minecraft, Old English Text MT, Arial';
        context.fillStyle = 'white';
        context.fillText('Your Profile', 650, 100);
        // variables
        context.fillText(`Username: ${interaction.user.username}`, 100, 250);
        context.fillText(`Display Name: ${interaction.user.displayName}`, 100, 350);
        context.fillText(`Nickname: ${interaction.member.nickname}`, 100, 450);

        
        //pfp image
        //const pfp = await loadImage('./pfpf.png');
        //context.drawImage(pfp, (1920 - 556), 0,);
        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' , size:512}));
	const avatar = await loadImage(await body.arrayBuffer());
        context.drawImage(avatar, (1920 - 512), 0,);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png'});
        console.log(interaction.user)
		await interaction.reply(
            { files: [attachment] }

// `Username: ${interaction.user.username}
//Display Name: ${interaction.user.displayName}`



        );
	},
};

