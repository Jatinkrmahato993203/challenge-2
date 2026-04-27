import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { submitChatMessage } from '../services/geminiService';
import Markdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm the Civic Compass Assistant. I can answer questions about voter registration, important deadlines, required documents, and state-specific election timelines. How can I help you today?" }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newHistory: ChatMessage[] = [...messages, { role: 'user', parts: [{ text: userMsg }] }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const responseText = await submitChatMessage(messages, userMsg);
      setMessages([...newHistory, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (error) {
      setMessages([...newHistory, { role: 'model', parts: [{ text: "Sorry, I ran into an error processing your request." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              size="lg" 
              className="rounded-full w-14 h-14 shadow-xl bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] hover:bg-[var(--color-editorial-muted)]"
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Civic Assistant"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[400px] h-[500px] max-h-[80vh] bg-[var(--color-editorial-bg)] border border-[var(--color-editorial-border)] shadow-2xl z-50 flex flex-col font-sans overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-editorial-border)] bg-[#f8f9fa]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-[var(--color-editorial-text)]">Civic Assistant</h3>
                  <p className="text-[10px] text-[var(--color-editorial-muted)] uppercase tracking-widest font-bold">Ask anything</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-transparent hover:opacity-50">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)]' 
                        : 'bg-gray-100 text-[var(--color-editorial-text)]'
                    }`}
                  >
                     <div className="markdown-body">
                       <Markdown>{m.parts[0].text}</Markdown>
                     </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-[var(--color-editorial-text)] rounded-2xl px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--color-editorial-border)] bg-[#f8f9fa] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about forms, deadlines..."
                className="flex-1 bg-transparent border border-[var(--color-editorial-border)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-editorial-text)] transition-colors placeholder:text-[var(--color-editorial-muted)]"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-full w-10 h-10 bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
