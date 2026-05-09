import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User as UserIcon, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { chatWithAI } from '../../services/gemini';
import { cn } from '../../lib/utils';

export function ComplianceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "SYSTEM KERNEL ONLINE. I am the Compliance OS Assistant. How can I assist with your regulatory architecture today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      history.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await chatWithAI(history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "PROTOCOL ERROR: Unable to synchronize with the AI core. Please check your system configuration." }]);
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
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-[20px] shadow-2xl flex items-center justify-center z-50 transition-all border border-slate-700",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Sparkles size={24} className="text-emerald-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '600px',
              width: '400px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-white border border-slate-200 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Bot size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">Compliance AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight">Active Core</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50"
                >
                  {messages.length === 1 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {['Risk Analysis', 'Audit Status', 'Module Setup', 'ISO 27001 Help'].map(q => (
                        <button 
                          key={q}
                          onClick={() => setInput(prev => prev + (prev ? ' ' : '') + `Tell me about ${q}`)}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 hover:border-emerald-300 hover:text-emerald-600 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={cn(
                      "flex gap-3",
                      m.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                      <div className={cn(
                        "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center",
                        m.role === 'user' ? "bg-slate-200 text-slate-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {m.role === 'user' ? <UserIcon size={16}/> : <Bot size={16}/>}
                      </div>
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                        m.role === 'user' 
                          ? "bg-slate-900 text-white rounded-tr-none" 
                          : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none"
                      )}>
                        <div className="markdown-body">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Bot size={16}/>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <RefreshCw size={14} className="animate-spin text-emerald-500" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-100 bg-white">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about regulatory kernels..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-50 transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-400 mt-3 text-center font-bold uppercase tracking-tighter">AI may generate non-compliant data. Verify all kernels.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
