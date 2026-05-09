import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Plus,
  Download,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  Filter,
  User
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_DETAILED_ENTRIES = [
  { id: 'TE-001', date: '2026-05-09', user: 'Sarah Chen', task: 'Compliance Master Setup', project: 'Core Platform', time: '02:45', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Database schema migration completed' },
  { id: 'TE-002', date: '2026-05-09', user: 'James Wilson', task: 'Document Review - Q2 Audit', project: 'Audit & Risk', time: '01:30', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Quarterly compliance documents reviewed' },
  { id: 'TE-003', date: '2026-05-08', user: 'Sarah Chen', task: 'Risk Assessment Workshop', project: 'Audit & Risk', time: '03:15', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Enterprise-wide risk evaluation session' },
  { id: 'TE-004', date: '2026-05-08', user: 'Priya Sharma', task: 'Database Optimization', project: 'Infrastructure', time: '04:20', billable: true, status: 'Pending', approval: 'Awaiting Manager Review', notes: 'Query performance tuning and indexing' },
  { id: 'TE-005', date: '2026-05-07', user: 'Alex Rivera', task: 'Client Compliance Training', project: 'Training', time: '02:00', billable: false, status: 'Approved', approval: 'Manager Verified', notes: 'External client training delivery' },
  { id: 'TE-006', date: '2026-05-07', user: 'John Doe', task: 'Policy Update Documentation', project: 'Documentation', time: '01:45', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Updated corporate compliance policies' },
  { id: 'TE-007', date: '2026-05-06', user: 'Sarah Chen', task: 'Security Audit Preparation', project: 'Audit & Risk', time: '02:30', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'ISO 27001 audit readiness review' },
  { id: 'TE-008', date: '2026-05-06', user: 'Elena Rodriguez', task: 'Team Standup & Planning', project: 'Management', time: '00:45', billable: false, status: 'Approved', approval: 'Manager Verified', notes: 'Weekly team synchronization' },
  { id: 'TE-009', date: '2026-05-05', user: 'Takashi Saito', task: 'System Configuration Review', project: 'Infrastructure', time: '03:10', billable: true, status: 'Rejected', approval: 'Requires Revision', notes: 'Time entry needs detail clarification' },
  { id: 'TE-010', date: '2026-05-05', user: 'Meera Patel', task: 'Incident Response Training', project: 'Training', time: '02:15', billable: false, status: 'Pending', approval: 'Awaiting Manager Review', notes: 'Crisis management and response training' },
  { id: 'TE-011', date: '2026-05-04', user: 'Hans Mueller', task: 'Infrastructure Scaling', project: 'Infrastructure', time: '03:45', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Cloud deployment and load balancing' },
  { id: 'TE-012', date: '2026-05-04', user: 'Amira Hassan', task: 'Compliance Report Generation', project: 'Reporting', time: '02:20', billable: true, status: 'Approved', approval: 'Manager Verified', notes: 'Q2 regulatory compliance report' },
];

export function TimeEntriesView() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const totalHours = MOCK_DETAILED_ENTRIES.reduce((sum, entry) => {
    const [h, m] = entry.time.split(':').map(Number);
    return sum + h + (m / 60);
  }, 0);

  const billableHours = MOCK_DETAILED_ENTRIES.filter(e => e.billable).reduce((sum, entry) => {
    const [h, m] = entry.time.split(':').map(Number);
    return sum + h + (m / 60);
  }, 0);

  const approvedEntries = MOCK_DETAILED_ENTRIES.filter(e => e.status === 'Approved').length;
  const pendingEntries = MOCK_DETAILED_ENTRIES.filter(e => e.status === 'Pending').length;

  const getStatusBadge = (status: string) => {
    return status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           'bg-rose-50 text-rose-700 border-rose-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 size={12} />;
      case 'Rejected': return <AlertCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Time Entries Management</h1>
          <p className="text-sm text-slate-500">Track, review, and approve team time entries for compliance and billing.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Hours"
          value={totalHours.toFixed(1)}
          unit="hrs"
          icon={<Clock size={20} />}
          color="indigo"
          trend="This period"
        />
        <StatCard
          label="Billable Hours"
          value={billableHours.toFixed(1)}
          unit="hrs"
          icon={<BarChart3 size={20} />}
          color="emerald"
          trend={`${Math.round((billableHours/totalHours)*100)}%`}
        />
        <StatCard
          label="Approved"
          value={approvedEntries}
          unit="entries"
          icon={<CheckCircle2 size={20} />}
          color="emerald"
          trend="Verified"
        />
        <StatCard
          label="Pending"
          value={pendingEntries}
          unit="entries"
          icon={<Clock size={20} />}
          color="amber"
          trend="Awaiting review"
        />
      </div>

      {/* Entries Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by task, user, or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Approved', 'Pending', 'Rejected', 'Billable'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ring-1 ring-inset",
                  filter === f
                    ? "bg-slate-800 text-white ring-slate-800"
                    : "bg-white text-slate-500 ring-slate-200 hover:ring-slate-300"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Billable</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Approval</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DETAILED_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-500">{entry.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
                        {entry.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{entry.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">{entry.task}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600">{entry.project}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700 font-mono">{entry.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                      entry.billable
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    )}>
                      {entry.billable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                      getStatusBadge(entry.status)
                    )}>
                      {getStatusIcon(entry.status)}
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600">{entry.approval}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
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

function StatCard({ label, value, unit, icon, color, trend }: {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'amber';
  trend: string;
}) {
  const colors = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(colors[color].bg, "p-4 rounded-2xl border border-slate-100")}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(colors[color].icon, "p-2 bg-white rounded-lg")}>
          {icon}
        </div>
        <span className={cn(colors[color].badge, "text-[10px] font-bold px-2 py-1 rounded-lg")}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-800 mb-1">{value} <span className="text-xs text-slate-500">{unit}</span></p>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
