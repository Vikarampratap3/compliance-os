import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Send,
  Activity,
  Eye,
  EyeOff,
  BarChart2,
  Settings,
  FileText,
  Search,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../../lib/utils';

const MOCK_SMS_LOGS = [
  { id: 'SMS-001', timestamp: '2026-05-09 15:45', phone: '+91-98765-43210', message: 'Your OTP is 345678. Valid for 10 minutes.', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-002', timestamp: '2026-05-09 15:12', phone: '+91-97654-32109', message: 'Order confirmation: ORD-2541 is confirmed', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-003', timestamp: '2026-05-09 14:30', phone: '+91-96543-21098', message: 'Payment received. Thank you for your business!', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-004', timestamp: '2026-05-09 13:58', phone: '+91-95432-10987', message: 'Your appointment is confirmed for 10:00 AM', provider: 'Twilio', status: 'Failed' },
  { id: 'SMS-005', timestamp: '2026-05-09 13:15', phone: '+91-94321-09876', message: 'Password reset link: https://app.com/reset/xyz', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-006', timestamp: '2026-05-09 12:40', phone: '+91-93210-98765', message: 'Shipment tracking: Your package is out for delivery', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-007', timestamp: '2026-05-09 11:22', phone: '+91-92109-87654', message: 'Subscription reminder: Renew before May 15', provider: 'Twilio', status: 'Pending' },
  { id: 'SMS-008', timestamp: '2026-05-09 10:05', phone: '+91-91098-76543', message: 'We value your feedback. Take a quick survey.', provider: 'Twilio', status: 'Delivered' },
  { id: 'SMS-009', timestamp: '2026-05-08 16:30', phone: '+91-90987-65432', message: 'Your account has 1 failed login attempt.', provider: 'Twilio', status: 'Failed' },
  { id: 'SMS-010', timestamp: '2026-05-08 15:15', phone: '+91-89876-54321', message: 'Promotional offer: 20% off on all items today', provider: 'Twilio', status: 'Delivered' },
];

const MOCK_DELIVERY_REPORT = [
  { date: '2026-05-03', totalSent: 287, delivered: 283, pending: 2, failed: 2 },
  { date: '2026-05-04', totalSent: 312, delivered: 306, pending: 3, failed: 3 },
  { date: '2026-05-05', totalSent: 295, delivered: 290, pending: 1, failed: 4 },
  { date: '2026-05-06', totalSent: 318, delivered: 314, pending: 2, failed: 2 },
  { date: '2026-05-07', totalSent: 325, delivered: 321, pending: 2, failed: 2 },
  { date: '2026-05-08', totalSent: 289, delivered: 283, pending: 3, failed: 3 },
  { date: '2026-05-09', totalSent: 264, delivered: 258, pending: 4, failed: 2 },
];

export function SMSIntegrationView() {
  const [activePage, setActivePage] = useState<'dashboard' | 'logs' | 'delivery' | 'settings'>('dashboard');
  const [provider, setProvider] = useState('Twilio');
  const [senderId, setSenderId] = useState('TECHCORP');
  const [apiKey, setApiKey] = useState('••••••••••••••••');
  const [apiSecret, setApiSecret] = useState('••••••••••••••••');
  const [callbackUrl, setCallbackUrl] = useState('https://api.techcorp.com/sms/callback');
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [testResponse, setTestResponse] = useState<{ status: string; message: string } | null>(null);
  const [searchLogs, setSearchLogs] = useState('');

  const totalSent = 2090;
  const totalDelivered = 2038;
  const totalPending = 17;
  const totalFailed = 18;

  const getSMSStatus = (status: string) => {
    return status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
           status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
           'bg-rose-50 text-rose-700 border-rose-100';
  };

  const getSMSIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'Pending': return <Clock size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  const filteredLogs = MOCK_SMS_LOGS.filter(log =>
    log.phone.includes(searchLogs) || log.message.toLowerCase().includes(searchLogs.toLowerCase())
  );

  const chartData = [
    { name: '2026-05-03', sent: 287, delivered: 283, failed: 2 },
    { name: '2026-05-04', sent: 312, delivered: 306, failed: 3 },
    { name: '2026-05-05', sent: 295, delivered: 290, failed: 4 },
    { name: '2026-05-06', sent: 318, delivered: 314, failed: 2 },
    { name: '2026-05-07', sent: 325, delivered: 321, failed: 2 },
    { name: '2026-05-08', sent: 289, delivered: 283, failed: 3 },
    { name: '2026-05-09', sent: 264, delivered: 258, failed: 2 },
  ];

  const statusPieData = [
    { name: 'Delivered', value: 2038, fill: '#10b981' },
    { name: 'Pending', value: 17, fill: '#f59e0b' },
    { name: 'Failed', value: 18, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">SMS Integration</h1>
          <p className="text-sm text-slate-500">Configure SMS provider settings, delivery tracking, and send test messages.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Page Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-0">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'logs', label: 'SMS Logs', icon: FileText },
          { id: 'delivery', label: 'Delivery Reports', icon: BarChart2 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap",
                activePage === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              )}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Provider Status Card */}
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
                SMS Provider: {provider} ({isConnected ? 'Connected' : 'Disconnected'})
              </h3>
              <p className={cn(
                "text-xs",
                isConnected ? 'text-emerald-600' : 'text-rose-600'
              )}>
                Last sync: 1 minute ago
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

      {/* Dashboard Page */}
      {activePage === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <StatCard icon={<MessageSquare size={24} />} value={totalSent} label="SMS Sent" color="indigo" trend="+8%" />
            <StatCard icon={<CheckCircle2 size={24} />} value={totalDelivered} label="Delivered" color="emerald" trend={`${Math.round((totalDelivered/totalSent)*100)}%`} />
          </div>
          <div className="space-y-6">
            <StatCard icon={<Clock size={24} />} value={totalPending} label="Pending" color="amber" trend={`${Math.round((totalPending/totalSent)*100)}%`} />
            <StatCard icon={<AlertCircle size={24} />} value={totalFailed} label="Failed" color="rose" trend={`${Math.round((totalFailed/totalSent)*100)}%`} />
          </div>
        </div>
      )}

      {/* SMS Logs Page */}
      {activePage === 'logs' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex gap-4 bg-slate-50/50">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by phone or message..."
                value={searchLogs}
                onChange={(e) => setSearchLogs(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4"><span className="text-xs font-bold text-slate-600">{log.timestamp}</span></td>
                    <td className="px-6 py-4"><span className="text-xs text-slate-700">{log.phone}</span></td>
                    <td className="px-6 py-4"><span className="text-xs text-slate-600 truncate max-w-xs">{log.message}</span></td>
                    <td className="px-6 py-4"><span className="text-xs text-slate-600">{log.provider}</span></td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border", getSMSStatus(log.status))}>
                        {getSMSIcon(log.status)} {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delivery Reports Page */}
      {activePage === 'delivery' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<MessageSquare size={24} />} value={totalSent} label="Total SMS Sent" color="indigo" trend="+2%" />
            <StatCard icon={<CheckCircle2 size={24} />} value={totalDelivered} label="Delivered" color="emerald" trend={`${Math.round((totalDelivered/totalSent)*100)}%`} />
            <StatCard icon={<AlertCircle size={24} />} value={totalFailed} label="Failed" color="rose" trend={`${Math.round((totalFailed/totalSent)*100)}%`} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-6">SMS Trend (7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="delivered" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-6">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {statusPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      )}

      {/* Settings Page */}
      {activePage === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Provider Configuration</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Provider</label>
                    <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all">
                      <option>Twilio</option>
                      <option>Nexmo/Vonage</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Sender ID</label>
                    <input type="text" value={senderId} onChange={(e) => setSenderId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">API Key</label>
                  <div className="relative">
                    <input type={showApiKey ? "text" : "password"} value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none" />
                    <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">Save</button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Send Test SMS</h3>
              <div className="space-y-4">
                <input type="tel" value={testPhone} onChange={(e) => setTestPhone(e.target.value)} placeholder="+91-XXXXX-XXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
                <textarea value={testMessage} onChange={(e) => setTestMessage(e.target.value.slice(0, 160))} placeholder="Message (160 chars max)" rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" />
                <div className="text-xs text-slate-500">{testMessage.length}/160 characters</div>
                <button onClick={() => { if (testPhone && testMessage) { setTestResponse({ status: 'success', message: `SMS sent to ${testPhone}` }); setTimeout(() => setTestResponse(null), 3000); setTestMessage(''); } }} className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:bg-slate-300" disabled={!testPhone || !testMessage}>
                  <Send size={16} className="inline mr-2" /> Send Test SMS
                </button>
                <AnimatePresence>
                  {testResponse && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("p-4 rounded-2xl text-sm font-bold", testResponse.status === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700")}>
                      {testResponse.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <StatCard icon={<MessageSquare size={24} />} value={totalSent} label="SMS Sent" color="indigo" trend="+8%" />
            <StatCard icon={<CheckCircle2 size={24} />} value={totalDelivered} label="Delivered" color="emerald" trend={`${Math.round((totalDelivered/totalSent)*100)}%`} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, color, trend }: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
  trend: string;
}) {
  const colors = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn(colors[color].bg, "p-6 rounded-3xl border border-slate-100")}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(colors[color].icon, "p-3 bg-white rounded-2xl")}>{icon}</div>
        <span className={cn(colors[color].badge, "text-xs font-bold px-2.5 py-1 rounded-lg")}>{trend}</span>
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
