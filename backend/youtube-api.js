const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchVideos(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.items;
}

module.exports = { fetchVideos };
