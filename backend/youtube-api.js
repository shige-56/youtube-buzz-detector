const axios = require('axios');

// YouTube動画情報を取得する関数
async function fetchVideos() {
    const apiKey = encodeURIComponent(process.env.YOUTUBE_API_KEY);
console.log('APIキー:', apiKey); // エンコードされたAPIキーを確認

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&regionCode=JP&order=date&key=${apiKey}`;
console.log('リクエストURL:', url); // 最終的なURLの確認

    axios.get(url)
  .then(response => {
    console.log('APIからの応答:', response.data);
  })
  .catch(error => {
    console.error('YouTube APIエラー:', error.response ? error.response.data : error.message);
  });
}

async function fetchChannelDetails(channelId) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.items[0].statistics.subscriberCount;
    } catch (error) {
        console.error('チャンネル詳細取得エラー:', error.message);
        throw error;
    }
}

module.exports = { fetchVideos, fetchChannelDetails };
