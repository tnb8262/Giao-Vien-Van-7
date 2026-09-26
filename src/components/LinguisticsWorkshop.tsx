import React, { useState } from 'react';
import { BookOpen, CheckCircle, HelpCircle, XCircle, Sparkles, MessageSquare, RotateCcw, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { GRAMMAR_TOPICS, QUIZ_BANK } from '../data/grade7Data';

interface LinguisticsWorkshopProps {
  onSendToChat: (prompt: string) => void;
}

export const LinguisticsWorkshop: React.FC<LinguisticsWorkshopProps> = ({ onSendToChat }) => {
  const [subTab, setSubTab] = useState<'theory' | 'quiz'>('theory');
  const [expandedTopic, setExpandedTopic] = useState<string>(GRAMMAR_TOPICS[0].id);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_BANK.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro header */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-semibold mb-3 border border-teal-500/40">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thực Hành Tiếng Việt Lớp 7</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100 mb-2">
            Góc Tiếng Việt & Luyện Tập Trắc Nghiệm
          </h2>
          <p className="text-teal-100 text-sm leading-relaxed">
            Hệ thống hóa các hiện tượng từ vựng, ngữ pháp và biện pháp tu từ trọng tâm lớp 7. Thử sức với bài trắc nghiệm nhanh để kiểm tra độ hiểu bài ngay hôm nay!
          </p>
        </div>
      </div>

      {/* Sub tabs switcher */}
      <div className="flex border-b border-stone-200 gap-4">
        <button
          onClick={() => setSubTab('theory')}
          className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
            subTab === 'theory'
              ? 'text-emerald-800 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>1. Lý Thuyết & Biện Pháp Tu Từ</span>
        </button>
        <button
          onClick={() => setSubTab('quiz')}
          className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer flex items-center gap-1.5 ${
            subTab === 'quiz'
              ? 'text-emerald-800 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>2. Luyện Trắc Nghiệm Nhanh</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            {QUIZ_BANK.length} câu
          </span>
        </button>
      </div>

      {/* Tab 1: Theory */}
      {subTab === 'theory' && (
        <div className="space-y-4">
          {GRAMMAR_TOPICS.map((topic) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedTopic(isExpanded ? '' : topic.id)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                      {topic.tag}
                    </span>
                    <h4 className="font-serif font-bold text-base text-stone-900">
                      {topic.title}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-stone-100 space-y-4 font-sans text-xs">
                    {/* Concept */}
                    <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/70 text-stone-800 text-sm font-serif leading-relaxed">
                      <strong>Khái niệm cốt lõi:</strong> {topic.concept}
                    </div>

                    {/* Classifications */}
                    {topic.classification && (
                      <div>
                        <h6 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1.5">
                          Phân loại & Các dạng thường gặp:
                        </h6>
                        <ul className="space-y-1 pl-1">
                          {topic.classification.map((cls, i) => (
                            <li key={i} className="flex items-start gap-2 text-stone-700">
                              <span className="text-emerald-700 font-bold">•</span>
                              <span>{cls}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Examples */}
                    <div>
                      <h6 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-2">
                        Ví dụ thực tế trong văn học:
                      </h6>
                      <div className="space-y-2">
                        {topic.examples.map((ex, i) => (
                          <div key={i} className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                            <p className="font-serif italic text-stone-900 text-xs mb-1">
                              {ex.sentence}
                            </p>
                            <p className="text-stone-600 text-[11px]">
                              ➜ <strong>Phân tích:</strong> {ex.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="flex items-start gap-2 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 text-emerald-950">
                      <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-0.5">Mẹo làm bài thi:</strong>
                        <span>{topic.tips}</span>
                      </div>
                    </div>

                    {/* Chat CTA */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() =>
                          onSendToChat(
                            `Hãy cho mình một số bài tập vận dụng về kiến thức "${topic.title}" trong Ngữ văn 7 và cùng mình giải nhé!`
                          )
                        }
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Luyện tập chủ đề này với Trợ lý</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Quiz */}
      {subTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Bài kiểm tra trắc nghiệm nhanh Tiếng Việt 7
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Đã chọn: {Object.keys(selectedAnswers).length} / {QUIZ_BANK.length} câu
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>

              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs cursor-pointer disabled:cursor-not-allowed"
              >
                Chấm điểm & Xem giải thích
              </button>
            </div>
          </div>

          {/* Score banner */}
          {showResults && (
            <div className="bg-gradient-to-r from-amber-100 to-emerald-100 border border-emerald-300/80 rounded-2xl p-5 text-center shadow-xs">
              <span className="text-3xl font-bold font-serif text-emerald-950">
                {calculateScore()} / {QUIZ_BANK.length}
              </span>
              <p className="text-xs font-medium text-stone-700 mt-1">
                {calculateScore() === QUIZ_BANK.length
                  ? 'Xuất sắc! Em đã nắm rất vững kiến thức Tiếng Việt 7.'
                  : calculateScore() >= QUIZ_BANK.length / 2
                  ? 'Khá tốt! Hãy đọc kỹ phần giải thích chi tiết bên dưới để hoàn thiện nhé.'
                  : 'Đừng nản lòng! Hãy ôn lại lý thuyết và hỏi Trợ lý những câu em chưa rõ.'}
              </p>
            </div>
          )}

          {/* Questions list */}
          <div className="space-y-4">
            {QUIZ_BANK.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Câu {idx + 1} • {q.topic}
                    </span>
                    {showResults && (
                      <span className="flex items-center gap-1 text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Chính xác
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Chưa đúng
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="font-serif font-bold text-stone-900 text-sm leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let optionStyle =
                        'border-stone-200 bg-white hover:bg-stone-50 text-stone-800';

                      if (selectedIdx === optIdx) {
                        optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium';
                      }

                      if (showResults) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = 'border-emerald-600 bg-emerald-100/80 text-emerald-950 font-semibold';
                        } else if (selectedIdx === optIdx && !isCorrect) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                        >
                          <span className="font-bold text-stone-500 uppercase">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed explanation */}
                  {showResults && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                      <div className="font-semibold text-stone-900 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Lời giải thích chi tiết:</span>
                      </div>
                      <p className="leading-relaxed font-serif">{q.explanation}</p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() =>
                            onSendToChat(
                              `Em muốn Trợ lý giảng giải kỹ hơn về câu hỏi này: "${q.question}" liên quan đến kiến thức "${q.topic}"`
                            )
                          }
                          className="text-[11px] text-emerald-800 hover:underline font-medium flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Hỏi Trợ lý thêm về câu này</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
