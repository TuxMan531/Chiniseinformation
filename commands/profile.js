const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('gets users profile'),
	async execute(interaction) {

        const canvas = createCanvas(1920, 1080);
        const context = canvas.getContext('2d');
        // load and draw background
        const background = await loadImage('./background.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        // the text
        context.font = '100px Arial';
        context.fillStyle = 'white';
        context.fillText(`Username: ${interaction.user.username}`, 100, 100);
        context.fillText(`Display Name: ${interaction.user.displayName}`, 100, 200);

        const pfp = await loadImage('https://cdn.discordapp.com/avatars/309429229458685962/4e2af354f31be18c2048600ac5762e6b.webp?size=1024&width=0&height=281', 500, 500);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
        console.log(interaction.user)
		await interaction.reply(
            { files: [attachment] }

// `Username: ${interaction.user.username}
//Display Name: ${interaction.user.displayName}`



        );
	},
};

