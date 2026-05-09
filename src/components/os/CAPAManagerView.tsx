import React from 'react';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Zap,
  Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_CAPA = [
  { id: 'CAPA-0012', source: 'Q2 InfoSec Audit', rootCause: 'Misconfigured S3 Bucket ACLs', actionPlan: 'Implement explicit deny policies.', verification: 'Pending', status: 'In Progress', severity: 'Critical' },
  { id: 'CAPA-0013', source: 'Incident INC-192', rootCause: 'Human Error dynamic secrets', actionPlan: 'Transition to Vault.', verification: 'Verified', status: 'Completed', severity: 'High' },
  { id: 'CAPA-0014', source: 'Customer Feedback', rootCause: 'EMEA Latency', actionPlan: 'Provision edge clusters.', verification: 'Awaiting', status: 'Open', severity: 'Medium' },
  { id: 'CAPA-0015', source: 'Supplier Review', rootCause: 'Inconsistent Data Encryption', actionPlan: 'Update Supplier Security Agreement.', verification: 'Verified', status: 'Completed', severity: 'High' },
  { id: 'CAPA-0016', source: 'Regulatory Alert', rootCause: 'New EU AI Act Requirements', actionPlan: 'Perform impact assessment.', verification: 'Awaiting', status: 'Open', severity: 'Medium' },
  { id: 'CAPA-0017', source: 'System Telemetry', rootCause: 'OOM in Batch Processor', actionPlan: 'Refactor chunking logic.', verification: 'Pending', status: 'In Progress', severity: 'High' },
];

export function CAPAManagerView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <ShieldAlert size={16} className="text-rose-500" />
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CAPA Manager (ISO 9001:2015)</h1>
           </div>
           <p className="text-sm text-slate-500">Corrective and Preventive Actions Lifecycle Management.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200">
           Log Quality Non-Conformance
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Open Actions</span>
            </div>
            <div className="divide-y divide-slate-100">
               {MOCK_CAPA.map((item) => (
                 <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors group relative">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex gap-4">
                          <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                             item.severity === 'Critical' ? "bg-rose-50 text-rose-500 font-black" : "bg-indigo-50 text-indigo-500 font-black"
                          )}>
                             <Zap size={24} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">{item.id} • {item.source}</p>
                             <h4 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-none mb-2">{item.rootCause}</h4>
                             <p className="text-sm text-slate-500 line-clamp-2 max-w-xl">{item.actionPlan}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className={cn(
                             "px-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border",
                             item.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {item.status}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Quality Metrics</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-medium text-slate-500">Root Cause Closure Rate</span>
                     <span className="text-lg font-black tracking-tighter text-emerald-500">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-medium text-slate-500">Recurrence Prevention</span>
                     <span className="text-lg font-black tracking-tighter text-emerald-500">100%</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
