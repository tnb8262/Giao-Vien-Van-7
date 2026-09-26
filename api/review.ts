import { MODEL, SYSTEM_INSTRUCTION, getAI, buildReviewPrompt } from './_lib/gemini.js';
import { allowPostOnly, type ApiRequest, type ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!allowPostOnly(req, res)) return;
  try {
    const { essay, topic, genre } = req.body || {};
    if (!essay || essay.trim().length < 20) {
      return res.status(400).json({ error: 'Nội dung bài viết quá ngắn để nhận xét' });
    }

    const response = await getAI().models.generateContent({
      model: MODEL,
      contents: buildReviewPrompt(essay, topic, genre),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    res.status(200).json({ review: (response.text || '').normalize('NFC') });
  } catch (error: any) {
    console.error('Review API Error:', error);
    res.status(500).json({ error: (error.message || 'Lỗi nhận xét bài viết').normalize('NFC') });
  }
}
