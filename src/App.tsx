import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { OutlineBuilder } from './components/OutlineBuilder';
import { EssayReviewer } from './components/EssayReviewer';
import { BookLibrary } from './components/BookLibrary';
import { LinguisticsWorkshop } from './components/LinguisticsWorkshop';
import { ChatMessage } from './types';
import { INITIAL_GREETING } from './data/grade7Data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'outline' | 'review' | 'library' | 'linguistics'>('chat');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: INITIAL_GREETING.normalize('NFC'),
      timestamp: Date.now(),
    },
  ]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim().normalize('NFC'),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send chat request to backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: (m.content || '').normalize('NFC'),
          })),
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const normalizedReply = String(data.reply).normalize('NFC');
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: normalizedReply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Speak aloud if voice mode is on
        if (voiceEnabled && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = normalizedReply.replace(/[*#_`>]/g, '');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'vi-VN';
          utterance.rate = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Mình gặp chút trục trặc khi kết nối. Bạn thử gửi lại câu hỏi môn Ngữ văn 7 nhé!'.normalize('NFC'),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lỗi mạng khi gửi câu hỏi. Bạn vui lòng kiểm tra kết nối và thử lại nhé!'.normalize('NFC'),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `greeting-${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING.normalize('NFC'),
        timestamp: Date.now(),
      },
    ]);
  };

  const handleSendToChat = async (prompt: string) => {
    setActiveTab('chat');
    await handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetChat={handleResetChat}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5">
        {activeTab === 'chat' && (
          <ChatView
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === 'outline' && (
          <OutlineBuilder onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'review' && (
          <EssayReviewer onSendToChat={handleSendToChat} />
        )}

        {activeTab === 'library' && (
          <BookLibrary onSelectWorkForChat={handleSendToChat} />
        )}

        {activeTab === 'linguistics' && (
          <LinguisticsWorkshop onSendToChat={handleSendToChat} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/60 bg-amber-50/50 py-4 text-center text-xs text-stone-500 font-serif">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Trợ lý học tập môn <strong>Ngữ văn lớp 7</strong> • Hướng dẫn tư duy & phát triển kỹ năng tự học
          </span>
          <span className="text-[11px] text-stone-400">
            Chương trình GDPT 2018 (Kết nối tri thức • Chân trời sáng tạo • Cánh diều)
          </span>
        </div>
      </footer>
    </div>
  );
}
