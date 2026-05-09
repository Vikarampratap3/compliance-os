import React from 'react';
import { Construction, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function PlaceholderView({ title, submenu }: { title: string, submenu: string }) {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-6">
      <div className="w-24 h-24 bg-slate-50 rounded-[40px] border border-slate-200 flex items-center justify-center relative">
         <Construction size={40} className="text-slate-300" />
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.5, 1, 0.5]
           }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute -top-1 -right-1"
         >
           <Sparkles size={24} className="text-emerald-400" />
         </motion.div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Accessing {submenu}</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          The <span className="font-bold text-slate-700">{title}</span> kernel module is currently under synthesis. Standard OS routines are being established for this specific subdomain.
        </p>
      </div>
      
      <div className="flex items-center gap-3 pt-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Deployment in progress...</span>
      </div>
    </div>
  );
}
