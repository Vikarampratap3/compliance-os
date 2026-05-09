import React from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  Play, 
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_RFCS = [
  { id: 'RFC-1002', title: 'DB Schema Update: Sharding Key Expansion', requester: 'Data Ops', stage: 'CAB Approval', priority: 'High', date: '2026-05-15' },
  { id: 'RFC-1003', title: 'Security Patch: Kernel 5.2 Hotfix', requester: 'InfoSec', stage: 'Submitted', priority: 'Critical', date: '2026-05-04' },
  { id: 'RFC-1004', title: 'UI Overhaul: Profile Modules', requester: 'Design Dev', stage: 'Scheduled', priority: 'Low', date: '2026-05-20' },
  { id: 'RFC-0998', title: 'API Gateway Scaling (EMEA)', requester: 'Infrastructure', stage: 'Implemented', priority: 'Medium', date: '2026-04-28' },
  { id: 'RFC-1005', title: 'Auth Service: Passkey Implementation', requester: 'IAM Team', stage: 'CAB Approval', priority: 'High', date: '2026-06-01' },
  { id: 'RFC-1006', title: 'Migrate S3 Buckets to KMS Encryption', requester: 'Security', stage: 'Submitted', priority: 'Medium', date: '2026-05-08' },
  { id: 'RFC-1007', title: 'Edge Node Lifecycle Refresh (APAC)', requester: 'Platform Eng', stage: 'Scheduled', priority: 'High', date: '2026-05-30' },
  { id: 'RFC-1001', title: 'Global VPN Certificate Rotation', requester: 'NetSec', stage: 'Implemented', priority: 'Critical', date: '2026-04-25' },
];

export function ChangeManagementView() {
  const stages = ['Submitted', 'CAB Approval', 'Scheduled', 'Implemented'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Change Management (ISO 20000-1)</h1>
          <p className="text-sm text-slate-500">Formal Request for Change (RFC) tracking across IT service lifecycles.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200">
           <Plus size={16}/> New RFC
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map(stage => (
          <div key={stage} className="bg-slate-50/50 rounded-3xl border border-slate-200 p-4 space-y-4 min-h-[400px]">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stage}</h3>
              <span className="w-5 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                {MOCK_RFCS.filter(r => r.stage === stage).length}
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_RFCS.filter(r => r.stage === stage).map(rfc => (
                <div key={rfc.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-1.5 mb-2">
                     <div className={cn(
                       "w-1.5 h-1.5 rounded-full",
                       rfc.priority === 'Critical' ? "bg-rose-500" : rfc.priority === 'High' ? "bg-amber-500" : "bg-emerald-500"
                     )} />
                     <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-indigo-500 transition-colors uppercase">{rfc.id} • {rfc.priority}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-700 leading-snug mb-3 uppercase">{rfc.title}</h4>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rfc.requester}</span>
                     <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold overflow-hidden">
                        <Calendar size={10} />
                        {rfc.date.split('-').slice(1).join('/')}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
