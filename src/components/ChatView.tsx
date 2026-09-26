import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Copy, Check, Volume2, CornerDownLeft, Loader2, Lightbulb, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';
import { QUICK_SUGGESTIONS } from '../data/grade7Data';

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  voiceEnabled: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  voiceEnabled,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    onSendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    const normalized = (text || '').normalize('NFC');
    navigator.clipboard.writeText(normalized);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = (text || '').normalize('NFC').replace(/[*#_`>]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] max-w-4xl mx-auto w-full bg-white/70 border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm">
      {/* Banner / Guide info */}
      <div className="bg-gradient-to-r from-amber-100/70 via-emerald-50 to-teal-50/70 px-4 py-2.5 border-b border-amber-200/60 flex items-center justify-between text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Nguyên tắc sư phạm:</strong> Trợ lý hướng dẫn tư duy, gợi ý dàn ý và câu hỏi định hướng, không làm hộ nguyên bài văn.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-emerald-800 font-medium bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300/60 text-[11px]">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Ngữ văn 7 chuẩn GDPT</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          const isRefusal = !isUser && message.content.includes('không thể trả lời câu hỏi này');

          return (
            <div
              key={message.id}
              className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  isUser
                    ? 'bg-amber-700 text-white'
                    : isRefusal
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : isRefusal ? (
                  <ShieldAlert className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs transition-all ${
                  isUser
                    ? 'bg-stone-900 text-stone-100 rounded-tr-xs'
                    : isRefusal
                    ? 'bg-rose-50 border border-rose-200 text-rose-950 rounded-tl-xs font-serif'
                    : 'bg-amber-50/70 border border-amber-200/70 text-stone-900 rounded-tl-xs font-serif'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-70">
                  <span className="font-semibold font-sans">
                    {isUser ? 'Học sinh' : 'Trợ lý Ngữ văn 7'}
                  </span>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Content with basic markdown-like rendering */}
                <div className="whitespace-pre-wrap selection:bg-emerald-200 selection:text-emerald-950">
                  {renderFormattedText((message.content || '').normalize('NFC'))}
                </div>

                {/* Action buttons on assistant message */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-amber-200/50 flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyToClipboard(message.content, message.id)}
                      className="p-1 hover:bg-amber-200/60 rounded text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                      title="Sao chép nội dung"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-[11px] text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Chép</span>
                        </>
                      )}
                    </button>

                    {voiceEnabled && (
                      <button
                        onClick={() => speakText(message.content)}
                        className="p-1 hover:bg-amber-200/60 rounded text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                        title="Đọc to câu trả lời"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Đọc</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl rounded-tl-xs p-4 text-stone-600 text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
              <span className="font-serif italic text-xs text-stone-600">
                Trợ lý đang suy nghĩ và chuẩn bị lời hướng dẫn tốt nhất cho em...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions chips */}
      <div className="px-4 py-2 border-t border-stone-200/60 bg-amber-50/40">
        <div className="text-[11px] text-stone-500 font-medium mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Gợi ý câu hỏi nhanh:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => onSendMessage(item.text)}
              className="text-xs bg-white hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi về tác phẩm lớp 7, cách viết đoạn văn, biện pháp tu từ, giải thích từ Hán Việt... (Shift + Enter để xuống dòng)"
          rows={2}
          className="flex-1 resize-none bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-sans leading-relaxed"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="h-10 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Gửi</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// Helper for rendering simple markdown tags (bold, italic, list markers) cleanly
function renderFormattedText(rawContent: string) {
  const content = (rawContent || '').normalize('NFC');
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    // Check if line is header or bullet
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={idx} className="font-bold text-base text-emerald-950 mt-2 mb-1">
          {trimmed.replace('### ', '')}
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={idx} className="font-bold text-lg text-emerald-950 mt-2 mb-1">
          {trimmed.replace('## ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h2 key={idx} className="font-bold text-xl text-emerald-950 mt-3 mb-1.5">
          {trimmed.replace('# ', '')}
        </h2>
      );
    }

    // Bullet points
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <div key={idx} className="flex items-start gap-2 ml-2 my-0.5">
          <span className="text-emerald-700 font-bold">•</span>
          <span>{parseInlineFormatting(trimmed.substring(2))}</span>
        </div>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s(.*)$/);
      if (match) {
        return (
          <div key={idx} className="flex items-start gap-2 ml-2 my-0.5">
            <span className="text-emerald-800 font-semibold">{match[1]}</span>
            <span>{parseInlineFormatting(match[2])}</span>
          </div>
        );
      }
    }

    return (
      <div key={idx} className={line === '' ? 'h-2' : 'my-0.5'}>
        {parseInlineFormatting(line)}
      </div>
    );
  });
}

function parseInlineFormatting(text: string) {
  const parts: React.ReactNode[] = [];
  // Regex to split by bold **text** or *italic*
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-emerald-950">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-stone-800">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1 py-0.5 bg-amber-100/80 rounded text-amber-950 text-xs font-mono">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
