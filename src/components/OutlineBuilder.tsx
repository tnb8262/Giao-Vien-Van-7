import React, { useState } from 'react';
import { PenTool, Sparkles, BookOpen, ArrowRight, Copy, Check, MessageSquare, Loader2, Compass } from 'lucide-react';
import { ESSAY_TEMPLATES } from '../data/grade7Data';

interface OutlineBuilderProps {
  onSendToChat: (prompt: string) => void;
}

export const OutlineBuilder: React.FC<OutlineBuilderProps> = ({ onSendToChat }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(ESSAY_TEMPLATES[0]);
  const [customTopic, setCustomTopic] = useState(ESSAY_TEMPLATES[0].defaultTopic);
  const [bookSeries, setBookSeries] = useState('Chung cho cả 3 bộ sách (Kết nối tri thức / Chân trời sáng tạo / Cánh diều)');
  const [outlineResult, setOutlineResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (template: typeof ESSAY_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setCustomTopic(template.defaultTopic);
  };

  const handleGenerateOutline = async () => {
    if (!customTopic.trim() || isLoading) return;
    setIsLoading(true);
    setOutlineResult(null);

    try {
      const response = await fetch('/api/outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic.trim(),
          genre: selectedTemplate.genre,
          bookSeries,
        }),
      });

      const data = await response.json();
      if (data.outline) {
        setOutlineResult(String(data.outline).normalize('NFC'));
      } else {
        setOutlineResult('Không thể tạo dàn ý lúc này. Vui lòng thử lại sau.'.normalize('NFC'));
      }
    } catch (err: any) {
      setOutlineResult('Lỗi kết nối khi lập dàn ý. Bạn hãy thử lại nhé.'.normalize('NFC'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outlineResult) return;
    navigator.clipboard.writeText(outlineResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-500/40">
            <PenTool className="w-3.5 h-3.5" />
            <span>Phương pháp tư duy viết văn 7</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100 mb-2">
            Xưởng Lập Dàn Ý & Khơi Gợi Cảm Xúc
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Một bài văn hay bắt đầu từ một dàn ý mạch lạc. Trợ lý sẽ gợi mở hệ thống câu hỏi định hướng, chia nhỏ luận điểm Mở - Thân - Kết và mách nước những từ ngữ gợi cảm để bạn tự tin tự mình chấp bút.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 opacity-15 pointer-events-none">
          <BookOpen className="w-56 h-56 text-white" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Template selection */}
        <div className="md:col-span-1 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Kiểu bài Ngữ văn 7</span>
          </h3>

          <div className="space-y-2">
            {ESSAY_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleSelectTemplate(tmpl)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedTemplate.id === tmpl.id
                    ? 'bg-amber-100/90 border-amber-300 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold text-xs text-stone-900">
                    {tmpl.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 shrink-0">
                    {tmpl.genre}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-2">
                  {tmpl.description}
                </p>
              </button>
            ))}
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-stone-700">
            <span className="font-semibold text-amber-950 block mb-1">💡 Bí quyết viết văn 7:</span>
            Đừng vội viết ngay bài văn hoàn chỉnh. Hãy trả lời các câu hỏi gợi mở của Trợ lý trước, sau đó phát triển mỗi ý thành 1 đoạn văn hoàn chỉnh.
          </div>
        </div>

        {/* Right Column: Prompt & Outline Generator */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Đề bài hoặc chủ đề em cần viết:
              </label>
              <textarea
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                rows={2}
                placeholder="Ví dụ: Cảm nghĩ của em về người mẹ kính yêu, hay đoạn văn cảm xúc bài Đồng dao mùa xuân..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-sans leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="text-xs text-stone-500">
                Thể loại đang chọn: <strong className="text-stone-800">{selectedTemplate.genre}</strong>
              </div>

              <button
                onClick={handleGenerateOutline}
                disabled={!customTopic.trim() || isLoading}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-xl font-medium text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang xây dựng dàn ý...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Tạo dàn ý định hướng</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result card */}
          {outlineResult && (
            <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Dàn ý & Định hướng tư duy
                    </h4>
                    <p className="text-[11px] text-stone-500">Dành cho học sinh tự phát triển bài viết</p>
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
                        `Em muốn cùng Trợ lý phát triển bài văn cho đề bài: "${customTopic}". Hãy hướng dẫn em viết phần Mở bài trước nhé!`
                      );
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Luyện viết cùng Trợ lý</span>
                  </button>
                </div>
              </div>

              {/* Outline content */}
              <div className="prose prose-stone max-w-none text-sm font-serif leading-relaxed whitespace-pre-wrap selection:bg-emerald-200 selection:text-emerald-950">
                {outlineResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
