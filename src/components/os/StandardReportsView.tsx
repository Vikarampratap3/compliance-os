import React, { useState } from 'react';
import {
  BarChart2,
  Download,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle2,
  Eye,
  Share2,
  Table,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../../lib/utils';

const MOCK_REPORTS = [
  { id: 'RPT-001', name: 'Compliance Status Dashboard', description: 'Real-time overview of all compliance metrics and controls', category: 'Executive', frequency: 'Weekly', lastGenerated: '2026-05-09 10:30', status: 'Ready', format: 'PDF/Excel', size: '2.4 MB' },
  { id: 'RPT-002', name: 'Risk Assessment Report', description: 'Comprehensive risk matrix and mitigation status', category: 'Risk', frequency: 'Monthly', lastGenerated: '2026-05-08 14:15', status: 'Ready', format: 'PDF', size: '5.1 MB' },
  { id: 'RPT-003', name: 'Access Control Audit', description: 'User access rights and recertification status', category: 'Security', frequency: 'Quarterly', lastGenerated: '2026-05-01 09:00', status: 'Ready', format: 'Excel', size: '3.8 MB' },
  { id: 'RPT-004', name: 'Incident & Problem Report', description: 'All incidents, problems, and their resolution status', category: 'Operations', frequency: 'Weekly', lastGenerated: '2026-05-09 08:45', status: 'Ready', format: 'PDF/Excel', size: '1.9 MB' },
  { id: 'RPT-005', name: 'Audit Trail & Compliance Log', description: 'Detailed system audit logs and compliance activities', category: 'Audit', frequency: 'On Demand', lastGenerated: '2026-05-08 16:20', status: 'Ready', format: 'CSV/Excel', size: '18.7 MB' },
  { id: 'RPT-006', name: 'Change Management Summary', description: 'RFC status and change implementation metrics', category: 'Service Management', frequency: 'Monthly', lastGenerated: '2026-04-30 11:00', status: 'Ready', format: 'PDF', size: '2.2 MB' },
  { id: 'RPT-007', name: 'Data Privacy Impact Assessment', description: 'GDPR/CCPA compliance and data handling review', category: 'Privacy', frequency: 'Quarterly', lastGenerated: '2026-05-05 13:30', status: 'Ready', format: 'PDF', size: '4.5 MB' },
  { id: 'RPT-008', name: 'SLA Performance Report', description: 'Service level agreement compliance metrics', category: 'Operations', frequency: 'Monthly', lastGenerated: '2026-05-07 10:15', status: 'Ready', format: 'Excel', size: '1.6 MB' },
  { id: 'RPT-009', name: 'Policy Compliance Matrix', description: 'Mapping of policies to compliance frameworks', category: 'Compliance', frequency: 'Bi-Annual', lastGenerated: '2026-04-15 14:45', status: 'Ready', format: 'Excel', size: '2.9 MB' },
];

const CHART_DATA = [
  { name: 'Week 1', compliance: 78, risk: 45, audit: 62, incidents: 12 },
  { name: 'Week 2', compliance: 82, risk: 42, audit: 65, incidents: 10 },
  { name: 'Week 3', compliance: 85, risk: 38, audit: 70, incidents: 8 },
  { name: 'Week 4', compliance: 88, risk: 35, audit: 75, incidents: 6 },
];

const RISK_DISTRIBUTION = [
  { name: 'Critical', value: 5, fill: '#ef4444' },
  { name: 'High', value: 18, fill: '#f97316' },
  { name: 'Medium', value: 35, fill: '#eab308' },
  { name: 'Low', value: 42, fill: '#10b981' },
];

const AUDIT_DATA = [
  { id: 'AUD-001', area: 'Access Control', findings: 3, remediated: 2, status: 'In Progress' },
  { id: 'AUD-002', area: 'Data Security', findings: 5, remediated: 5, status: 'Closed' },
  { id: 'AUD-003', area: 'Incident Response', findings: 2, remediated: 1, status: 'In Progress' },
  { id: 'AUD-004', area: 'Change Management', findings: 4, remediated: 2, status: 'Open' },
  { id: 'AUD-005', area: 'Asset Management', findings: 1, remediated: 0, status: 'Open' },
];

export function StandardReportsView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReport, setSelectedReport] = useState<typeof MOCK_REPORTS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'chart' | 'table'>('list');

  const categories = ['All', 'Executive', 'Risk', 'Security', 'Operations', 'Audit', 'Privacy', 'Compliance', 'Service Management'];

  const filteredReports = selectedCategory === 'All'
    ? MOCK_REPORTS
    : MOCK_REPORTS.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Standard Reports</h1>
          <p className="text-sm text-slate-500">Access pre-built compliance and operational reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={16} /> Schedule
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Download size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'list', label: 'Reports List', icon: FileText },
          { id: 'chart', label: 'Charts', icon: BarChart2 },
          { id: 'table', label: 'Data Tables', icon: Table }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all",
                viewMode === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              )}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Reports List View */}
      {viewMode === 'list' && (
        <>
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ring-1 ring-inset",
                  selectedCategory === cat
                    ? "bg-slate-800 text-white ring-slate-800"
                    : "bg-white text-slate-500 ring-slate-200 hover:ring-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Available Reports ({filteredReports.length})
                  </h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedReport(report)}
                      className={cn(
                        "p-6 hover:bg-slate-50 transition-all cursor-pointer group border-l-4",
                        selectedReport?.id === report.id
                          ? "bg-indigo-50 border-indigo-500"
                          : "border-transparent hover:border-slate-200"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors shrink-0">
                          <FileText size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{report.name}</h4>
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 whitespace-nowrap">
                              {report.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{report.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-bold">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> {report.frequency}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart2 size={12} /> {report.format}
                            </span>
                            <span>{report.size}</span>
                            <span className="ml-auto text-emerald-600 font-bold">Last: {report.lastGenerated.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Details */}
            <div>
              {selectedReport ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4">{selectedReport.name}</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Report ID</span>
                        <span className="font-bold text-slate-700">{selectedReport.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Frequency</span>
                        <span className="font-bold text-slate-700">{selectedReport.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Format</span>
                        <span className="font-bold text-slate-700">{selectedReport.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">File Size</span>
                        <span className="font-bold text-slate-700">{selectedReport.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Last Generated</span>
                        <span className="font-bold text-emerald-600">{selectedReport.lastGenerated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-wider font-bold">Actions</p>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                        <Download size={16} /> Download Latest
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">
                        <Eye size={16} /> View Report
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                        <Share2 size={16} /> Share
                      </button>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4">
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      <span className="font-bold">Note:</span> Reports are generated on-demand. Processing time depends on data volume.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center h-full">
                  <FileText size={40} className="text-slate-300 mb-4" />
                  <p className="text-sm font-bold text-slate-600">Select a report to view details</p>
                  <p className="text-xs text-slate-500 mt-2">Choose any report from the list to see more information</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Charts View */}
      {viewMode === 'chart' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Compliance Trend */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Compliance Metrics Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="audit" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart - Risk Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={RISK_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {RISK_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} items`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart - Incidents vs Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Incidents vs Compliance Score</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="compliance" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="incidents" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Risk Count Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Risk Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="risk" fill="#f97316" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="audit" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="space-y-6">
          {/* Audit Findings Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Audit Findings Summary</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Audit ID</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">Total Findings</th>
                    <th className="px-6 py-4">Remediated</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {AUDIT_DATA.map((audit) => (
                    <tr key={audit.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono font-bold text-slate-600">{audit.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{audit.area}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{audit.findings}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-emerald-600">{audit.remediated}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{audit.findings - audit.remediated}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-bold",
                          audit.status === 'Closed' ? 'bg-emerald-50 text-emerald-700' :
                          audit.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        )}>
                          {audit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Compliance Summary Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Compliance Metrics by Week</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Week</th>
                    <th className="px-6 py-4">Compliance Score</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Audit Items</th>
                    <th className="px-6 py-4">Incidents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHART_DATA.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{row.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-100 rounded-full h-2 max-w-xs">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${row.compliance}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{row.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-bold",
                          row.risk > 40 ? 'bg-rose-50 text-rose-700' :
                          row.risk > 35 ? 'bg-amber-50 text-amber-700' :
                          'bg-emerald-50 text-emerald-700'
                        )}>
                          {row.risk} items
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{row.audit} items</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700">{row.incidents} open</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
