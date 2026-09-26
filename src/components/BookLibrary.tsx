import React, { useState } from 'react';
import { BookmarkCheck, Search, Sparkles, MessageSquare, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { LITERARY_WORKS } from '../data/grade7Data';
import { LiteraryWork, BookSeries } from '../types';

interface BookLibraryProps {
  onSelectWorkForChat: (prompt: string) => void;
}

export const BookLibrary: React.FC<BookLibraryProps> = ({ onSelectWorkForChat }) => {
  const [selectedSeries, setSelectedSeries] = useState<BookSeries>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWork, setSelectedWork] = useState<LiteraryWork | null>(LITERARY_WORKS[0]);

  const filteredWorks = LITERARY_WORKS.filter((work) => {
    const matchesSeries = selectedSeries === 'all' || work.series === selectedSeries;
    const matchesQuery =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.coreTheme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeries && matchesQuery;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Intro header */}
      <div className="bg-gradient-to-r from-stone-800 to-emerald-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-500/40">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Cẩm Nang Văn Bản Ngữ Văn 7</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100 mb-2">
            Thư Viện Tác Phẩm & Đọc Hiểu Sâu Sắc
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            Tra cứu tóm tắt, nét đặc sắc nghệ thuật, hình tượng tiêu biểu và những câu hỏi trọng tâm của các bài học theo cả 3 bộ sách mới: Kết nối tri thức, Chân trời sáng tạo và Cánh diều.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Book Series Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSeries('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
              selectedSeries === 'all'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tất cả bộ sách
          </button>
          <button
            onClick={() => setSelectedSeries('kntt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
              selectedSeries === 'kntt'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Kết nối tri thức
          </button>
          <button
            onClick={() => setSelectedSeries('ctst')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
              selectedSeries === 'ctst'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Chân trời sáng tạo
          </button>
          <button
            onClick={() => setSelectedSeries('cd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
              selectedSeries === 'cd'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Cánh diều
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên bài, tác giả..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Main layout: List + Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Works List */}
        <div className="md:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredWorks.map((work) => (
            <button
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedWork?.id === work.id
                  ? 'bg-amber-100/90 border-amber-300 shadow-xs ring-1 ring-amber-300'
                  : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-amber-50/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {work.seriesName}
                  </span>
                  <span className="text-[11px] text-stone-500 font-sans">
                    {work.unit}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {work.title}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Tác giả: {work.author} ({work.genre})
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>
          ))}

          {filteredWorks.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-dashed border-stone-300 text-stone-500 text-xs">
              Không tìm thấy tác phẩm phù hợp với từ khóa.
            </div>
          )}
        </div>

        {/* Right: Detailed Work Inspector */}
        <div className="md:col-span-7">
          {selectedWork ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
              {/* Header */}
              <div className="border-b border-stone-200 pb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {selectedWork.seriesName} • {selectedWork.unit}
                  </span>
                  <span className="text-xs text-stone-500 italic">
                    {selectedWork.genre}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">
                  {selectedWork.title}
                </h3>
                <p className="text-sm font-sans font-medium text-stone-600 mt-1">
                  Tác giả: <strong className="text-stone-900">{selectedWork.author}</strong>
                </p>
              </div>

              {/* Tóm tắt */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tóm tắt nội dung cốt lõi</span>
                </h5>
                <p className="text-xs font-serif text-stone-800 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {selectedWork.summary}
                </p>
              </div>

              {/* Chủ đề & Thông điệp */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chủ đề & Thông điệp nhân văn</span>
                </h5>
                <p className="text-xs text-stone-800 leading-relaxed font-serif bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                  {selectedWork.coreTheme}
                </p>
              </div>

              {/* Điểm nhấn nghệ thuật */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Nét đặc sắc nghệ thuật & Chi tiết đắt giá:
                </h5>
                <ul className="space-y-1.5">
                  {selectedWork.highlights.map((hl, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trích dẫn tiêu biểu */}
              {selectedWork.keyQuotes.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-stone-400" />
                    <span>Câu văn / Câu thơ đắt giá</span>
                  </h5>
                  <div className="space-y-2">
                    {selectedWork.keyQuotes.map((q, i) => (
                      <blockquote
                        key={i}
                        className="text-xs italic font-serif text-stone-800 bg-amber-50/40 border-l-3 border-amber-600 pl-3 py-1"
                      >
                        {q}
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick action: Discuss with AI */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  Bạn muốn tìm hiểu thêm về nhân vật, nghệ thuật hay bài tập của tác phẩm này?
                </span>
                <button
                  onClick={() => {
                    onSelectWorkForChat(
                      `Hãy hướng dẫn mình phân tích những nét đặc sắc về nội dung và nghệ thuật của tác phẩm "${selectedWork.title}" của ${selectedWork.author}`
                    );
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Hỏi Trợ lý về tác phẩm này</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
              Chọn một tác phẩm từ danh sách bên trái để xem cẩm nang chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
