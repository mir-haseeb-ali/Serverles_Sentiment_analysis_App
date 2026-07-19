import express from 'express';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Sentiment Analysis Proxy Route
  app.get('/api/analyze', async (req, res) => {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: "Missing product query" });
    }

    try {
      const BASE_URL = process.env.VITE_API_BASE_URL || 'https://vd1fg0buca.execute-api.eu-north-1.amazonaws.com/default/youtube-sentiment-analysis';
      const url = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

      console.log(`[Proxy] Fetching sentiment for: ${query}`);
      
      const response = await axios.get(`${url}?query=${encodeURIComponent(query as string)}`, {
        timeout: 25000 // 25s timeout for the backend call
      });

      res.json(response.data);
    } catch (error: any) {
      console.error('[Proxy Error]:', error.message);
      res.status(error.response?.status || 500).json({ 
        error: "Backend communication failed",
        message: error.message
      });
    }
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentimenter Intelligence Server running at http://localhost:${PORT}`);
  });
}

startServer();
