export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type BookSeries = 'all' | 'kntt' | 'ctst' | 'cd';

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  genre: string;
  series: 'kntt' | 'ctst' | 'cd';
  seriesName: string;
  unit: string;
  summary: string;
  coreTheme: string;
  highlights: string[];
  keyQuotes: string[];
  sampleQuestions: string[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  tag: string;
  concept: string;
  classification?: string[];
  examples: {
    sentence: string;
    explanation: string;
  }[];
  tips: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface EssayPromptTemplate {
  id: string;
  title: string;
  genre: string;
  description: string;
  defaultTopic: string;
  suggestedSteps: string[];
}
