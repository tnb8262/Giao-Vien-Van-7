import {
  generate,
  MAX_OUTPUT_TOKENS,
  buildReviewPrompt,
} from './_lib/gemini.js';
import { allowPostOnly, type ApiRequest, type ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!allowPostOnly(req, res)) return;
  try {
    const { essay, topic, genre } = req.body || {};
    if (!essay || essay.trim().length < 20) {
      return res.status(400).json({ error: 'Nội dung bài viết quá ngắn để nhận xét' });
    }

    const response = await generate(buildReviewPrompt(essay, topic, genre), MAX_OUTPUT_TOKENS.review);

    res.status(200).json({ review: (response.text || '').normalize('NFC') });
  } catch (error: any) {
    console.error('Review API Error:', error);
    res.status(500).json({ error: (error.message || 'Lỗi nhận xét bài viết').normalize('NFC') });
  }
}
