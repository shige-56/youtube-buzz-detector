require('dotenv').config(); // これを必ず一番上に追加
const { fetchRecentVideos, getVideoStats } = require('../backend/youtube-api');
const { sendDiscordNotification } = require('../backend/discord');
const fs = require('fs').promises;

const calculateGrowthRate = (current, previous) =>
  ((current - previous) / previous) * 100;

const predictViews = (currentViews) => currentViews * 24; // 簡易予測モデル

(async () => {
  const videos = await fetchRecentVideos();
  const previousData = JSON.parse(await fs.readFile('data.json', 'utf-8') || '{}');

  for (const video of videos) {
    const videoId = video.id.videoId;
    const { statistics, snippet } = await getVideoStats(videoId);

    if (statistics && previousData[videoId]) {
      const previousStats = previousData[videoId].statistics;

      const viewGrowth = calculateGrowthRate(statistics.viewCount, previousStats.viewCount);
      const likeGrowth = calculateGrowthRate(statistics.likeCount, previousStats.likeCount);
      const commentGrowth = calculateGrowthRate(statistics.commentCount, previousStats.commentCount);

      const sentiment = analyzeSentiment([snippet.description]);

      if (viewGrowth > 10 || likeGrowth > 5 || commentGrowth > 5) {
        await sendDiscordNotification(
            { id: videoId, snippet },
            { 
              viewGrowth, 
              likeGrowth, 
              commentGrowth, 
              predictedViews: predictViews(statistics.viewCount) 
            },
            sentiment
          );
      }
    }

    await saveData(videoId, { statistics, snippet });
  }
})();
