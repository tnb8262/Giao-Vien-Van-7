import React from 'react';
import { BookOpen, Sparkles, PenTool, CheckCircle2, BookmarkCheck, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'outline' | 'review' | 'library' | 'linguistics';
  setActiveTab: (tab: 'chat' | 'outline' | 'review' | 'library' | 'linguistics') => void;
  onResetChat: () => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onResetChat,
  voiceEnabled,
  setVoiceEnabled,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-emerald-950 tracking-tight">
                Trợ lý Ngữ văn 7
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-emerald-100/90 text-emerald-800 rounded-md border border-emerald-300/60">
                Lớp 7
              </span>
            </div>
            <p className="text-xs text-stone-500 font-sans">
              Đồng hành cùng học sinh tự học, khơi dậy cảm xúc và tư duy viết văn
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70 hover:text-emerald-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trợ lý Trò chuyện</span>
          </button>

          <button
            onClick={() => setActiveTab('outline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'outline'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70 hover:text-emerald-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Xưởng Lập Dàn Ý</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'review'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70 hover:text-emerald-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Góp Ý Bài Làm</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70 hover:text-emerald-900'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Tác Phẩm Lớp 7</span>
          </button>

          <button
            onClick={() => setActiveTab('linguistics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'linguistics'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-100/70 hover:text-emerald-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tiếng Việt & Quiz</span>
          </button>
        </nav>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? 'Tắt đọc âm thanh' : 'Bật đọc câu trả lời'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-white/80 border-stone-200 text-stone-500 hover:text-stone-800'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onResetChat}
            title="Bắt đầu cuộc trò chuyện mới"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 bg-white/90 hover:bg-stone-100 border border-stone-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>
    </header>
  );
};
