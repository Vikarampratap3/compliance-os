import React from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Clock, 
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle,
  MoreVertical,
  XCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_ADMINS = [
  { id: 'USR-088', name: 'John Doe', role: 'Global Master Admin', lastReview: '2026-02-15', status: 'Pending Review', site: 'San Francisco HQ' },
  { id: 'USR-092', name: 'Sarah Connor', role: 'Regional Security Lead', lastReview: '2026-04-20', status: 'Recertified', site: 'Singapore Hub' },
  { id: 'USR-101', name: 'James Wilson', role: 'DevOps Engineer', lastReview: '2025-12-01', status: 'Overdue', site: 'London Branch' },
  { id: 'USR-115', name: 'Priya Sharma', role: 'Compliance Officer', lastReview: '2026-03-10', status: 'Recertified', site: 'Delhi HQ' },
  { id: 'USR-122', name: 'Alex Rivera', role: 'Security Architect', lastReview: '2026-05-01', status: 'Pending Review', site: 'New York Office' },
  { id: 'USR-143', name: 'Meera Patel', role: 'Data Privacy Manager', lastReview: '2026-01-15', status: 'Recertified', site: 'Mumbai Office' },
  { id: 'USR-156', name: 'Hans Mueller', role: 'Infrastructure Manager', lastReview: '2026-04-10', status: 'Recertified', site: 'Berlin Office' },
  { id: 'USR-167', name: 'Elena Rodriguez', role: 'Database Administrator', lastReview: '2025-11-20', status: 'Overdue', site: 'Madrid Hub' },
  { id: 'USR-178', name: 'Takashi Saito', role: 'Application Owner', lastReview: '2026-04-25', status: 'Pending Review', site: 'Tokyo Office' },
  { id: 'USR-189', name: 'Amira Hassan', role: 'Quality Assurance Lead', lastReview: '2026-02-28', status: 'Recertified', site: 'Dubai Office' },
];

export function AccessRecertificationView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <ShieldAlert size={26} className="text-indigo-500" />
          Access Recertification
        </h1>
        <p className="text-sm text-slate-500 mt-1">ISO 27001 Annex A.9.2.4: Periodic review of user access rights by the CISO.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <div className="flex gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quarterly Review Cycle: Q2 2026</span>
           </div>
           <button className="text-xs font-black text-indigo-600 uppercase hover:underline">Download Audit Proof</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Administrative Identity</th>
                <th className="px-6 py-4">Provisioned Role</th>
                <th className="px-6 py-4 text-center">Audit Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ADMINS.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                         {admin.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-800">{admin.name}</p>
                         <p className="text-[10px] font-mono font-bold text-slate-400">{admin.id} • {admin.site}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-xs font-bold text-slate-600">{admin.role}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border shadow-sm",
                      admin.status === 'Recertified' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                      admin.status === 'Overdue' ? "bg-rose-50 text-rose-700 border-rose-100 animate-pulse" : 
                      "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {admin.status === 'Recertified' ? <CheckCircle size={10}/> : 
                       admin.status === 'Overdue' ? <ShieldAlert size={10}/> : <Clock size={10}/>}
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
                         Recertify
                       </button>
                       <button className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                         <XCircle size={16}/>
                       </button>
                    </div>
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
