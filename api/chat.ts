import {
  generate,
  MAX_OUTPUT_TOKENS,
  formatChatContents,
} from './_lib/gemini.js';
import { allowPostOnly, type ApiRequest, type ApiResponse } from './_lib/http.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (!allowPostOnly(req, res)) return;
  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Danh sách tin nhắn không hợp lệ' });
    }

    const response = await generate(formatChatContents(messages), MAX_OUTPUT_TOKENS.chat);

    const reply = (response.text || 'Mình chưa thể phản hồi lúc này. Bạn thử hỏi lại câu hỏi khác về môn Ngữ văn 7 nhé!').normalize('NFC');
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: (error.message || 'Lỗi xử lý khi kết nối với Trợ lý Ngữ văn 7').normalize('NFC'),
    });
  }
}
