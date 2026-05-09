import React from 'react';
import { 
  FileText, 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  Plus, 
  Search,
  CheckCircle,
  MoreVertical,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_DOCS = [
  { id: 'DOC-9001-01', title: 'Quality Management Manual v2.4', owner: 'Vikram Singh', nextReview: '2026-06-15', status: 'Approved', classification: 'Confidential' },
  { id: 'DOC-27001-05', title: 'Access Control Policy v4.1', owner: 'Sarah Connor', nextReview: '2027-01-10', status: 'Awaiting Peer Approval', classification: 'Internal' },
  { id: 'DOC-20000-02', title: 'Change Management SOP', owner: 'John Smith', nextReview: '2026-05-30', status: 'Approved', classification: 'Internal' },
  { id: 'DOC-QMS-88', title: 'Site Inspection Checklist', owner: 'Priya Sharma', nextReview: '2026-05-12', status: 'Awaiting Peer Approval', classification: 'Public' },
  { id: 'DOC-SEC-99', title: 'Incident Response Playbook', owner: 'Alex Rivera', nextReview: '2026-08-20', status: 'Approved', classification: 'Confidential' },
  { id: 'DOC-PRO-12', title: 'Product Lifecycle Policy', owner: 'Meera Patel', nextReview: '2026-11-05', status: 'Draft', classification: 'Internal' },
  { id: 'DOC-LEG-01', title: 'NDA Template (Global)', owner: 'Legal Team', nextReview: '2027-02-14', status: 'Approved', classification: 'Public' },
  { id: 'DOC-HR-45', title: 'Employee Code of Conduct', owner: 'HR Director', nextReview: '2026-12-31', status: 'Approved', classification: 'Internal' },
];

export function DocumentControlView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Document Control (ISO 9001)</h1>
          <p className="text-sm text-slate-500">Centralized lifecycle management for quality and information security artifacts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16}/> Export Ledger
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Plus size={16}/> Create Document
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
           <div className="relative flex-1 max-w-md">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
              type="text" 
              placeholder="Filter by owner or title..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
             />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Document Identifier</th>
                <th className="px-6 py-4">Document Owner</th>
                <th className="px-6 py-4">Next Review Date</th>
                <th className="px-6 py-4">Approval Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DOCS.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 tracking-tight">{doc.title}</p>
                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">{doc.id} • {doc.classification}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-black">
                         {doc.owner.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="text-xs font-bold text-slate-600">{doc.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar size={14} className="text-slate-400" />
                      {doc.nextReview}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      doc.status === 'Approved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {doc.status === 'Approved' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
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
