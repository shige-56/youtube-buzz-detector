const { fetchVideos } = require('../backend/youtube-api');
const { sendNotification } = require('../backend/discord-notify');

const channelId = 'YOUR_CHANNEL_ID';

async function checkAndNotify() {
    const videos = await fetchVideos(channelId);

    for (const video of videos) {
        const buzzScore = Math.random() * 100;  // 仮のスコア
        if (buzzScore >= 70) {
            sendNotification(video, buzzScore);
        }
    }
}

checkAndNotify();
