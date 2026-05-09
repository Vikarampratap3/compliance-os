import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askComplianceAssistant } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export function ComplianceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Compliance AI. How can I help you with your governance or audit tasks today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askComplianceAssistant(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: AI Assistant is currently unavailable. Please check your API configuration." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 z-50 group overflow-hidden"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <motion.div 
          initial={false}
          animate={{ x: isOpen ? 0 : 50 }}
          className="absolute inset-0 bg-indigo-700 -z-10"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed bottom-24 right-6 w-[400px] max-h-[600px] h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Regulatory Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">Powered by Gemini</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-none"
                  )}>
                    {m.content}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                    {m.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 italic text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  Thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about SOC2 requirements..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-3">
                AI may generate inaccurate info. Verify important legal requirements.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
