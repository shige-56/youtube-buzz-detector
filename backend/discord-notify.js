const { WebhookClient } = require('discord.js');
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });

function sendNotification(video, score) {
    const message = `🚀 バズりそうな動画発見！\n🎥 タイトル: ${video.title}\n🔗 URL: ${video.url}\n📊 バズ予測スコア: ${score}`;
    webhookClient.send(message);
}

module.exports = { sendNotification };
