require('dotenv').config(); // これを必ず一番上に追加
const { fetchVideos, fetchChannelDetails } = require('../backend/youtube-api');
const axios = require('axios');

async function checkAndNotify() {
    try {
        const videos = await fetchVideos();

        for (const video of videos) {
            const { id, snippet } = video;
            const { channelId, title, publishedAt } = snippet;

            const subscriberCount = await fetchChannelDetails(channelId);
            const currentViews = Math.floor(Math.random() * 50000); // 仮の再生数 (API利用制限のため)
            const previousViews = currentViews - Math.floor(Math.random() * 10000); // 仮の前回再生数
            const elapsedHours = (Date.now() - new Date(publishedAt)) / (1000 * 60 * 60);

            const score = calculateAchievementScore(currentViews, previousViews, elapsedHours, elapsedHours - 5);
            const message = `動画: ${title}\n再生数: ${currentViews}\n登録者数: ${subscriberCount}\n24時間達成度: ${score.toFixed(2)}%`;

            await sendDiscordNotification(message);
        }
    } catch (error) {
        console.error('エラー:', error.message);
    }
}

function calculateAchievementScore(currentViews, previousViews, currentTime, previousTime) {
    const growthRate = (currentViews / previousViews) - 1;
    const remainingHours = 24 - currentTime;
    const timeInterval = currentTime - previousTime;
    const predictedViews = currentViews * Math.pow(1 + growthRate, remainingHours / timeInterval);
    return Math.min((predictedViews / 1_000_000) * 100, 100);
}

async function sendDiscordNotification(message) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    try {
        await axios.post(webhookUrl, { content: message });
        console.log('通知を送信しました:', message);
    } catch (error) {
        console.error('Discord通知エラー:', error.message);
    }
}

checkAndNotify();
