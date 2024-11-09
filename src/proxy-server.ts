import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());

// Proxy middleware configuration
app.use('/', createProxyMiddleware({
  router: (req) => {
    const targetUrl = req.query.url as string;
    return targetUrl;
  },
  changeOrigin: true,
  pathRewrite: {
    '^/': '',
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});