import React from 'react';
import { 
  Puzzle, 
  Search, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  MoreVertical,
  Activity,
  History
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_PROBLEMS = [
  { id: 'PRB-001', title: 'Recurring Session Timeout in APAC Shard', frequency: 'Daily', incidentCount: 42, rootCause: 'Pending Analysis', status: 'Investigating' },
  { id: 'PRB-002', title: 'API Gateway Latency Spike under High-Load', frequency: 'Weekly', incidentCount: 15, rootCause: 'Memory Leak in Dispatcher Kernel', status: 'Fix Identified' },
  { id: 'PRB-003', title: 'Intermittent Certificate Auth Rejections', frequency: 'Ongoing', incidentCount: 104, rootCause: 'Synchronicity Lag in HSM Cluster', status: 'Workaround Applied' },
  { id: 'PRB-004', title: 'Database Deadlocks on Audit Write Batching', frequency: 'Intermittent', incidentCount: 8, rootCause: 'Optimistic Locking Collision', status: 'Investigating' },
  { id: 'PRB-005', title: 'Asset Inventory Sync Delays (EMEA Region)', frequency: 'Continuous', incidentCount: 23, rootCause: 'Rate Limiting on Regional Connector', status: 'Fix Identified' },
  { id: 'PRB-006', title: 'Compliance Report Generation Failures', frequency: 'Weekly', incidentCount: 7, rootCause: 'Timeout on Legacy Database Query', status: 'Fix Identified' },
  { id: 'PRB-007', title: 'Webhook Delivery Inconsistencies', frequency: 'Intermittent', incidentCount: 31, rootCause: 'Retry Logic Bug in Event Publisher', status: 'Investigating' },
  { id: 'PRB-008', title: 'Audit Log Truncation Events', frequency: 'Monthly', incidentCount: 3, rootCause: 'Disk Space Threshold Exceeded', status: 'Workaround Applied' },
];

export function ProblemManagementView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <Puzzle size={26} className="text-emerald-500" />
          Problem Management (ISO 20000-1)
        </h1>
        <p className="text-sm text-slate-500 mt-1">Managing recurring incidents to identify underlying root causes and permanent fixes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-4">
            {MOCK_PROBLEMS.map((prb) => (
              <div key={prb.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex items-center justify-between cursor-pointer">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                       <Puzzle size={24} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{prb.id}</span>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                             <Activity size={10}/> {prb.incidentCount} Incidents
                          </span>
                       </div>
                       <h4 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors uppercase leading-none mb-2">{prb.title}</h4>
                       <div className="flex gap-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Root Cause: <span className="text-slate-600">{prb.rootCause}</span></p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frequency: <span className="text-slate-600">{prb.frequency}</span></p>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={cn(
                       "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                       prb.status === 'Investigating' ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-indigo-50 text-indigo-700 border-indigo-100"
                    )}>
                       {prb.status}
                    </span>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
                 </div>
              </div>
            ))}
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200">
               <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4 border-b border-slate-800 pb-4 flex items-center justify-between">
                  Known Error DB <History size={16}/>
               </h3>
               <p className="text-xs text-slate-400 leading-relaxed mb-6 italic">
                  "Documentation of workarounds for recurring issues in the sharded regional clusters."
               </p>
               <button className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                  Search KEDB Records
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
