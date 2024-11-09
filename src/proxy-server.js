import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    });

    res.set('Content-Type', 'text/html');
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});