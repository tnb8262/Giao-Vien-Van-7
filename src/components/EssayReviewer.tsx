import React, { useState } from 'react';
import { CheckCircle2, Sparkles, MessageSquare, Copy, Check, Loader2, BookOpen, RefreshCw } from 'lucide-react';

interface EssayReviewerProps {
  onSendToChat: (prompt: string) => void;
}

const SAMPLE_ESSAY = `Mỗi khi nhớ về quê nội, hình ảnh người bà lại hiện lên trong tâm trí em với bao tình cảm tha thiết. Bà em năm nay đã ngoài bảy mươi tuổi rồi. Mái tóc bà bạc trắng như những đám mây mùa thu bồng bềnh trôi. Đôi bàn tay bà gầy gầy, nhăn nheo vì cả một đời vất vả sớm hôm vì con vì cháu. Em nhớ nhất những đêm hè oi bức, bà thường ngồi phe phẩy chiếc quạt nan hát ru cho em ngủ. Giọng hát của bà ấm áp đưa em vào giấc mơ cổ tích. Em yêu bà lắm và mong bà luôn khỏe mạnh để sống đời cùng chúng em.`;

export const EssayReviewer: React.FC<EssayReviewerProps> = ({ onSendToChat }) => {
  const [essayContent, setEssayContent] = useState(SAMPLE_ESSAY);
  const [topic, setTopic] = useState('Cảm nghĩ về người bà kính yêu');
  const [genre, setGenre] = useState('Văn biểu cảm lớp 7');
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReview = async () => {
    if (!essayContent.trim() || essayContent.trim().length < 20 || isLoading) return;
    setIsLoading(true);
    setReviewResult(null);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essay: essayContent.trim(),
          topic: topic.trim(),
          genre,
        }),
      });

      const data = await response.json();
      if (data.review) {
        setReviewResult(String(data.review).normalize('NFC'));
      } else {
        setReviewResult('Không thể nhận xét bài viết lúc này. Bạn vui lòng thử lại nhé!'.normalize('NFC'));
      }
    } catch (err: any) {
      setReviewResult('Lỗi kết nối khi nhận xét bài viết. Vui lòng kiểm tra lại mạng.'.normalize('NFC'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!reviewResult) return;
    navigator.clipboard.writeText(reviewResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/80 text-amber-200 text-xs font-semibold mb-3 border border-amber-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Phòng Góp Ý & Chấm Chữa Bài Làm</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100 mb-2">
            Góp Ý Từng Câu - Nâng Tầm Văn Viết
          </h2>
          <p className="text-amber-200/90 text-sm leading-relaxed">
            Dán đoạn văn hoặc bài viết của em vào đây! Trợ lý sẽ đóng vai giáo viên Ngữ văn 7 tìm ra những điểm sáng đầy xúc cảm, chỉ ra lỗi diễn đạt cần khắc phục và gợi ý các từ ngữ, hình ảnh giúp bài văn thêm bay bổng.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Đề bài (hoặc yêu cầu của bài):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="VD: Cảm nghĩ về người bà, hay đoạn văn cảm thụ thơ..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Thể loại bài viết:
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
            >
              <option value="Văn biểu cảm lớp 7">Văn biểu cảm (về con người, sự việc, tác phẩm)</option>
              <option value="Đoạn văn ghi lại cảm xúc về bài thơ 4 chữ, 5 chữ">Đoạn văn cảm xúc về thơ 4 chữ, 5 chữ</option>
              <option value="Văn tự sự lớp 7 (Kể lại trải nghiệm)">Văn tự sự (Kể lại trải nghiệm sâu sắc)</option>
              <option value="Văn nghị luận xã hội lớp 7">Văn nghị luận về vấn đề đời sống</option>
              <option value="Văn thuyết minh quy tắc, luật lệ">Văn thuyết minh về quy tắc, luật lệ</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-stone-700">
              Bài làm / Đoạn văn của em:
            </label>
            <span className="text-[11px] text-stone-500">
              {essayContent.length} ký tự
            </span>
          </div>
          <textarea
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
            rows={7}
            placeholder="Dán đoạn văn hoặc bài viết của em vào đây để được nhận xét..."
            className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all leading-relaxed"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            onClick={() => setEssayContent(SAMPLE_ESSAY)}
            className="text-xs text-amber-900 hover:text-amber-700 underline font-medium cursor-pointer"
          >
            Nạp đoạn văn mẫu để thử nghiệm
          </button>

          <button
            onClick={handleReview}
            disabled={!essayContent.trim() || essayContent.trim().length < 20 || isLoading}
            className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 text-white rounded-xl font-medium text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Trợ lý đang chấm chữa tận tình...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Nhận xét & Gợi ý sửa bài</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Review feedback result */}
      {reviewResult && (
        <div className="bg-white border border-amber-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-serif font-bold text-sm">
                A+
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Lời Nhận Xét Của Trợ Lý Ngữ Văn 7
                </h4>
                <p className="text-[11px] text-stone-500">Đánh giá theo tiêu chuẩn biểu cảm và diễn đạt lớp 7</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-[11px] text-emerald-700">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Sao chép</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onSendToChat(
                    `Em vừa được góp ý bài viết về chủ đề: "${topic}". Em muốn Trợ lý hướng dẫn viết lại câu văn cho giàu cảm xúc hơn!`
                  );
                }}
                className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Trò chuyện sửa tiếp</span>
              </button>
            </div>
          </div>

          <div className="prose prose-stone max-w-none text-sm font-serif leading-relaxed whitespace-pre-wrap selection:bg-amber-200 selection:text-amber-950">
            {reviewResult}
          </div>
        </div>
      )}
    </div>
  );
};
