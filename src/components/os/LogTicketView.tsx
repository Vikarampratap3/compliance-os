import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Tag,
  FileText,
  Paperclip
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const RECENT_TICKETS = [
  { id: 'TKT-5234', title: 'Access Request - New Compliance Officer', priority: 'High', status: 'Open', created: '2026-05-09', requester: 'HR Department', category: 'Access Control' },
  { id: 'TKT-5233', title: 'System Downtime Incident - Database Cluster', priority: 'Critical', status: 'In Progress', created: '2026-05-09', requester: 'Infrastructure Team', category: 'Incident' },
  { id: 'TKT-5232', title: 'Q2 Compliance Report Generation Issue', priority: 'Medium', status: 'Open', created: '2026-05-08', requester: 'Finance Department', category: 'Reporting' },
  { id: 'TKT-5231', title: 'Password Reset Request', priority: 'Low', status: 'Resolved', created: '2026-05-08', requester: 'John Doe', category: 'Help Desk' },
  { id: 'TKT-5230', title: 'Audit Trail Export Request', priority: 'Medium', status: 'In Progress', created: '2026-05-07', requester: 'Audit Team', category: 'Data Export' },
];

export function LogTicketView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [attachmentCount, setAttachmentCount] = useState(0);

  const handleSubmit = () => {
    if (title && description) {
      alert(`Ticket submitted successfully!\nTitle: ${title}\nPriority: ${priority}`);
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setCategory('General');
      setAttachmentCount(0);
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
           priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           priority === 'Medium' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
           'bg-slate-50 text-slate-600 border-slate-200';
  };

  const getStatusColor = (status: string) => {
    return status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
           'bg-amber-50 text-amber-700 border-amber-100';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Resolved' ? <CheckCircle2 size={12} /> :
           status === 'In Progress' ? <Clock size={12} /> :
           <AlertCircle size={12} />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Log a Ticket</h1>
        <p className="text-sm text-slate-500">Submit an issue or request for the support team to address.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-6">Create New Ticket</h2>

            <div className="space-y-6">
              {/* Ticket Title */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Ticket Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of the issue..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Category and Priority Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option>General</option>
                    <option>Incident</option>
                    <option>Access Control</option>
                    <option>Reporting</option>
                    <option>Help Desk</option>
                    <option>Data Export</option>
                    <option>Configuration</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Priority *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about the issue, steps to reproduce, expected behavior, etc."
                  rows={8}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 block">Attachments</label>
                <button
                  onClick={() => setAttachmentCount(attachmentCount + 1)}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  <Paperclip size={16} /> Add Attachment
                </button>
                {attachmentCount > 0 && (
                  <p className="text-xs text-slate-500 mt-2">{attachmentCount} file(s) selected</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!title || !description}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
                >
                  <Send size={16} /> Submit Ticket
                </button>
                <button className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                  Clear Form
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Ticket Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 rounded-3xl border border-indigo-100 p-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Ticket Guidelines</h3>
            <ul className="space-y-2 text-xs text-indigo-700 leading-relaxed">
              <li>✓ Provide clear, concise titles</li>
              <li>✓ Include relevant error messages</li>
              <li>✓ Specify steps to reproduce</li>
              <li>✓ Attach screenshots/logs if needed</li>
              <li>✓ Set appropriate priority level</li>
            </ul>
          </motion.div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Tickets</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {RECENT_TICKETS.map((ticket) => (
                <div key={ticket.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[10px] font-mono font-bold text-slate-400 mb-1">{ticket.id}</p>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{ticket.title}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-lg text-[10px] font-bold border",
                      getPriorityColor(ticket.priority)
                    )}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border",
                      getStatusColor(ticket.status)
                    )}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status}
                    </span>
                    <span className="text-[10px] text-slate-400">{ticket.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
