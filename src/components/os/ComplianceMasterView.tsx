import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ShieldCheck,
  MapPin,
  Building2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_DATA = [
  { id: 1, accountId: 'ACC-001', region: 'North India', site: 'Delhi HQ', title: 'Annual Report Submission (Regional Compliance)', owner: 'Sarah Chen', status: 'Pending', dueDate: '2026-05-15' },
  { id: 2, accountId: 'ACC-001', region: 'South India', site: 'Chennai Plant', title: 'Public Disclosure Documentation', owner: 'James Wilson', status: 'Submitted', dueDate: '2026-05-20' },
  { id: 3, accountId: 'ACC-002', region: 'APAC', site: 'Singapore Office', title: 'Quarterly Financial Review', owner: 'Sarah Connor', status: 'Overdue', dueDate: '2026-04-30' },
  { id: 4, accountId: 'ACC-001', region: 'EMEA', site: 'London Branch', title: 'Safety Audit Report', owner: 'John Smith', status: 'Approved', dueDate: '2026-06-01' },
  { id: 5, accountId: 'ACC-001', region: 'Western US', site: 'Silicon Valley', title: 'CCPA Data Privacy Audit', owner: 'Elena Rodriguez', status: 'Pending', dueDate: '2026-05-12' },
  { id: 6, accountId: 'ACC-003', region: 'DACH', site: 'Berlin Data Center', title: 'GDPR Article 30 Records of Processing', owner: 'Hans Mueller', status: 'Approved', dueDate: '2026-05-08' },
  { id: 7, accountId: 'ACC-001', region: 'Japan', site: 'Tokyo R&D', title: 'J-SOX Internal Control Assessment', owner: 'Takashi Saito', status: 'Pending', dueDate: '2026-05-25' },
  { id: 8, accountId: 'ACC-002', region: 'ME', site: 'Dubai Hub', title: 'VAT Compliance Filing Q2', owner: 'Amira Hassan', status: 'Submitted', dueDate: '2026-05-18' },
  { id: 9, accountId: 'ACC-001', region: 'Brazil', site: 'Sao Paulo Warehouse', title: 'LGPD Consent Architecture Review', owner: 'Ricardo Silva', status: 'In Progress', dueDate: '2026-05-14' },
  { id: 10, accountId: 'ACC-004', region: 'Australia', site: 'Sydney Branch', title: 'Modern Slavery Statement Submission', owner: 'Chloe Thompson', status: 'Pending', dueDate: '2026-05-30' },
];

export function ComplianceMasterView() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Compliance Master</h1>
          <p className="text-sm text-slate-500">Universal record system for global regulatory sharding.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16}/> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Plus size={16}/> New Subtitle
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filters & Search */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search records by ID, title, or owner..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Approved', 'Submitted', 'Pending', 'Overdue'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ring-1 ring-inset",
                  filter === status 
                    ? "bg-slate-800 text-white ring-slate-800" 
                    : "bg-white text-slate-500 ring-slate-200 hover:ring-slate-300"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Control & Identifier</th>
                <th className="px-6 py-4">Site / Locality</th>
                <th className="px-6 py-4">Assigned Entity</th>
                <th className="px-6 py-4">Global Status</th>
                <th className="px-6 py-4">Target Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DATA.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-700 tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{record.title}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">#OS-CRU-{record.id.toString().padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium tracking-tight">
                        <MapPin size={12} className="text-rose-400" /> {record.region}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <Building2 size={12} className="text-slate-300" /> {record.site}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-[10px]">
                         {record.owner.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="text-xs font-bold text-slate-600 tracking-tight">{record.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm border",
                      record.status === 'Approved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      record.status === 'Submitted' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                      record.status === 'Overdue' ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {record.status === 'Approved' ? <CheckCircle2 size={12}/> : 
                       record.status === 'Overdue' ? <AlertCircle size={12}/> : <Clock size={12}/>}
                      {record.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-slate-500 tracking-tighter">{record.dueDate}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
