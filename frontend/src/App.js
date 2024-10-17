import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/videos');
            setVideos(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">バズ予測ツール</h1>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>{video.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
