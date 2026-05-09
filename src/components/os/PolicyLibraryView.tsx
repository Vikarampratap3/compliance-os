import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  Calendar,
  Tag,
  FileText,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ArrowUp,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const POLICY_DATA = [
  { id: 'POL-2024-001', title: 'Information Security Policy', category: 'Security', version: '3.2', status: 'Active', owner: 'John Smith', createdDate: '2024-01-15', lastModified: '2026-04-20', reviewDate: '2026-07-15', description: 'Comprehensive information security policy covering data protection, access control, and security measures', department: 'IT Security', scope: 'Organization-wide', downloads: 245 },
  { id: 'POL-2024-002', title: 'Data Privacy and GDPR Compliance Policy', category: 'Compliance', version: '2.5', status: 'Active', owner: 'Sarah Johnson', createdDate: '2024-02-10', lastModified: '2026-04-15', reviewDate: '2026-06-30', description: 'Policy ensuring GDPR and data privacy regulations compliance', department: 'Legal', scope: 'Organization-wide', downloads: 189 },
  { id: 'POL-2024-003', title: 'Incident Response Policy', category: 'Risk Management', version: '2.1', status: 'Active', owner: 'Mike Chen', createdDate: '2024-03-05', lastModified: '2026-03-25', reviewDate: '2026-06-15', description: 'Procedures for responding to security incidents and breaches', department: 'IT Security', scope: 'All Departments', downloads: 167 },
  { id: 'POL-2024-004', title: 'Access Control and Authentication Policy', category: 'Security', version: '4.0', status: 'Active', owner: 'Emily Davis', createdDate: '2023-12-01', lastModified: '2026-04-10', reviewDate: '2026-05-30', description: 'Defines standards for user access, authentication, and authorization', department: 'IT Security', scope: 'All Systems', downloads: 298 },
  { id: 'POL-2024-005', title: 'Change Management Policy', category: 'Operations', version: '1.8', status: 'Active', owner: 'Robert Wilson', createdDate: '2024-04-20', lastModified: '2026-02-28', reviewDate: '2026-08-15', description: 'Guidelines for implementing and controlling system changes', department: 'IT Operations', scope: 'IT Infrastructure', downloads: 156 },
  { id: 'POL-2024-006', title: 'Business Continuity and Disaster Recovery Policy', category: 'Business Continuity', version: '2.3', status: 'Active', owner: 'Lisa Anderson', createdDate: '2024-05-15', lastModified: '2026-01-30', reviewDate: '2026-07-01', description: 'BC/DR procedures and recovery time objectives', department: 'Operations', scope: 'All Departments', downloads: 203 },
  { id: 'POL-2024-007', title: 'Vendor and Third-Party Risk Management Policy', category: 'Compliance', version: '1.5', status: 'Active', owner: 'David Martinez', createdDate: '2024-06-10', lastModified: '2026-03-20', reviewDate: '2026-09-15', description: 'Risk assessment and management procedures for vendors', department: 'Procurement', scope: 'Vendor Management', downloads: 134 },
  { id: 'POL-2024-008', title: 'Acceptable Use Policy (AUP)', category: 'Security', version: '2.9', status: 'Active', owner: 'Jennifer Lee', createdDate: '2024-01-20', lastModified: '2026-04-05', reviewDate: '2026-06-01', description: 'Guidelines for acceptable use of company IT resources', department: 'IT Security', scope: 'All Users', downloads: 412 },
  { id: 'POL-2024-009', title: 'Clean Desk and Information Classification Policy', category: 'Security', version: '1.2', status: 'Active', owner: 'John Smith', createdDate: '2024-07-01', lastModified: '2026-02-15', reviewDate: '2026-08-30', description: 'Physical security and information classification standards', department: 'IT Security', scope: 'All Offices', downloads: 89 },
  { id: 'POL-2024-010', title: 'Password Management Policy', category: 'Security', version: '3.5', status: 'Active', owner: 'Sarah Johnson', createdDate: '2024-02-20', lastModified: '2026-04-01', reviewDate: '2026-05-15', description: 'Standards for password creation, storage, and rotation', department: 'IT Security', scope: 'All Systems', downloads: 356 },
  { id: 'POL-2024-011', title: 'Audit and Compliance Policy', category: 'Compliance', version: '2.0', status: 'In Review', owner: 'Mike Chen', createdDate: '2024-08-15', lastModified: '2026-04-18', reviewDate: '2026-05-30', description: 'Framework for internal and external audits', department: 'Compliance', scope: 'Organization-wide', downloads: 145 },
  { id: 'POL-2024-012', title: 'Whistleblower and Ethics Policy', category: 'Compliance', version: '1.7', status: 'Active', owner: 'Emily Davis', createdDate: '2024-03-25', lastModified: '2026-03-10', reviewDate: '2026-07-20', description: 'Procedures for reporting violations and ethical concerns', department: 'Legal', scope: 'All Employees', downloads: 178 },
];

const POLICY_CATEGORIES = [
  { name: 'All', count: 12 },
  { name: 'Security', count: 5 },
  { name: 'Compliance', count: 4 },
  { name: 'Operations', count: 1 },
  { name: 'Risk Management', count: 1 },
  { name: 'Business Continuity', count: 1 },
];

export function PolicyLibraryView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<typeof POLICY_DATA[0] | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'downloads'>('name');

  const filteredPolicies = POLICY_DATA.filter(policy => {
    const matchesCategory = activeCategory === 'All' || policy.category === activeCategory;
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'modified') return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    return 0;
  });

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           'bg-amber-50 text-amber-700 border-amber-100';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Policy Library</h1>
          <p className="text-sm text-slate-500">Centralized repository of organizational policies and procedures.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Plus size={16} /> New Policy
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <BookOpen size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">+12</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">12</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Policies</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">100%</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">11</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Policies</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertCircle size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-100 text-amber-700">8%</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">1</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">In Review</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-indigo-100 text-indigo-700">+3,271</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">3,271</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Downloads</p>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Policies List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Search and Filter */}
            <div className="p-6 border-b border-slate-100 space-y-4 bg-slate-50/50">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search policies by title, category, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {POLICY_CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ring-1 ring-inset",
                      activeCategory === cat.name
                        ? "bg-slate-800 text-white ring-slate-800"
                        : "bg-white text-slate-500 ring-slate-200 hover:ring-slate-300"
                    )}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none"
                >
                  <option value="name">Sort by Name</option>
                  <option value="modified">Sort by Modified</option>
                  <option value="downloads">Sort by Downloads</option>
                </select>
              </div>
            </div>

            {/* Policies Table */}
            <div className="divide-y divide-slate-100">
              {sortedPolicies.map((policy) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedPolicy(policy)}
                  className={cn(
                    "p-6 hover:bg-slate-50 transition-all cursor-pointer group border-l-4",
                    selectedPolicy?.id === policy.id
                      ? "bg-emerald-50 border-emerald-500"
                      : "border-transparent hover:border-slate-200"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{policy.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{policy.description}</p>
                    </div>
                    <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold border inline-flex items-center gap-1", getStatusColor(policy.status))}>
                      {getStatusIcon(policy.status)} {policy.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">Category</p>
                      <p className="font-bold text-slate-700">{policy.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Version</p>
                      <p className="font-bold text-slate-700">v{policy.version}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Owner</p>
                      <p className="font-bold text-slate-700">{policy.owner}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Modified</p>
                      <p className="font-bold text-slate-700">{policy.lastModified}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Review Date</p>
                      <p className="font-bold text-slate-700">{policy.reviewDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Downloads</p>
                      <p className="font-bold text-slate-700 flex items-center gap-1">
                        <ArrowUp size={12} className="text-emerald-600" /> {policy.downloads}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy Details Panel */}
        <div>
          {selectedPolicy ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-6 sticky top-6"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">{selectedPolicy.title}</h3>
                  <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold border inline-flex items-center gap-1", getStatusColor(selectedPolicy.status))}>
                    {getStatusIcon(selectedPolicy.status)} {selectedPolicy.status}
                  </span>
                </div>
                <div className="space-y-4 text-xs">
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Policy ID</p>
                    <p className="font-mono font-bold text-slate-700">{selectedPolicy.id}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Category</p>
                    <p className="font-bold text-slate-700">{selectedPolicy.category}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Current Version</p>
                    <p className="font-bold text-slate-700">v{selectedPolicy.version}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Owner/Department</p>
                    <p className="font-bold text-slate-700">{selectedPolicy.owner}</p>
                    <p className="text-slate-600">{selectedPolicy.department}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Scope</p>
                    <p className="font-bold text-slate-700">{selectedPolicy.scope}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Created</p>
                    <p className="font-bold text-slate-700">{selectedPolicy.createdDate}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Last Modified</p>
                    <p className="font-bold text-slate-700">{selectedPolicy.lastModified}</p>
                  </div>
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-slate-500 mb-1">Next Review Due</p>
                    <p className="font-bold text-emerald-600">{selectedPolicy.reviewDate}</p>
                  </div>
                  <div className="pb-4">
                    <p className="text-slate-500 mb-1">Downloads</p>
                    <p className="font-bold text-slate-700 flex items-center gap-2">
                      <TrendingUp size={14} className="text-emerald-600" /> {selectedPolicy.downloads}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">Actions</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all">
                    <Eye size={14} /> View Full Policy
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all">
                    <Download size={14} /> Download PDF
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                    <Edit size={14} /> Edit
                  </button>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4">
                <p className="text-[10px] text-emerald-700 leading-relaxed">
                  <span className="font-bold">Info:</span> Policy is due for review on {selectedPolicy.reviewDate}. Plan ahead for timely updates and approvals.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center h-full">
              <BookOpen size={40} className="text-slate-300 mb-4" />
              <p className="text-sm font-bold text-slate-600">Select a policy to view details</p>
              <p className="text-xs text-slate-500 mt-2">Choose any policy from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
