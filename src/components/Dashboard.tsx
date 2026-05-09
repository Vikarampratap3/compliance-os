import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Plus, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion,
  FileText,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  Clock,
  Bot
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const complianceData = [
  { name: 'Jan', score: 82 },
  { name: 'Feb', score: 85 },
  { name: 'Mar', score: 84 },
  { name: 'Apr', score: 88 },
  { name: 'May', score: 92 },
  { name: 'Jun', score: 91 },
  { name: 'Jul', score: 94 },
];

const auditStatusData = [
  { name: 'Completed', value: 65, color: '#6366f1' },
  { name: 'In Progress', value: 20, color: '#f59e0b' },
  { name: 'Flagged', value: 15, color: '#ef4444' },
];

const audits = [
  { id: 'AUD-0128', title: 'Q2 Infrastructure Security', status: 'Completed', date: '2 days ago', priority: 'High' },
  { id: 'AUD-0129', title: 'Third-party Risk Assessment', status: 'In Progress', date: 'Ongoing', priority: 'Medium' },
  { id: 'AUD-0130', title: 'Financial Internal Audit', status: 'Flagged', date: '5 days ago', priority: 'Critical' },
  { id: 'AUD-0131', title: 'Data Privacy Compliance', status: 'Upcoming', date: 'Jun 15', priority: 'Medium' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Governance Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time compliance monitoring across all regulatory frameworks.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            Frameworks
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            <Plus size={16} />
            New Audit
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard 
          title="Compliance Score" 
          value="94.2%" 
          trend="+2.4%" 
          up={true} 
          icon={ShieldCheck} 
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50"
        />
        <StatCard 
          title="Open Findings" 
          value="12" 
          trend="-3" 
          up={true} 
          icon={AlertCircle} 
          iconColor="text-orange-600"
          bgColor="bg-orange-50"
        />
        <StatCard 
          title="Active Audits" 
          value="04" 
          trend="In Progress" 
          up={null} 
          icon={FileText} 
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Risk Level" 
          value="Low" 
          trend="+0.1" 
          up={false} 
          icon={ShieldAlert} 
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
      </motion.div>

      {/* Main Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compliance Trend Chart */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Compliance Health Trend</h3>
              <p className="text-sm text-slate-500">Aggregate score across SOC2, HIPAA, and GDPR</p>
            </div>
            <select className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none">
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  domain={[70, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insight Section */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={18} className="text-indigo-400" />
              </div>
              <h3 className="font-bold text-white">Compliance AI</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Predicted Vulnerability</p>
                <p className="text-sm leading-relaxed">
                  Based on recent commits, <span className="text-indigo-400 font-semibold">User Access Control</span> policies may need updating for GDPR standard 2024.1.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Automated Suggestion</p>
                <p className="text-sm leading-relaxed">
                  Enable <span className="text-emerald-400 font-semibold">Just-In-Time Access</span> for temporary developers to reduce privilege footprint by 42%.
                </p>
              </div>

              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all mt-4">
                Generate Full Risk Analysis
              </button>
            </div>
          </div>
          
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Risk Matrix & Framework Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Risk Grid */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Risk Assessment Matrix</h3>
              <p className="text-xs text-slate-500 mt-0.5">Probability vs. Impact mapping for active threats.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Critical
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Moderate
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 h-64">
            {Array.from({ length: 25 }).map((_, i) => {
              const row = Math.floor(i / 5);
              const col = i % 5;
              const intensity = (4 - row) * (col + 1);
              return (
                <div 
                  key={i} 
                  className={cn(
                    "rounded-md border border-slate-100 flex items-center justify-center relative group cursor-help transition-all duration-300",
                    intensity > 16 ? "bg-red-500/10 hover:bg-red-500/20" :
                    intensity > 8 ? "bg-amber-500/10 hover:bg-amber-500/20" :
                    "bg-slate-50/50 hover:bg-slate-100"
                  )}
                >
                  {i === 3 && (
                    <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm animate-bounce" title="R-102: Data Breaches" />
                  )}
                   {i === 11 && (
                    <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm" title="R-045: API Downtime" />
                  )}
                   {i === 20 && (
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="R-089: Documentation Lag" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Probability</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Probability</span>
          </div>
        </motion.div>

        {/* Framework Status */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden"
        >
          <h3 className="font-bold text-slate-900 mb-6">Framework Status</h3>
          <div className="space-y-6">
            <FrameworkItem label="SOC2 Type II" progress={92} color="bg-indigo-600" />
            <FrameworkItem label="GDPR Article 32" progress={100} color="bg-emerald-500" />
            <FrameworkItem label="HIPAA Privacy" progress={78} color="bg-amber-500" />
            <FrameworkItem label="ISO 27001" progress={45} color="bg-slate-400" />
          </div>
          <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 mt-8 hover:border-indigo-300 hover:text-indigo-400 transition-all">
            + Add Framework
          </button>
        </motion.div>
      </div>

      {/* Audit Management & Audit Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Audits List */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Recent Audit Operations</h3>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          
          <div className="space-y-1">
            {audits.map((audit) => (
              <div key={audit.id} className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    audit.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : 
                    audit.status === 'In Progress' ? "bg-amber-50 text-amber-600" :
                    audit.status === 'Flagged' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"
                  )}>
                    {audit.status === 'Completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{audit.title}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs font-mono text-slate-400">{audit.id}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">{audit.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    audit.priority === 'Critical' ? "bg-red-100 text-red-700" :
                    audit.priority === 'High' ? "bg-orange-100 text-orange-700" :
                    "bg-slate-100 text-slate-600"
                  )}>
                    {audit.priority}
                  </span>
                  <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Audit Status Breakdown */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col"
        >
          <h3 className="font-bold text-slate-900 mb-6">Status Breakdown</h3>
          <div className="flex-1 min-h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={auditStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {auditStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">100%</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Visibility</span>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            {auditStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Regulatory Update Banner */}
      <motion.div 
        variants={item}
        initial="hidden"
        animate="show"
        className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900">Regulatory Update Detected</h4>
            <p className="text-indigo-700/70 text-sm">A new amendment to the <span className="font-bold underline decoration-indigo-300">EU Data Privacy Act</span> was published today. Your current policies may be affected.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-indigo-200 rounded-xl text-sm font-bold text-indigo-600 hover:bg-slate-50 transition-all">
            Review Changes
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Automate Patch
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FrameworkItem({ label, progress, color }: { label: string; progress: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-tight">{label}</span>
        <span className="text-slate-400 font-mono">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)} 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, up, icon: Icon, iconColor, bgColor }: any) {
  return (
    <motion.div 
      variants={item}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl transition-colors", bgColor, iconColor)}>
          <Icon size={22} className={cn(iconColor)} />
        </div>
        <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-slate-500 transition-all">
          <MoreVertical size={16} />
        </button>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 tracking-tight">{title}</p>
        <div className="flex items-end gap-3 mt-1">
          <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
          {trend && (
            <div className={cn(
              "flex items-center gap-0.5 text-xs font-bold mb-1",
              up === true ? "text-emerald-600" : up === false ? "text-red-600" : "text-amber-600"
            )}>
              {up === true ? <ArrowUpRight size={14} /> : up === false ? <ArrowDownRight size={14} /> : null}
              {trend}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
