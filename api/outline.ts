import {
  generate,
  MAX_OUTPUT_TOKENS,
  buildOutlinePrompt,
} from './_lib/gemini.js';
import { allowPostOnly, type ApiRequest, type ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!allowPostOnly(req, res)) return;
  try {
    const { topic, genre, bookSeries } = req.body || {};
    if (!topic) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đề bài hoặc chủ đề' });
    }

    const response = await generate(buildOutlinePrompt(topic, genre, bookSeries), MAX_OUTPUT_TOKENS.outline);

    res.status(200).json({ outline: (response.text || '').normalize('NFC') });
  } catch (error: any) {
    console.error('Outline API Error:', error);
    res.status(500).json({ error: (error.message || 'Lỗi lập dàn ý').normalize('NFC') });
  }
}
