const express = require('express');
const { fetchVideos } = require('./youtube-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/videos', async (req, res) => {
    const videos = await fetchVideos('YOUR_CHANNEL_ID');
    res.json(videos);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
