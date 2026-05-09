import React from 'react';
import { 
  Database, 
  ShieldCheck, 
  Lock, 
  AlertCircle,
  Search,
  Filter,
  ArrowUpRight,
  User,
  Activity,
  HardDrive
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_ASSETS = [
  { id: 'AST-HP-01', name: 'Identity Production DB', owner: 'Data Ops Team', classification: 'Restricted', c: 'High', i: 'High', a: 'High' },
  { id: 'AST-SRV-45', name: 'Edge Compute Node #4', owner: 'Infrastructure', classification: 'Confidential', c: 'Med', i: 'High', a: 'High' },
  { id: 'AST-APP-09', name: 'Compliance OS Frontend', owner: 'UX Engineering', classification: 'Internal', c: 'Low', i: 'Med', a: 'Med' },
  { id: 'AST-DSK-12', name: 'CISO Corporate Laptop', owner: 'Vikram Singh', classification: 'Restricted', c: 'High', i: 'High', a: 'Med' },
  { id: 'AST-CLD-99', name: 'Public Documentation Bucket', owner: 'Marketing', classification: 'Public', c: 'Low', i: 'Low', a: 'Low' },
  { id: 'AST-DB-77', name: 'Customer PII Shard (APAC)', owner: 'Privacy Office', classification: 'Restricted', c: 'High', i: 'High', a: 'High' },
  { id: 'AST-VPN-02', name: 'Corporate VPN Gateway', owner: 'NetSec', classification: 'Confidential', c: 'High', i: 'Med', a: 'High' },
  { id: 'AST-EMAIL-01', name: 'Exchange Online Tenant', owner: 'IT Services', classification: 'Confidential', c: 'High', i: 'High', a: 'High' },
  { id: 'AST-AWS-S3', name: 'Legacy Backup Storage', owner: 'Cloud Ops', classification: 'Internal', c: 'Med', i: 'Med', a: 'Low' },
  { id: 'AST-OFF-01', name: 'Physical Server Rack (Delhi)', owner: 'Facilities', classification: 'Internal', c: 'Low', i: 'Low', a: 'High' },
];

export function AssetRegisterView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Information Asset Register</h1>
          <p className="text-sm text-slate-500">ISO 27001 compliant inventory tracking with CIA Triad criticality scoring.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-200">
             Audit Asset State
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Inventory Ledger</h3>
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                     <Search size={14} />
                     <input type="text" placeholder="ID or Name..." className="bg-transparent text-xs font-medium outline-none w-32" />
                  </div>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4">Asset Identification</th>
                        <th className="px-6 py-4">Data Classification</th>
                        <th className="px-6 py-4">CIA Triad Scoring</th>
                        <th className="px-6 py-4 text-right">Custodian</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {MOCK_ASSETS.map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors group">
                           <td className="px-6 py-4">
                              <div className="flex gap-3 items-center">
                                 <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                                    <HardDrive size={18} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-700 tracking-tight">{asset.name}</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400">{asset.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border",
                                 asset.classification === 'Restricted' ? "bg-rose-50 text-rose-700 border-rose-100" :
                                 asset.classification === 'Confidential' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                 "bg-slate-50 text-slate-600 border-slate-200"
                              )}>
                                 {asset.classification}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex gap-1">
                                 <CIABadge label="C" value={asset.c} />
                                 <CIABadge label="I" value={asset.i} />
                                 <CIABadge label="A" value={asset.a} />
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex flex-col items-end">
                                 <span className="text-xs font-bold text-slate-700">{asset.owner}</span>
                                 <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Site-01</span>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Asset Criticality</p>
                  <h4 className="text-2xl font-black mt-1">ISO 27001</h4>
                  <div className="mt-8 flex items-baseline gap-2">
                     <span className="text-4xl font-bold tracking-tighter">84%</span>
                     <span className="text-xs font-bold text-indigo-200">Assets Secured</span>
                  </div>
               </div>
               <ShieldCheck size={120} className="absolute -bottom-8 -right-8 opacity-10 rotate-12" />
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Threat Analysis</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                           <AlertCircle size={16} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Unauthorized Export</span>
                     </div>
                     <span className="text-[10px] font-black text-rose-600 uppercase">Severe</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500 w-[65%]" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function CIABadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center overflow-hidden border border-slate-100 rounded-md">
      <div className="bg-slate-100 px-1.5 py-0.5 text-[9px] font-black">{label}</div>
      <div className={cn(
        "px-1.5 py-0.5 text-[9px] font-black",
        value === 'High' ? "text-rose-600 bg-rose-50" :
        value === 'Med' ? "text-amber-600 bg-amber-50" : "text-slate-400 bg-white"
      )}>
        {value.toUpperCase()}
      </div>
    </div>
  );
}
