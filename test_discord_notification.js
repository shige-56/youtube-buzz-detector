require('dotenv').config();
const axios = require('axios');

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

const testMessage = {
  content: '🚀 **テスト通知**: Discordへの通知が成功しました！',
  username: 'YouTube Buzz Detector',
  avatar_url: 'https://i.imgur.com/AfFp7pu.png',
};

(async () => {
  try {
    const response = await axios.post(webhookUrl, testMessage);
    console.log('通知が正常に送信されました:', response.status);
  } catch (error) {
    console.error('通知の送信に失敗しました:', error.message);
  }
})();
