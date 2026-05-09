import React, { useState } from 'react';
import {
  Plus,
  Download,
  BarChart3,
  Sliders,
  Calendar,
  Tag,
  Filter,
  Save,
  Play,
  Zap,
  CheckCircle2,
  Layers,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../../lib/utils';

const SAVED_REPORTS = [
  { id: 'CR-001', name: 'Monthly Compliance Metrics', description: 'Compliance status by department', created: '2026-04-15', lastRun: '2026-05-09', frequency: 'Monthly', status: 'Active' },
  { id: 'CR-002', name: 'Risk Trend Analysis', description: 'Risk movement and remediation tracking', created: '2026-03-20', lastRun: '2026-05-07', frequency: 'Weekly', status: 'Active' },
  { id: 'CR-003', name: 'Access Control Review', description: 'User access by role and site', created: '2026-02-28', lastRun: '2026-05-01', frequency: 'Quarterly', status: 'Active' },
  { id: 'CR-004', name: 'Incident Trend Report', description: 'Incident frequency and resolution time', created: '2026-04-01', lastRun: '2026-05-08', frequency: 'Weekly', status: 'Active' },
];

const REPORT_CHART_DATA = [
  { month: 'Jan', compliance: 72, risk: 28, incidents: 12 },
  { month: 'Feb', compliance: 75, risk: 25, incidents: 10 },
  { month: 'Mar', compliance: 78, risk: 22, incidents: 8 },
  { month: 'Apr', compliance: 82, risk: 18, incidents: 6 },
  { month: 'May', compliance: 85, risk: 15, incidents: 4 },
];

const DISTRIBUTION_DATA = [
  { name: 'North America', value: 35, fill: '#10b981' },
  { name: 'EMEA', value: 30, fill: '#06b6d4' },
  { name: 'APAC', value: 20, fill: '#f97316' },
  { name: 'Other', value: 15, fill: '#8b5cf6' },
];

export function CustomReportBuilderView() {
  const [activeTab, setActiveTab] = useState<'builder' | 'saved'>('saved');
  const [reportName, setReportName] = useState('');
  const [dataSource, setDataSource] = useState('Compliance');
  const [metrics, setMetrics] = useState<string[]>(['Status Count']);
  const [filters, setFilters] = useState('All Regions');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [frequency, setFrequency] = useState('One-time');
  const [reportView, setReportView] = useState<'builder' | 'preview' | 'results'>('builder');

  const dataSources = ['Compliance', 'Risk', 'Audit', 'Incidents', 'Assets', 'Users', 'Changes'];
  const availableMetrics = {
    Compliance: ['Status Count', 'Overdue Items', 'Approval Rate', 'Document Versions'],
    Risk: ['Risk Count', 'Risk Score', 'Mitigation Status', 'Trend Analysis'],
    Audit: ['Findings', 'Non-Conformances', 'Remediation Status', 'Audit Coverage'],
    Incidents: ['Incident Count', 'Response Time', 'Resolution Rate', 'Root Cause Analysis'],
    Assets: ['Asset Count', 'Classification', 'Criticality', 'Ownership'],
    Users: ['User Count', 'Role Distribution', 'Access Rights', 'Activity Log'],
    Changes: ['Change Count', 'Status', 'Impact Analysis', 'Deployment Success'],
  };

  const handleAddMetric = (metric: string) => {
    if (!metrics.includes(metric)) {
      setMetrics([...metrics, metric]);
    }
  };

  const handleRemoveMetric = (metric: string) => {
    setMetrics(metrics.filter(m => m !== metric));
  };

  const handleGenerateReport = () => {
    if (reportName) {
      setReportView('results');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Custom Report Builder</h1>
          <p className="text-sm text-slate-500">Create personalized reports with custom data sources and metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'builder' && reportView === 'builder' && (
            <button
              onClick={handleGenerateReport}
              disabled={!reportName || metrics.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200"
            >
              <Play size={16} /> Generate Report
            </button>
          )}
          {reportView !== 'builder' && (
            <button
              onClick={() => setReportView('builder')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => { setActiveTab('builder'); setReportView('builder'); }}
          className={cn(
            "px-6 py-3 text-sm font-bold border-b-2 transition-all",
            activeTab === 'builder'
              ? 'text-emerald-600 border-emerald-600'
              : 'text-slate-500 border-transparent hover:text-slate-700'
          )}
        >
          <Zap className="inline mr-2" size={16} /> Report Builder
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={cn(
            "px-6 py-3 text-sm font-bold border-b-2 transition-all",
            activeTab === 'saved'
              ? 'text-emerald-600 border-emerald-600'
              : 'text-slate-500 border-transparent hover:text-slate-700'
          )}
        >
          <Save className="inline mr-2" size={16} /> Saved Reports ({SAVED_REPORTS.length})
        </button>
      </div>

      {/* Report Builder Tab */}
      {activeTab === 'builder' && reportView === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-6"
            >
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Report Name *</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., Q2 Compliance Dashboard"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              {/* Data Source Selection */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 block">Data Source *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {dataSources.map(source => (
                    <button
                      key={source}
                      onClick={() => { setDataSource(source); setMetrics([]); }}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-xs font-bold transition-all border",
                        dataSource === source
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      )}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Selection */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 block">Metrics *</label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {availableMetrics[dataSource as keyof typeof availableMetrics].map(metric => (
                      <button
                        key={metric}
                        onClick={() => handleAddMetric(metric)}
                        disabled={metrics.includes(metric)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-bold transition-all border",
                          metrics.includes(metric)
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-not-allowed'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                        )}
                      >
                        {metrics.includes(metric) ? '✓' : '+'} {metric}
                      </button>
                    ))}
                  </div>
                  {metrics.length > 0 && (
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Selected Metrics</p>
                      <div className="flex flex-wrap gap-2">
                        {metrics.map(metric => (
                          <div key={metric} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                            <span className="text-xs font-bold text-slate-700">{metric}</span>
                            <button
                              onClick={() => handleRemoveMetric(metric)}
                              className="text-emerald-600 hover:text-emerald-700 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Filter</label>
                  <select
                    value={filters}
                    onChange={(e) => setFilters(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option>All Regions</option>
                    <option>North America</option>
                    <option>EMEA</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Date Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last 12 Months</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Schedule (optional)</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                >
                  <option>One-time</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border border-emerald-200 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={20} className="text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-900">Report Preview</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Configuration</p>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Name:</span>
                      <span className="font-bold text-emerald-900">{reportName || 'Untitled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Source:</span>
                      <span className="font-bold text-emerald-900">{dataSource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Metrics:</span>
                      <span className="font-bold text-emerald-900">{metrics.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Schedule:</span>
                      <span className="font-bold text-emerald-900">{frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4">
              <p className="text-[10px] text-indigo-700 leading-relaxed">
                <span className="font-bold">Tip:</span> Custom reports are generated on-demand and can be scheduled for automatic generation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Report Results View */}
      {activeTab === 'builder' && reportView === 'results' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 rounded-3xl border border-emerald-100 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-emerald-900 mb-1">{reportName}</h3>
                <p className="text-sm text-emerald-700">Report generated successfully • Data Source: {dataSource} • Metrics: {metrics.length}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                <Download size={16} /> Export
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Compliance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={REPORT_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Regional Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Incidents by Month</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={REPORT_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="incidents" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Summary Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-6">Summary</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Total Compliance Score</p>
                  <p className="text-3xl font-bold text-emerald-600">85%</p>
                </div>
                <div className="pb-4 border-b border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Active Incidents</p>
                  <p className="text-3xl font-bold text-rose-600">4</p>
                </div>
                <div className="pb-4 border-b border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Risk Score</p>
                  <p className="text-3xl font-bold text-amber-600">15</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Data Points</p>
                  <p className="text-3xl font-bold text-indigo-600">1,247</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Detailed Data ({metrics.join(', ')})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Month</th>
                    <th className="px-6 py-4">Compliance Score</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Incidents</th>
                    <th className="px-6 py-4">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REPORT_CHART_DATA.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{row.month}</span>
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
                          row.risk > 20 ? 'bg-rose-50 text-rose-700' :
                          row.risk > 15 ? 'bg-amber-50 text-amber-700' :
                          'bg-emerald-50 text-emerald-700'
                        )}>
                          {row.risk} items
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-700">{row.incidents}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-xs font-bold",
                          row.compliance > 75 ? 'text-emerald-600' : 'text-amber-600'
                        )}>
                          {row.compliance > 75 ? '↑ Improving' : '→ Stable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Saved Reports Tab */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAVED_REPORTS.map(report => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BarChart3 size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">{report.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{report.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100">
                  {report.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Frequency:</span>
                  <span className="font-bold text-slate-700">{report.frequency}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Last Run:</span>
                  <span className="font-bold text-slate-700">{report.lastRun}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all">
                  <Play size={14} /> Run Now
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                  <Download size={14} /> Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
