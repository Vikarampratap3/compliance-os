import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_ACTIVE_TICKETS = [
  { id: 'TKT-5233', title: 'System Downtime Incident - Database Cluster', priority: 'Critical', status: 'In Progress', created: '2026-05-09 08:15', assignee: 'Infrastructure Team', slaTarget: '4 hours', responseTime: '0:45', category: 'Incident' },
  { id: 'TKT-5234', title: 'Access Request - New Compliance Officer', priority: 'High', status: 'Open', created: '2026-05-09 09:30', assignee: 'Unassigned', slaTarget: '8 hours', responseTime: '0:15', category: 'Access Control' },
  { id: 'TKT-5232', title: 'Q2 Compliance Report Generation Issue', priority: 'Medium', status: 'Open', created: '2026-05-08 14:20', assignee: 'David Chen', slaTarget: '24 hours', responseTime: '15:30', category: 'Reporting' },
  { id: 'TKT-5230', title: 'Audit Trail Export Request', priority: 'Medium', status: 'In Progress', created: '2026-05-07 11:00', assignee: 'Sarah Connor', slaTarget: '24 hours', responseTime: '2:15', category: 'Data Export' },
  { id: 'TKT-5229', title: 'Policy Update Notification Distribution', priority: 'High', status: 'Open', created: '2026-05-07 16:45', assignee: 'Unassigned', slaTarget: '12 hours', responseTime: '7:20', category: 'Communication' },
  { id: 'TKT-5228', title: 'CAPA Investigation - Incomplete Documentation', priority: 'Medium', status: 'In Progress', created: '2026-05-06 10:30', assignee: 'James Wilson', slaTarget: '48 hours', responseTime: '23:45', category: 'Quality' },
  { id: 'TKT-5227', title: 'External Audit Scheduling Request', priority: 'Medium', status: 'Open', created: '2026-05-06 13:15', assignee: 'Priya Sharma', slaTarget: '48 hours', responseTime: '20:10', category: 'Audit' },
  { id: 'TKT-5226', title: 'Risk Assessment Follow-up Action Items', priority: 'High', status: 'In Progress', created: '2026-05-05 09:00', assignee: 'Elena Rodriguez', slaTarget: '72 hours', responseTime: '30:15', category: 'Risk' },
  { id: 'TKT-5225', title: 'System Configuration Change Approval', priority: 'Low', status: 'Open', created: '2026-05-05 11:30', assignee: 'Hans Mueller', slaTarget: '72 hours', responseTime: '25:45', category: 'Configuration' },
];

export function ActiveQueueView() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const criticalCount = MOCK_ACTIVE_TICKETS.filter(t => t.priority === 'Critical').length;
  const inProgressCount = MOCK_ACTIVE_TICKETS.filter(t => t.status === 'In Progress').length;
  const openCount = MOCK_ACTIVE_TICKETS.filter(t => t.status === 'Open').length;
  const unassignedCount = MOCK_ACTIVE_TICKETS.filter(t => t.assignee === 'Unassigned').length;

  const getPriorityColor = (priority: string) => {
    return priority === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
           priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           priority === 'Medium' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
           'bg-slate-50 text-slate-600 border-slate-200';
  };

  const getStatusIcon = (status: string, priority: string) => {
    if (priority === 'Critical') return <AlertCircle size={16} className="text-rose-600" />;
    if (status === 'In Progress') return <Clock size={16} className="text-indigo-600" />;
    return <AlertCircle size={16} className="text-amber-600" />;
  };

  const getSLAStatus = (responseTime: string, slaTarget: string) => {
    const [responseHours, responseMins] = responseTime.split(':').map(Number);
    const [slaHours] = slaTarget.split(' ');
    const totalResponseHours = responseHours + (responseMins / 60);
    const slaHour = parseInt(slaHours);

    if (totalResponseHours > slaHour) {
      return { status: 'Breached', color: 'text-rose-600' };
    } else if (totalResponseHours > (slaHour * 0.8)) {
      return { status: 'At Risk', color: 'text-amber-600' };
    }
    return { status: 'On Track', color: 'text-emerald-600' };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Active Ticket Queue</h1>
        <p className="text-sm text-slate-500">Monitor and manage open support tickets with SLA tracking.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Critical Issues"
          value={criticalCount}
          icon={<AlertCircle size={20} />}
          color="rose"
        />
        <KPICard
          label="In Progress"
          value={inProgressCount}
          icon={<Clock size={20} />}
          color="indigo"
        />
        <KPICard
          label="Open Tickets"
          value={openCount}
          icon={<MessageSquare size={20} />}
          color="amber"
        />
        <KPICard
          label="Unassigned"
          value={unassignedCount}
          icon={<Users size={20} />}
          color="slate"
        />
      </div>

      {/* Ticket Queue Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets by ID or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Critical', 'High', 'Open', 'In Progress'].map(f => (
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
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4">Response Time</th>
                <th className="px-6 py-4">SLA Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ACTIVE_TICKETS.map((ticket) => {
                const slaStatus = getSLAStatus(ticket.responseTime, ticket.slaTarget);
                return (
                  <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-indigo-600">{ticket.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(ticket.status, ticket.priority)}
                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{ticket.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                        getPriorityColor(ticket.priority)
                      )}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                        ticket.status === 'In Progress'
                          ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      )}>
                        {ticket.status === 'In Progress' ? <Clock size={10} /> : <AlertCircle size={10} />}
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{ticket.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-xs font-bold",
                        ticket.assignee === 'Unassigned'
                          ? "text-rose-600 bg-rose-50 px-2 py-1 rounded-lg"
                          : "text-slate-600"
                      )}>
                        {ticket.assignee}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-slate-600">{ticket.responseTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("text-xs font-bold", slaStatus.color)}>
                        {slaStatus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon, color }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'rose' | 'indigo' | 'amber' | 'slate';
}) {
  const colors = {
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', text: 'text-rose-700' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', text: 'text-indigo-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', text: 'text-amber-700' },
    slate: { bg: 'bg-slate-50', icon: 'text-slate-600', text: 'text-slate-700' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(colors[color].bg, "p-4 rounded-2xl border border-slate-100")}
    >
      <div className={cn(colors[color].icon, "mb-2 p-2 bg-white rounded-lg w-fit")}>
        {icon}
      </div>
      <p className={cn("text-2xl font-bold mb-1", colors[color].text)}>{value}</p>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
