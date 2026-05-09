import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  FileText 
} from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '../../lib/utils';

const MOCK_COMPLIANCE_DATA = [
  { id: 1, accountId: 'ACC-001', region: 'North India', site: 'Delhi HQ', title: 'Annual Report Submission (Regional Compliance)', desc: 'Company must submit the annual report to statutory bodies.', bu: 'APAC', subUnit: 'Finance & Acc', dept: 'Head Office', owner: 'Sarah Chen', status: 'Pending', dueDate: '2026-05-15' },
  { id: 2, accountId: 'ACC-001', region: 'South India', site: 'Chennai Plant', title: 'Public Disclosure Documentation', desc: 'Company must prepare presentation material for stakeholders.', bu: 'Global', subUnit: 'Finance & Acc', dept: 'Head Office', owner: 'James Wilson', status: 'Submitted', dueDate: '2026-05-20' },
  { id: 3, accountId: 'ACC-002', region: 'APAC', site: 'Singapore Office', title: 'Quarterly Financial Review', desc: 'Q3 Financial documentation required for audit.', bu: 'Global', subUnit: 'Finance', dept: 'Global Finance', owner: 'Sarah Connor', status: 'Overdue', dueDate: '2026-04-30' },
  { id: 4, accountId: 'ACC-001', region: 'EMEA', site: 'London Branch', title: 'Safety Audit Report', desc: 'Annual safety inspection report for main plant.', bu: 'Manufacturing', subUnit: 'Plant A', dept: 'Operations', owner: 'John Smith', status: 'Approved', dueDate: '2026-06-01' },
  { id: 5, accountId: 'ACC-001', region: 'APAC', site: 'Tokyo R&D', title: 'J-SOX Self-Assessment', desc: 'Internal control over financial reporting.', bu: 'Global', subUnit: 'Finance', dept: 'Global Finance', owner: 'Kenji Tanaka', status: 'In Progress', dueDate: '2026-05-12' },
  { id: 6, accountId: 'ACC-003', region: 'EMEA', site: 'Berlin Data Center', title: 'ISO 27001 Surveillance Audit', desc: 'External audit for ISMS certification.', bu: 'Global', subUnit: 'Security', dept: 'Information Security', owner: 'Hans Mueller', status: 'Pending', dueDate: '2026-05-25' },
];

export function DashboardTasksView({ navigateTo }: { navigateTo: (appId: string, submenu: string) => void }) {
  const pendingTasks = MOCK_COMPLIANCE_DATA.filter(t => t.status === 'Pending' || t.status === 'In Progress').length;
  const overdueTasks = MOCK_COMPLIANCE_DATA.filter(t => t.status === 'Overdue').length;
  const completedTasks = MOCK_COMPLIANCE_DATA.filter(t => t.status === 'Approved' || t.status === 'Submitted').length;
  const totalTasks = MOCK_COMPLIANCE_DATA.length;

  const chartData = [
    { name: 'Completed', value: completedTasks, color: '#10b981' },
    { name: 'Pending', value: pendingTasks, color: '#f59e0b' },
    { name: 'Overdue', value: overdueTasks, color: '#ef4444' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <LayoutDashboard size={16} /> <span>Operations Dashboard</span>
        </div>
        <button 
          onClick={() => navigateTo('events', 'Corporate Calendar')}
          className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors ring-1 ring-emerald-200"
        >
          View Calendar Schedules
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">My tasks overview</h2>
        <p className="text-slate-500 text-sm mb-8">Personal work queue across sharded regional clusters.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col items-center justify-center relative min-h-[300px]">
             <div className="absolute inset-0 flex items-center justify-center p-8">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip cursor={{ fill: 'transparent' }} />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-bold text-slate-800">{totalTasks}</span>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Controls</span>
               </div>
             </div>
          </div>

          {/* Stats Breakdown */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
             <StatBox label="Active Submissions" count={pendingTasks} color="amber" icon={Clock} />
             <StatBox label="Breached Deadlines" count={overdueTasks} color="rose" icon={AlertCircle} />
             <StatBox label="Validated Records" count={completedTasks} color="emerald" icon={CheckCircle} />
             
             <div className="sm:col-span-3 mt-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-slate-400" /> Recent Priority Queue
                </h4>
                <div className="space-y-3">
                  {MOCK_COMPLIANCE_DATA.map(task => (
                    <motion.div 
                      key={task.id} 
                      whileHover={{ x: 4 }}
                      className="group p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                          task.status === 'Overdue' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 group-hover:text-emerald-500 transition-colors'
                        )}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors tracking-tight">{task.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-tighter">
                            <span>{task.site}</span>
                            <span>•</span>
                            <span className={task.status === 'Overdue' ? 'text-rose-500' : ''}>DUE: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className={cn(
                           "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                           task.status === 'Submitted' ? 'bg-indigo-50 text-indigo-600' : 
                           task.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                           task.status === 'Overdue' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                         )}>
                           {task.status}
                         </span>
                         <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, count, color, icon: Icon }: any) {
  const colors = {
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
    rose: "bg-rose-50 border-rose-100 text-rose-600"
  };

  return (
    <div className={cn("p-6 rounded-3xl border shadow-sm flex flex-col", colors[color as keyof typeof colors])}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
          <Icon size={18} />
        </div>
        <span className="text-2xl font-bold font-mono tracking-tighter">{count.toString().padStart(2, '0')}</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}
