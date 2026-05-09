import React from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  ArrowRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export function RiskRegistersView() {
  const risks = [
    { id: 1, title: 'Data Sovereignty Breach', impact: 'High', likelihood: 'Low', status: 'Mitigated', trend: 'down' },
    { id: 2, title: 'Supplier Insolvency (Tier 1)', impact: 'Severe', likelihood: 'Medium', status: 'Active', trend: 'up' },
    { id: 3, title: 'Regulatory Update Latency', impact: 'Medium', likelihood: 'High', status: 'Monitoring', trend: 'stable' },
    { id: 4, title: 'Cryptographic Key Expiry', impact: 'Severe', likelihood: 'Low', status: 'Accepted', trend: 'down' },
    { id: 5, title: 'Insider Threat / Data Leak', impact: 'Severe', likelihood: 'Low', status: 'Mitigated', trend: 'stable' },
    { id: 6, title: 'Cloud Infrastructure Outage', impact: 'High', likelihood: 'Medium', status: 'Active', trend: 'up' },
    { id: 7, title: 'Phishing / Social Engineering', impact: 'Medium', likelihood: 'High', status: 'Monitoring', trend: 'up' },
    { id: 8, title: 'Third-party API Integration Failure', impact: 'Medium', likelihood: 'Medium', status: 'Active', trend: 'stable' },
    { id: 9, title: 'Ransomware Attack / Malware Infection', impact: 'Severe', likelihood: 'Low', status: 'Mitigated', trend: 'down' },
    { id: 10, title: 'Compliance Audit Failure', impact: 'High', likelihood: 'Low', status: 'Monitoring', trend: 'down' },
    { id: 11, title: 'Data Quality Issues in Analytics', impact: 'Medium', likelihood: 'Medium', status: 'Accepted', trend: 'stable' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Risk Registers</h1>
          <p className="text-sm text-slate-500">Aggregate enterprise risk profiling across all sharded nodes.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 rounded-xl text-sm font-bold text-white hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">
          <ShieldAlert size={18}/> log New Risk Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
             <AlertTriangle size={16} className="text-rose-500" /> Critical Risk Matrix
           </h3>
           <div className="aspect-square grid grid-cols-3 grid-rows-3 gap-2">
              {[...Array(9)].map((_, i) => {
                const colors = ['bg-amber-100', 'bg-amber-200', 'bg-rose-300', 'bg-amber-50', 'bg-amber-100', 'bg-rose-200', 'bg-emerald-50', 'bg-amber-50', 'bg-amber-100'];
                return (
                  <div key={i} className={cn("rounded-lg border border-white/50 flex items-center justify-center relative", colors[i])}>
                    {i === 2 && <div className="w-3 h-3 bg-rose-600 rounded-full animate-pulse shadow-lg" />}
                    {i === 5 && <div className="w-2 h-2 bg-amber-500 rounded-full shadow-md" />}
                  </div>
                );
              })}
           </div>
           <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
             <span>Low Impact</span>
             <span>High Impact</span>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
           {risks.map((risk) => (
             <div key={risk.id} className="p-5 bg-white border border-slate-200 rounded-3xl flex items-center justify-between hover:border-rose-200 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    risk.impact === 'Severe' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                  )}>
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-rose-700 transition-colors uppercase tracking-tight">{risk.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact: <span className="text-slate-600">{risk.impact}</span></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: <span className="text-slate-600">{risk.status}</span></span>
                      {risk.trend === 'up' && <TrendingUp size={12} className="text-rose-500" />}
                      {risk.trend === 'down' && <TrendingDown size={12} className="text-emerald-500" />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className={cn(
                     "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm",
                     risk.likelihood === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                   )}>
                     Prob: {risk.likelihood}
                   </div>
                   <ArrowRight size={18} className="text-slate-300 group-hover:text-rose-500 transition-all group-hover:translate-x-1" />
                </div>
             </div>
           ))}
           <button className="w-full border-2 border-dashed border-slate-200 rounded-3xl p-4 text-xs font-bold text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
             <Plus size={16}/> Load Archived Risk Entities
           </button>
        </div>
      </div>
    </div>
  );
}
