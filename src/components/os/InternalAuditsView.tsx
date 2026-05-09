import React, { useState } from 'react';
import {
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const AUDIT_DATA = [
  { id: 'AUD-2026-001', auditName: 'Access Control & Identity Management', auditType: 'Compliance', scope: 'All Systems', status: 'In Progress', startDate: '2026-04-01', endDate: '2026-05-15', auditor: 'John Smith', findings: 5, criticalFindings: 2, schedule: 'Quarterly' },
  { id: 'AUD-2026-002', auditName: 'Data Security & Privacy Controls', auditType: 'Security', scope: 'Data Centers', status: 'Completed', startDate: '2026-03-10', endDate: '2026-04-28', auditor: 'Sarah Johnson', findings: 12, criticalFindings: 1, schedule: 'Annual' },
  { id: 'AUD-2026-003', auditName: 'Change Management Process', auditType: 'Operational', scope: 'IT Operations', status: 'Scheduled', startDate: '2026-05-20', endDate: '2026-06-10', auditor: 'Mike Chen', findings: 0, criticalFindings: 0, schedule: 'Semi-Annual' },
  { id: 'AUD-2026-004', auditName: 'Incident Response & Business Continuity', auditType: 'Risk', scope: 'All Departments', status: 'In Progress', startDate: '2026-04-15', endDate: '2026-05-30', auditor: 'Emily Davis', findings: 3, criticalFindings: 1, schedule: 'Annual' },
  { id: 'AUD-2026-005', auditName: 'Vendor Risk Management', auditType: 'Compliance', scope: 'Procurement', status: 'Completed', startDate: '2026-02-20', endDate: '2026-04-10', auditor: 'Robert Wilson', findings: 8, criticalFindings: 2, schedule: 'Annual' },
  { id: 'AUD-2026-006', auditName: 'Asset Inventory & Tracking', auditType: 'Operational', scope: 'Hardware', status: 'Scheduled', startDate: '2026-06-01', endDate: '2026-06-30', auditor: 'Lisa Anderson', findings: 0, criticalFindings: 0, schedule: 'Semi-Annual' },
  { id: 'AUD-2026-007', auditName: 'User Access Review', auditType: 'Security', scope: 'All Systems', status: 'In Progress', startDate: '2026-04-25', endDate: '2026-05-25', auditor: 'David Martinez', findings: 2, criticalFindings: 0, schedule: 'Quarterly' },
  { id: 'AUD-2026-008', auditName: 'Compliance Monitoring Systems', auditType: 'Compliance', scope: 'Monitoring Platform', status: 'Completed', startDate: '2026-01-15', endDate: '2026-03-30', auditor: 'Jennifer Lee', findings: 6, criticalFindings: 1, schedule: 'Quarterly' },
];

const RISK_DATA = [
  { id: 'RISK-2026-0001', description: 'Inadequate access controls in legacy systems', category: 'Security', severity: 'Critical', probability: 'High', impact: 'High', status: 'Open', owner: 'John Smith', mitigationStrategy: 'Implement IAM solution', residualRisk: 'Medium', dueDate: '2026-06-30' },
  { id: 'RISK-2026-0002', description: 'Insufficient data encryption standards', category: 'Compliance', severity: 'Critical', probability: 'High', impact: 'High', status: 'In Progress', owner: 'Sarah Johnson', mitigationStrategy: 'Enforce encryption policy', residualRisk: 'Low', dueDate: '2026-05-31' },
  { id: 'RISK-2026-0003', description: 'Vendor compliance gaps in SLA', category: 'Operational', severity: 'High', probability: 'Medium', impact: 'High', status: 'Open', owner: 'Robert Wilson', mitigationStrategy: 'Enhanced vendor audits', residualRisk: 'Medium', dueDate: '2026-07-15' },
  { id: 'RISK-2026-0004', description: 'Incident response plan not tested', category: 'Risk', severity: 'High', probability: 'Medium', impact: 'Medium', status: 'Mitigated', owner: 'Emily Davis', mitigationStrategy: 'Conduct tabletop exercises', residualRisk: 'Low', dueDate: '2026-04-30' },
  { id: 'RISK-2026-0005', description: 'Lack of business continuity documentation', category: 'Risk', severity: 'Medium', probability: 'Medium', impact: 'High', status: 'Open', owner: 'Lisa Anderson', mitigationStrategy: 'Develop BC/DR plans', residualRisk: 'High', dueDate: '2026-08-31' },
  { id: 'RISK-2026-0006', description: 'Insufficient backup procedures', category: 'Operational', severity: 'High', probability: 'High', impact: 'High', status: 'In Progress', owner: 'Mike Chen', mitigationStrategy: 'Implement automated backups', residualRisk: 'Medium', dueDate: '2026-05-15' },
  { id: 'RISK-2026-0007', description: 'Absence of third-party security assessments', category: 'Security', severity: 'Medium', probability: 'High', impact: 'Medium', status: 'Open', owner: 'David Martinez', mitigationStrategy: 'Schedule security audit', residualRisk: 'Medium', dueDate: '2026-07-01' },
  { id: 'RISK-2026-0008', description: 'Inadequate security awareness training', category: 'Compliance', severity: 'Medium', probability: 'High', impact: 'Medium', status: 'Mitigated', owner: 'Jennifer Lee', mitigationStrategy: 'Mandatory training program', residualRisk: 'Low', dueDate: '2026-04-15' },
];

export function InternalAuditsView() {
  const [activePage, setActivePage] = useState<'audit' | 'risk'>('audit');
  const [searchAudit, setSearchAudit] = useState('');
  const [searchRisk, setSearchRisk] = useState('');
  const [selectedAudit, setSelectedAudit] = useState<typeof AUDIT_DATA[0] | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<typeof RISK_DATA[0] | null>(null);

  const filteredAudits = AUDIT_DATA.filter(audit =>
    audit.auditName.toLowerCase().includes(searchAudit.toLowerCase()) ||
    audit.auditType.toLowerCase().includes(searchAudit.toLowerCase()) ||
    audit.auditor.toLowerCase().includes(searchAudit.toLowerCase())
  );

  const filteredRisks = RISK_DATA.filter(risk =>
    risk.description.toLowerCase().includes(searchRisk.toLowerCase()) ||
    risk.category.toLowerCase().includes(searchRisk.toLowerCase()) ||
    risk.owner.toLowerCase().includes(searchRisk.toLowerCase())
  );

  const getAuditStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           'bg-blue-50 text-blue-700 border-blue-100';
  };

  const getAuditStatusIcon = (status: string) => {
    return status === 'Completed' ? <CheckCircle2 size={12} /> :
           status === 'In Progress' ? <Clock size={12} /> :
           <AlertCircle size={12} />;
  };

  const getRiskSeverityColor = (severity: string) => {
    return severity === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
           severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-100' :
           'bg-amber-50 text-amber-700 border-amber-100';
  };

  const getRiskStatusColor = (status: string) => {
    return status === 'Mitigated' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
           'bg-rose-50 text-rose-700 border-rose-100';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Internal Audits</h1>
          <p className="text-sm text-slate-500">Manage internal audits and risk assessments for your organization.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Plus size={16} /> New
          </button>
        </div>
      </div>

      {/* Page Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'audit', label: 'Audits', icon: ClipboardCheck },
          { id: 'risk', label: 'Risks', icon: AlertTriangle }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all",
                activePage === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              )}
            >
              <Icon size={16} /> {tab.label} ({tab.id === 'audit' ? filteredAudits.length : filteredRisks.length})
            </button>
          );
        })}
      </div>

      {/* Audits Page */}
      {activePage === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audits List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex gap-4 bg-slate-50/50">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search audits by name, type, or auditor..."
                    value={searchAudit}
                    onChange={(e) => setSearchAudit(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredAudits.map((audit) => (
                  <motion.div
                    key={audit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedAudit(audit)}
                    className={cn(
                      "p-6 hover:bg-slate-50 transition-all cursor-pointer group border-l-4",
                      selectedAudit?.id === audit.id
                        ? "bg-emerald-50 border-emerald-500"
                        : "border-transparent hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{audit.auditName}</h3>
                        <p className="text-xs text-slate-500 mt-1">{audit.auditType} • Scope: {audit.scope}</p>
                      </div>
                      <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold border inline-flex items-center gap-1", getAuditStatusColor(audit.status))}>
                        {getAuditStatusIcon(audit.status)} {audit.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-slate-500">Auditor</p>
                        <p className="font-bold text-slate-700">{audit.auditor}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Findings</p>
                        <p className="font-bold text-slate-700">{audit.findings} ({audit.criticalFindings} critical)</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Start Date</p>
                        <p className="font-bold text-slate-700">{audit.startDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Schedule</p>
                        <p className="font-bold text-slate-700">{audit.schedule}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Details */}
          <div>
            {selectedAudit ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-6 sticky top-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4">{selectedAudit.auditName}</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Audit ID</span>
                      <span className="font-bold text-slate-700">{selectedAudit.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="font-bold text-slate-700">{selectedAudit.auditType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scope</span>
                      <span className="font-bold text-slate-700">{selectedAudit.scope}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Auditor</span>
                      <span className="font-bold text-slate-700">{selectedAudit.auditor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Start Date</span>
                      <span className="font-bold text-slate-700">{selectedAudit.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">End Date</span>
                      <span className="font-bold text-slate-700">{selectedAudit.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Findings</span>
                      <span className="font-bold text-rose-600">{selectedAudit.findings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Critical Findings</span>
                      <span className="font-bold text-rose-700">{selectedAudit.criticalFindings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Schedule</span>
                      <span className="font-bold text-slate-700">{selectedAudit.schedule}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">Actions</p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                      View Details
                    </button>
                    <button className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center h-full">
                <ClipboardCheck size={40} className="text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-600">Select an audit to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Risks Page */}
      {activePage === 'risk' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risks List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex gap-4 bg-slate-50/50">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search risks by description, category, or owner..."
                    value={searchRisk}
                    onChange={(e) => setSearchRisk(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredRisks.map((risk) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedRisk(risk)}
                    className={cn(
                      "p-6 hover:bg-slate-50 transition-all cursor-pointer group border-l-4",
                      selectedRisk?.id === risk.id
                        ? "bg-emerald-50 border-emerald-500"
                        : "border-transparent hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{risk.description}</h3>
                        <p className="text-xs text-slate-500 mt-1">{risk.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold border", getRiskSeverityColor(risk.severity))}>
                          {risk.severity}
                        </span>
                        <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold border", getRiskStatusColor(risk.status))}>
                          {risk.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-slate-500">Probability</p>
                        <p className="font-bold text-slate-700">{risk.probability}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Impact</p>
                        <p className="font-bold text-slate-700">{risk.impact}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Owner</p>
                        <p className="font-bold text-slate-700">{risk.owner}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Residual Risk</p>
                        <p className="font-bold text-slate-700">{risk.residualRisk}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Details */}
          <div>
            {selectedRisk ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-6 sticky top-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4">{selectedRisk.description}</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Risk ID</span>
                      <span className="font-bold text-slate-700">{selectedRisk.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Category</span>
                      <span className="font-bold text-slate-700">{selectedRisk.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Severity</span>
                      <span className={cn("font-bold", selectedRisk.severity === 'Critical' ? 'text-rose-700' : 'text-orange-700')}>
                        {selectedRisk.severity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Probability</span>
                      <span className="font-bold text-slate-700">{selectedRisk.probability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Impact</span>
                      <span className="font-bold text-slate-700">{selectedRisk.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status</span>
                      <span className="font-bold text-slate-700">{selectedRisk.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Owner</span>
                      <span className="font-bold text-slate-700">{selectedRisk.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Residual Risk</span>
                      <span className="font-bold text-slate-700">{selectedRisk.residualRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Due Date</span>
                      <span className="font-bold text-slate-700">{selectedRisk.dueDate}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-slate-500 mb-1">Mitigation Strategy</p>
                      <p className="font-bold text-slate-700">{selectedRisk.mitigationStrategy}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">Actions</p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                      View Details
                    </button>
                    <button className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center h-full">
                <AlertTriangle size={40} className="text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-600">Select a risk to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
