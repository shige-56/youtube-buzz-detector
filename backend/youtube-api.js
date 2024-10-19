const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchRecentVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=JP&type=video&maxResults=50&order=date&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await axios.get(url);
    const now = new Date();

    return response.data.items.filter(video => {
      const publishedAt = new Date(video.snippet.publishedAt);
      const timeDiff = (now - publishedAt) / 1000 / 60;
      return timeDiff >= 10;
    });
  } catch (error) {
    console.error('YouTube APIエラー:', error.response.data);
    return [];
  }
}

async function getVideoStats(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(url);
  return response.data.items[0];
}

module.exports = { fetchRecentVideos, getVideoStats };
