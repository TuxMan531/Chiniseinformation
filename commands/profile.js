const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('gets users profile'),
	async execute(interaction) {

        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');
        // load and draw background
        const background = await loadImage('./wallpaper.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        // Optional: Additional drawing or text
        // context.font = '10px sans-serif';
        // context.fillText('asdasdasda', 100, 100);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
       // context.font = '10px sans_sherif'
     //   context.fillText('asdasdasda',100,100)

        console.warn(interaction.user)
		await interaction.reply(
            { files: [attachment] }

// `Username: ${interaction.user.username}
//Display Name: ${interaction.user.displayName}`



        );
	},
};

