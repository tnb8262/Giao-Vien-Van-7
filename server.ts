import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generate,
  MAX_OUTPUT_TOKENS,
  formatChatContents,
  buildOutlinePrompt,
  buildReviewPrompt,
} from './api/_lib/gemini.js';

dotenv.config();

// Server này dùng khi chạy trên AI Studio / local (npm run dev).
// Trên Vercel, các endpoint chạy bằng file trong thư mục api/.
// Prompt, model và client Gemini nằm chung ở api/_lib/gemini.ts.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', subject: 'Ngữ văn 7' });
  });

  // Chat endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Danh sách tin nhắn không hợp lệ' });
      }

      const response = await generate(formatChatContents(messages), MAX_OUTPUT_TOKENS.chat);

      const reply = (response.text || 'Mình chưa thể phản hồi lúc này. Bạn thử hỏi lại câu hỏi khác về môn Ngữ văn 7 nhé!').normalize('NFC');
      res.json({ reply });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({
        error: (error.message || 'Lỗi xử lý khi kết nối với Trợ lý Ngữ văn 7').normalize('NFC'),
      });
    }
  });

  // Specialized Essay Outline Builder endpoint
  app.post('/api/outline', async (req: Request, res: Response) => {
    try {
      const { topic, genre, bookSeries } = req.body;
      if (!topic) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đề bài hoặc chủ đề' });
      }

      const response = await generate(buildOutlinePrompt(topic, genre, bookSeries), MAX_OUTPUT_TOKENS.outline);

      res.json({ outline: (response.text || '').normalize('NFC') });
    } catch (error: any) {
      console.error('Outline API Error:', error);
      res.status(500).json({ error: (error.message || 'Lỗi lập dàn ý').normalize('NFC') });
    }
  });

  // Specialized Essay Review & Feedback endpoint
  app.post('/api/review', async (req: Request, res: Response) => {
    try {
      const { essay, topic, genre } = req.body;
      if (!essay || essay.trim().length < 20) {
        return res.status(400).json({ error: 'Nội dung bài viết quá ngắn để nhận xét' });
      }

      const response = await generate(buildReviewPrompt(essay, topic, genre), MAX_OUTPUT_TOKENS.review);

      res.json({ review: (response.text || '').normalize('NFC') });
    } catch (error: any) {
      console.error('Review API Error:', error);
      res.status(500).json({ error: (error.message || 'Lỗi nhận xét bài viết').normalize('NFC') });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
