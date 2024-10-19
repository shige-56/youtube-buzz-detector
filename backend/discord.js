const axios = require('axios');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function sendDiscordNotification(video, metrics, sentiment) {
  const { id, snippet } = video;
  const message = {
    username: 'YouTube Buzz Detector',
    embeds: [
      {
        title: snippet.title,
        url: `https://www.youtube.com/watch?v=${id}`,
        description: snippet.description,
        fields: [
          { name: '再生回数の増加率', value: `${metrics.viewGrowth.toFixed(2)}%` },
          { name: 'いいね数の増加率', value: `${metrics.likeGrowth.toFixed(2)}%` },
          { name: 'コメント数の増加率', value: `${metrics.commentGrowth.toFixed(2)}%` },
          { name: '24時間後の再生回数予測', value: `${metrics.predictViews.toFixed(0)}` },
          { name: 'コメントのネガポジ分析', value: sentiment },
        ],
      },
    ],
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, message);
    console.log('Discordに通知を送信しました:', snippet.title);
  } catch (error) {
    console.error('Discord通知エラー:', error.response.data);
  }
}

module.exports = { sendDiscordNotification };
