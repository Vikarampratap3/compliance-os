import React, { useState } from 'react';
import {
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Plus,
  Search,
  MoreVertical,
  Send,
  Radio,
  CheckCircle,
  TrendingUp,
  Activity,
  Eye,
  EyeOff,
  Settings,
  BarChart3,
  FileText,
  Home,
  Zap,
  Copy,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

const MOCK_TEMPLATES = [
  { id: 'TMPL-001', name: 'Welcome Message', status: 'Active', lastModified: '2026-04-15', usageCount: 142, content: 'Welcome to our service! Thank you for choosing us.', variables: ['customer_name'] },
  { id: 'TMPL-002', name: 'Order Confirmation', status: 'Active', lastModified: '2026-04-10', usageCount: 287, content: 'Your order {{order_id}} has been confirmed. Expected delivery: {{delivery_date}}', variables: ['order_id', 'delivery_date'] },
  { id: 'TMPL-003', name: 'Shipping Update', status: 'Active', lastModified: '2026-03-28', usageCount: 156, content: 'Your package is on its way! Track here: {{tracking_url}}', variables: ['tracking_url'] },
  { id: 'TMPL-004', name: 'Payment Reminder', status: 'Inactive', lastModified: '2026-02-14', usageCount: 45, content: 'Payment pending for order {{order_id}}. Please complete payment.', variables: ['order_id'] },
  { id: 'TMPL-005', name: 'Support Request Acknowledgment', status: 'Active', lastModified: '2026-04-20', usageCount: 89, content: 'Your inquiry has been received. Support ticket: {{ticket_id}}', variables: ['ticket_id'] },
  { id: 'TMPL-006', name: 'Feedback Request', status: 'Draft', lastModified: '2026-05-02', usageCount: 0, content: 'Please rate your experience with us.', variables: [] },
];

const MOCK_MESSAGES = [
  { id: 'MSG-001', timestamp: '2026-05-09 14:32', recipient: '+91-98765-43210', content: 'Your order #ORD-2541 has been confirmed', status: 'Delivered', deliveryTime: '2s', template: 'Order Confirmation', readTime: '45s' },
  { id: 'MSG-002', timestamp: '2026-05-09 13:15', recipient: '+91-97654-32109', content: 'Your package is on its way! Track here...', status: 'Delivered', deliveryTime: '1s', template: 'Shipping Update', readTime: '2m' },
  { id: 'MSG-003', timestamp: '2026-05-09 12:48', recipient: '+91-96543-21098', content: 'Welcome to our service!', status: 'Delivered', deliveryTime: '3s', template: 'Welcome Message', readTime: '1m' },
  { id: 'MSG-004', timestamp: '2026-05-09 11:22', recipient: '+91-95432-10987', content: 'Action needed: Complete your payment', status: 'Failed', deliveryTime: 'N/A', template: 'Payment Reminder', readTime: 'N/A' },
  { id: 'MSG-005', timestamp: '2026-05-09 10:45', recipient: '+91-94321-09876', content: 'Your inquiry has been received', status: 'Sent', deliveryTime: 'Pending', template: 'Support Request Acknowledgment', readTime: 'Pending' },
  { id: 'MSG-006', timestamp: '2026-05-09 09:30', recipient: '+91-93210-98765', content: 'Thank you for your purchase!', status: 'Delivered', deliveryTime: '2s', template: 'Welcome Message', readTime: '30s' },
  { id: 'MSG-007', timestamp: '2026-05-08 16:18', recipient: '+91-92109-87654', content: 'Order #ORD-2540 is ready for pickup', status: 'Delivered', deliveryTime: '1s', template: 'Order Confirmation', readTime: '5m' },
  { id: 'MSG-008', timestamp: '2026-05-08 14:05', recipient: '+91-91098-76543', content: 'We value your feedback!', status: 'Delivered', deliveryTime: '4s', template: 'Feedback Request', readTime: '3m' },
  { id: 'MSG-009', timestamp: '2026-05-08 12:30', recipient: '+91-90987-65432', content: 'Your subscription renews tomorrow', status: 'Pending', deliveryTime: 'N/A', template: 'Payment Reminder', readTime: 'N/A' },
  { id: 'MSG-010', timestamp: '2026-05-08 10:15', recipient: '+91-89876-54321', content: 'Delayed order update: Shipping on May 10', status: 'Failed', deliveryTime: 'N/A', template: 'Shipping Update', readTime: 'N/A' },
];

export function WhatsAppIntegrationView() {
  const [activePage, setActivePage] = useState<'dashboard' | 'templates' | 'messages' | 'settings'>('dashboard');
  const [templateFilter, setTemplateFilter] = useState('All');
  const [businessName, setBusinessName] = useState('TechCorp Global Inc');
  const [phoneNumber, setPhoneNumber] = useState('+91-98765-43210');
  const [apiKey, setApiKey] = useState('••••••••••••••••');
  const [webhookUrl, setWebhookUrl] = useState('https://api.techcorp.com/whatsapp/webhook');
  const [accessToken, setAccessToken] = useState('••••••••••••••••');
  const [environment, setEnvironment] = useState('Production');
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [testResponse, setTestResponse] = useState<{ status: string; message: string } | null>(null);
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof MOCK_TEMPLATES[0] | null>(null);

  const handleCreateTemplate = () => {
    if (newTemplateName && newTemplateContent) {
      const newTemplate = {
        id: `TMPL-${String(templates.length + 1).padStart(3, '0')}`,
        name: newTemplateName,
        status: 'Draft' as const,
        lastModified: new Date().toISOString().split('T')[0],
        usageCount: 0,
        content: newTemplateContent,
        variables: (newTemplateContent.match(/{{(\w+)}}/g) || []).map(v => v.slice(2, -2))
      };
      setTemplates([newTemplate, ...templates]);
      setNewTemplateName('');
      setNewTemplateContent('');
      setShowNewTemplateForm(false);
      setTestResponse({ status: 'success', message: 'Template created successfully!' });
      setTimeout(() => setTestResponse(null), 3000);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    setTestResponse({ status: 'success', message: 'Template deleted successfully!' });
    setTimeout(() => setTestResponse(null), 3000);
  };

  const totalSent = 712;
  const totalDelivered = 689;
  const totalFailed = 23;
  const activeTemplates = templates.filter(t => t.status === 'Active').length;

  const getTemplateStatus = (status: string) => {
    return status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'Inactive' ? 'bg-slate-50 text-slate-600 border-slate-200' :
           'bg-amber-50 text-amber-700 border-amber-100';
  };

  const getMessageStatus = (status: string) => {
    return status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'Sent' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
           status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           'bg-rose-50 text-rose-700 border-rose-100';
  };

  const getMessageIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'Sent': return <Send size={12} />;
      case 'Pending': return <Clock size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  // PAGE 1: DASHBOARD
  if (activePage === 'dashboard') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">WhatsApp Integration Dashboard</h1>
            <p className="text-sm text-slate-500">Monitor WhatsApp messaging activity and configure integration.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('templates')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              <FileText size={16} /> Manage Templates
            </button>
          </div>
        </div>

        {/* Integration Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-3xl shadow-sm border",
            isConnected ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full animate-pulse",
                isConnected ? 'bg-emerald-500' : 'bg-rose-500'
              )}></div>
              <div>
                <h3 className={cn(
                  "text-sm font-bold",
                  isConnected ? 'text-emerald-700' : 'text-rose-700'
                )}>
                  Integration Status: {isConnected ? 'Connected' : 'Disconnected'}
                </h3>
                <p className={cn(
                  "text-xs",
                  isConnected ? 'text-emerald-600' : 'text-rose-600'
                )}>
                  Last sync: 2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsConnected(!isConnected)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  isConnected
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                )}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <StatCard icon={<MessageCircle size={24} />} value={totalSent} label="Messages Sent" color="indigo" trend="+12%" />
          <StatCard icon={<CheckCircle2 size={24} />} value={totalDelivered} label="Delivered" color="emerald" trend={`${Math.round((totalDelivered/totalSent)*100)}%`} />
          <StatCard icon={<AlertCircle size={24} />} value={totalFailed} label="Failed" color="rose" trend={`${Math.round((totalFailed/totalSent)*100)}%`} />
          <StatCard icon={<Activity size={24} />} value={activeTemplates} label="Active Templates" color="emerald" trend="Updated" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActivePage('messages')}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
          >
            <Send size={24} className="text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-1">View Messages</h3>
            <p className="text-xs text-slate-500">Monitor message delivery and status</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActivePage('templates')}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
          >
            <FileText size={24} className="text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-1">Message Templates</h3>
            <p className="text-xs text-slate-500">Create and manage templates</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActivePage('settings')}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
          >
            <Settings size={24} className="text-amber-600 mb-3" />
            <h3 className="font-bold text-slate-800 mb-1">Configuration</h3>
            <p className="text-xs text-slate-500">Update business settings</p>
          </motion.button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {MOCK_MESSAGES.slice(0, 5).map(msg => (
              <div key={msg.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-700">{msg.recipient}</p>
                  <p className="text-[10px] text-slate-500">{msg.timestamp}</p>
                </div>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                  getMessageStatus(msg.status)
                )}>
                  {getMessageIcon(msg.status)}
                  {msg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PAGE 2: TEMPLATES
  if (activePage === 'templates') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Message Templates</h1>
            <p className="text-sm text-slate-500">Create, manage, and deploy message templates.</p>
          </div>
          <button
            onClick={() => setShowNewTemplateForm(!showNewTemplateForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <Plus size={16} /> New Template
          </button>
        </div>

        <AnimatePresence>
          {showNewTemplateForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Create New Template</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Template Name</label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="e.g., Order Status Update"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Template Content</label>
                  <textarea
                    value={newTemplateContent}
                    onChange={(e) => setNewTemplateContent(e.target.value)}
                    placeholder='Use {{variable_name}} for dynamic content'
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-2">Use {'{{variable_name}}'} format for dynamic content</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateTemplate}
                    disabled={!newTemplateName || !newTemplateContent}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 disabled:bg-slate-300 transition-all shadow-lg shadow-emerald-200"
                  >
                    <Plus className="inline mr-2" size={16} /> Create Template
                  </button>
                  <button
                    onClick={() => setShowNewTemplateForm(false)}
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Templates Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'Active', 'Inactive', 'Draft'].map(f => (
                <button
                  key={f}
                  onClick={() => setTemplateFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ring-1 ring-inset",
                    templateFilter === f
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
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Usage</th>
                  <th className="px-6 py-4">Variables</th>
                  <th className="px-6 py-4">Modified</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {templates
                  .filter(t => templateFilter === 'All' || t.status === templateFilter)
                  .map((template) => (
                  <tr key={template.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-slate-500">{template.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-sm font-bold text-slate-700 block">{template.name}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-xs block">{template.content}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                        getTemplateStatus(template.status)
                      )}>
                        {template.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-indigo-600">{template.usageCount}x</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{template.variables.length} vars</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-500">{template.lastModified}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Details */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Template Preview</h3>
            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
              <p className="text-sm text-slate-700">{selectedTemplate.content}</p>
            </div>
            {selectedTemplate.variables.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Variables</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map(v => (
                    <span key={v} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  // PAGE 3: MESSAGES
  if (activePage === 'messages') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Message Activity</h1>
            <p className="text-sm text-slate-500">Monitor sent messages and delivery status.</p>
          </div>
          <button
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Home size={16} /> Back to Dashboard
          </button>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<Send size={20} />} value={totalSent} label="Total Sent" color="indigo" trend="this week" />
          <StatCard icon={<CheckCircle2 size={20} />} value={totalDelivered} label="Delivered" color="emerald" trend={`${Math.round((totalDelivered/totalSent)*100)}%`} />
          <StatCard icon={<AlertCircle size={20} />} value={totalFailed} label="Failed" color="rose" trend={`${Math.round((totalFailed/totalSent)*100)}%`} />
          <StatCard icon={<Clock size={20} />} value={MOCK_MESSAGES.filter(m => m.status === 'Pending').length} label="Pending" color="amber" trend="in queue" />
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Messages</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Template</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Delivery</th>
                  <th className="px-6 py-4">Read Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_MESSAGES.map((message) => (
                  <tr key={message.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-slate-500">{message.timestamp}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-700">{message.recipient}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600 max-w-xs truncate">{message.content}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{message.template}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                        getMessageStatus(message.status)
                      )}>
                        {getMessageIcon(message.status)}
                        {message.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-slate-500">{message.deliveryTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600">{message.readTime}</span>
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

  // PAGE 4: SETTINGS
  if (activePage === 'settings') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Configuration</h1>
            <p className="text-sm text-slate-500">Manage WhatsApp Business integration settings.</p>
          </div>
          <button
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Home size={16} /> Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Business Configuration</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">API Key</label>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Access Token</label>
                  <div className="relative">
                    <input
                      type={showToken ? "text" : "password"}
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    />
                    <button
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Webhook URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 block">Environment</label>
                <div className="flex gap-6">
                  {['Sandbox', 'Production'].map(env => (
                    <label key={env} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="environment"
                        value={env}
                        checked={environment === env}
                        onChange={(e) => setEnvironment(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-bold text-slate-700">{env}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button className="flex-1 px-4 py-2.5 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                  Save Configuration
                </button>
                <button className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Send Test Message */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Send Test Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Recipient</label>
                  <input
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+91-98765-43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Enter test message..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  onClick={() => {
                    if (testPhone && testMessage) {
                      setTestResponse({ status: 'success', message: `Test message sent to ${testPhone}` });
                      setTimeout(() => setTestResponse(null), 4000);
                      setTestMessage('');
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  <Send className="inline mr-2" size={16} /> Send Test
                </button>
              </div>

              <AnimatePresence>
                {testResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "mt-4 p-4 rounded-2xl text-sm font-bold",
                      testResponse.status === 'success'
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-rose-50 text-rose-700 border border-rose-100"
                    )}
                  >
                    {testResponse.status === 'success' ? <CheckCircle2 className="inline mr-2" size={16} /> : <AlertCircle className="inline mr-2" size={16} />}
                    {testResponse.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function StatCard({ icon, value, label, color, trend }: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber';
  trend: string;
}) {
  const colors = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
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
      <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
