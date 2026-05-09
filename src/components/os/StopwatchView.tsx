import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Save,
  Plus,
  Clock,
  Activity,
  CheckCircle2,
  Filter,
  Download,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_TIME_ENTRIES = [
  { id: 'TE-001', date: '2026-05-09', task: 'Compliance Master Setup', project: 'Core Platform', time: '02:45', status: 'Completed', category: 'Development' },
  { id: 'TE-002', date: '2026-05-09', task: 'Document Review - Q2 Audit', project: 'Audit & Risk', time: '01:30', status: 'Completed', category: 'Review' },
  { id: 'TE-003', date: '2026-05-08', task: 'Risk Assessment Workshop', project: 'Audit & Risk', time: '03:15', status: 'Completed', category: 'Meeting' },
  { id: 'TE-004', date: '2026-05-08', task: 'Database Optimization', project: 'Infrastructure', time: '04:20', status: 'Completed', category: 'Development' },
  { id: 'TE-005', date: '2026-05-07', task: 'Client Compliance Training', project: 'Training', time: '02:00', status: 'Completed', category: 'Training' },
  { id: 'TE-006', date: '2026-05-07', task: 'Policy Update Documentation', project: 'Documentation', time: '01:45', status: 'Completed', category: 'Documentation' },
  { id: 'TE-007', date: '2026-05-06', task: 'Security Audit Preparation', project: 'Audit & Risk', time: '02:30', status: 'Completed', category: 'Preparation' },
  { id: 'TE-008', date: '2026-05-06', task: 'Team Standup & Planning', project: 'Management', time: '00:45', status: 'Completed', category: 'Meeting' },
  { id: 'TE-009', date: '2026-05-05', task: 'System Configuration Review', project: 'Infrastructure', time: '03:10', status: 'Completed', category: 'Review' },
  { id: 'TE-010', date: '2026-05-05', task: 'Incident Response Training', project: 'Training', time: '02:15', status: 'Completed', category: 'Training' },
];

export function StopwatchView() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [taskCategory, setTaskCategory] = useState('Development');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (taskName && projectName && seconds > 0) {
      alert(`Time entry saved:\n${taskName}\n${formatTime(seconds)}`);
      setSeconds(0);
      setTaskName('');
      setProjectName('');
    }
  };

  const totalHours = MOCK_TIME_ENTRIES.reduce((sum, entry) => {
    const [h, m] = entry.time.split(':').map(Number);
    return sum + h + (m / 60);
  }, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Stopwatch Time Tracking</h1>
          <p className="text-sm text-slate-500">Log your work hours for compliance and billing purposes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stopwatch Section */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-4">Active Timer</p>
            <div className="text-6xl font-black tracking-tighter mb-8 font-mono">
              {formatTime(seconds)}
            </div>
            <div className="flex gap-2 mb-6 justify-center">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                  isRunning
                    ? 'bg-white/20 hover:bg-white/30 border border-white/30'
                    : 'bg-white hover:bg-slate-50 text-indigo-700'
                )}
              >
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => { setSeconds(0); setIsRunning(false); }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/30 transition-all"
              >
                <RotateCcw size={18} /> Reset
              </button>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-sm font-bold">
              {isRunning ? 'Timer Running...' : seconds > 0 ? 'Timer Paused' : 'Ready to Start'}
            </div>
          </motion.div>

          {/* Task Input */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Log Time Entry</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g., Compliance Review"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Project</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Audit & Risk"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Category</label>
                <select
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                >
                  <option>Development</option>
                  <option>Review</option>
                  <option>Meeting</option>
                  <option>Training</option>
                  <option>Documentation</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                disabled={!taskName || !projectName || seconds === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
              >
                <Save size={16} /> Save Entry
              </button>
            </div>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 rounded-3xl border border-indigo-100 p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-2">This Week</p>
            <p className="text-3xl font-bold text-indigo-700">{totalHours.toFixed(1)} hrs</p>
            <p className="text-xs text-indigo-600 mt-1">Total tracked time</p>
          </motion.div>
        </div>

        {/* Recent Entries */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Time Entries</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', 'Today', 'This Week', 'This Month'].map(f => (
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
                  <th className="px-6 py-4">Task Name</th>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Time Logged</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_TIME_ENTRIES.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-slate-500">{entry.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-700">{entry.task}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{entry.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-700 font-mono">{entry.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100">
                        <CheckCircle2 size={12} /> {entry.status}
                      </span>
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
    </div>
  );
}
