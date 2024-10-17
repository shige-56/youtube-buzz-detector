if (!process.env.YOUTUBE_API_KEY) {
    console.error('YOUTUBE_API_KEY が見つかりません。');
  } else {
    console.log('YOUTUBE_API_KEY:', process.env.YOUTUBE_API_KEY);
  }
  
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.error('DISCORD_WEBHOOK_URL が見つかりません。');
  } else {
    console.log('DISCORD_WEBHOOK_URL:', process.env.DISCORD_WEBHOOK_URL);
  }
  

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
