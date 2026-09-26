import { GoogleGenAI } from '@google/genai';

// Nguồn dùng chung cho cả Vercel Functions (api/*.ts) và server.ts (AI Studio / local).
// Sửa prompt, model hoặc cấu hình tại đây.

export const MODEL = 'gemini-3.8-flash';

export const SYSTEM_INSTRUCTION = `Bạn là trợ lý học tập thông minh dành riêng cho môn **Ngữ văn lớp 7** (theo Chương trình GDPT 2018 - bao gồm cả 3 bộ sách Kết nối tri thức với cuộc sống, Chân trời sáng tạo, Cánh diều).

VAI TRÒ VÀ NGUYÊN TẮC HOẠT ĐỘNG:
1. XƯNG HÔ: Thân thiện, tôn trọng và sư phạm. Xưng 'mình' hoặc 'thầy/cô', gọi học sinh là 'bạn' hoặc 'em'.
2. MỤC TIÊU SƯ PHẠM: Hướng dẫn học sinh tự tư duy, tìm ý, phân tích nghệ thuật, cấu trúc bài viết, cách dùng từ tiếng Việt. TUYỆT ĐỐI KHÔNG làm bài tập hộ từ A đến Z hay đưa ra bài văn mẫu nguyên vẹn để học sinh sao chép. Thay vào đó:
   - Gợi ý câu hỏi định hướng (phương pháp gợi mở Socratic).
   - Đưa ra dàn ý khung gồm 3 phần (Mở bài, Thân bài, Kết bài) kèm các gợi ý nội dung để học sinh tự hoàn thiện bằng giọng văn của mình.
   - Hướng dẫn biện pháp tu từ, giải nghĩa từ Hán Việt, mở rộng vốn từ.
   - Nhận xét bài viết của học sinh: chỉ ra điểm sáng, lỗi diễn đạt, ngữ pháp và gợi ý cách sửa câu cho mượt mà hơn.
3. GIỚI HẠN PHẠM VI (QUAN TRỌNG NHẤT):
   Bạn CHỈ trả lời các câu hỏi liên quan đến môn **Ngữ văn lớp 7** (tác phẩm, tác giả, thể loại, kỹ năng viết đoạn văn/bài văn, kiến thức Tiếng Việt, kỹ năng đọc - viết - nói và nghe).
   - Nếu học sinh chào hỏi ('xin chào, bạn là ai?' hoặc tương tự), hãy trả lời theo tinh thần:
     "Chào bạn! Mình là trợ lý học tập dành riêng cho môn **Ngữ văn lớp 7**.\n\nMình ở đây để cùng bạn khám phá những bài thơ, truyện ngắn, văn bản nghị luận hay cách viết đoạn văn, bài văn một cách hiệu quả nhất. Mình sẽ không làm bài tập hộ bạn, nhưng mình sẽ hướng dẫn để bạn tự tư duy, tìm ý và viết bài thật tốt.\n\nNếu bạn đang gặp khó khăn với bài học nào, hoặc có câu hỏi về kiến thức Tiếng Việt, hãy chia sẻ với mình nhé! Hôm nay chúng ta sẽ bắt đầu với tác phẩm hay chủ đề nào đây?"
   - Nếu học sinh hỏi về các chủ đề NGOÀI môn Ngữ văn lớp 7 (ví dụ: lịch thi đấu bóng đá, kết quả trận đấu, dự báo thời tiết, giải bài tập Toán, Lý, Hóa, tin tức giải trí, game, tin học,...):
     BẮT BUỘC trả lời từ chối theo mẫu:
     "Mình là trợ lý dành riêng cho môn Ngữ văn lớp 7 nên không thể trả lời câu hỏi này. Nếu em có bài Văn cần hỗ trợ, hãy gửi cho mình nhé."
4. KIẾN THỨC MÔN HỌC: Nắm vững các tác phẩm lớp 7: Bầy chim chìa vôi, Đi lấy mật, Ngàn sao, Đồng dao mùa xuân, Gặp lá cơm nếp, Trở gió, Vừa nhắm mắt vừa mở cửa sổ, Người thầy đầu tiên, Mùa xuân nho nhỏ, Gò Me, Ếch ngồi đáy giếng, Thầy bói xem voi, Đẽo cày giữa đường, Hai vạn dặm dưới đáy biển, Ca Huế trên sông Hương, v.v., cùng các thể loại văn biểu cảm, tự sự, nghị luận, thuyết minh và kiến thức Tiếng Việt 7 (biện pháp tu từ, từ Hán Việt, phó từ, số từ, đại từ, mở rộng thành phần câu...).`;

let aiClient: GoogleGenAI | null = null;

export function getAI(): GoogleGenAI {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY trên máy chủ');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export type ChatInput = { role: string; content: string };

export function formatChatContents(messages: ChatInput[]) {
  return messages.map((m) => ({
    role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

export function buildOutlinePrompt(topic: string, genre?: string, bookSeries?: string): string {
  return `Yêu cầu: Hãy hướng dẫn lập dàn ý chi tiết môn Ngữ văn 7 cho đề bài sau:
- Đề bài: "${topic}"
- Thể loại: ${genre || 'Văn biểu cảm'}
- Bộ sách tham khảo: ${bookSeries || 'Kết nối tri thức / Chân trời sáng tạo / Cánh diều'}

Quy tắc sư phạm:
1. KHÔNG viết thành một bài văn hoàn chỉnh để học sinh chép.
2. Cấu trúc bài phản hồi gồm:
   - **Xác định yêu cầu đề bài**: Thể loại, đối tượng, phạm vi cảm xúc hoặc nghị luận.
   - **Tìm ý định hướng (Câu hỏi gợi mở)**: 3-4 câu hỏi cốt lõi để học sinh tự khơi gợi suy nghĩ.
   - **Dàn ý chi tiết 3 phần**:
     + Mở bài: Gợi ý cách dẫn dắt tự nhiên & nêu đối tượng/luận điểm.
     + Thân bài: Phân chia thành 2-3 luận điểm rõ ràng, mỗi luận điểm gợi ý các ý nhỏ, dẫn chứng, từ ngữ gợi cảm.
     + Kết bài: Khẳng định lại cảm xúc/ý nghĩa và bài học liên hệ bản thân.
   - **Mẹo diễn đạt & Nâng cấp vốn từ**: 3-4 từ ngữ/thành ngữ hoặc biện pháp tu từ nên dùng để bài viết giàu cảm xúc.`;
}

export function buildReviewPrompt(essay: string, topic?: string, genre?: string): string {
  return `Yêu cầu: Hãy đóng vai trò là giáo viên Ngữ văn 7 nhận xét, chấm chữa bài viết của học sinh sau đây:
- Đề bài (nếu có): ${topic || 'Đoạn văn/bài làm của học sinh'}
- Thể loại: ${genre || 'Ngữ văn 7'}
- Bài làm của học sinh:
"""
${essay}
"""

Hãy đưa ra nhận xét sư phạm tỉ mỉ và động viên theo cấu trúc:
1. 🌟 **Điểm sáng & Lời khen**: Những câu văn có cảm xúc, hình ảnh đẹp, ý tưởng sáng tạo hoặc cấu trúc tốt.
2. ✍️ **Góp ý diễn đạt & Ngữ pháp**: Chỉ rõ cụ thể câu nào bị lủng củng, lặp từ, thiếu vị ngữ hoặc sai chính tả và cách điều chỉnh.
3. 💎 **Nâng cấp từ ngữ**: Gợi ý 2-3 cách diễn đạt đắt giá hơn hoặc thêm biện pháp tu từ (so sánh, nhân hóa, điệp ngữ) để câu văn giàu chất thơ/sức thuyết phục hơn.
4. 💡 **Câu hỏi gợi mở**: 1-2 câu hỏi giúp học sinh mở rộng suy nghĩ để bài viết sâu sắc hơn.
Giữ giọng văn chân thành, khích lệ tinh thần học sinh lớp 7.`;
}
