import React, { useState } from 'react';
import { 
  User, 
  Laptop, 
  Bell, 
  ShieldCheck, 
  Fingerprint, 
  Key, 
  Settings, 
  LogOut, 
  Activity, 
  History, 
  ShieldAlert, 
  Globe, 
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function MyProfileView() {
  const [activeTab, setActiveTab] = useState('Details');

  const tabs = [
    { id: 'Details', icon: User, label: 'Identity Profile' },
    { id: 'Sessions', icon: Laptop, label: 'Kernel Sessions' },
    { id: 'Notifications', icon: Bell, label: 'Alert Config' },
    { id: 'Security', icon: ShieldCheck, label: 'MFA & SSO Setup' },
  ];

  const activeSessions = [
    { device: 'macOS Chrome 124.0', location: 'San Francisco, CA', lastActive: 'Currently Active', current: true },
    { device: 'iPhone 15 Pro Max', location: 'Singapore Hub', lastActive: '2 hours ago', current: false },
  ];

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
           <div className="flex items-center gap-4 mb-8 px-2">
             <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-indigo-50">JD</div>
             <div>
               <h3 className="text-sm font-bold text-slate-800">Johnathan Doe</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Master Admin</p>
             </div>
           </div>

           <nav className="space-y-1">
             {tabs.map(tab => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all transition-colors",
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                )}
               >
                 <tab.icon size={18} />
                 {tab.label}
               </button>
             ))}
           </nav>

           <div className="mt-12 pt-6 border-t border-slate-100 px-2 space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-1">Clearance Tier</p>
                <div className="flex items-center justify-between">
                   <span className="text-xs font-black text-emerald-800 uppercase tracking-tighter italic">Lvl 10 - Elite</span>
                   <ShieldCheck size={14} className="text-emerald-500" />
                </div>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <LogOut size={16} /> 
                System Logout
              </button>
           </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
           <AnimatePresence mode="wait">
             {activeTab === 'Details' && (
               <motion.div key="Details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                     <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center justify-between">
                       Core Identity Credentials
                       <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Edit Details</button>
                     </h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Identity</label>
                           <p className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 uppercase tracking-tight">Johnathan Pratap Doe</p>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Workspace Email</label>
                           <p className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700">john.doe@complianceos.io</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}

             {activeTab === 'Sessions' && (
               <motion.div key="Sessions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                     <div className="relative z-10">
                        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
                           Session Audit <Activity size={24} className="text-emerald-400" />
                        </h2>
                     </div>
                     <History size={160} className="absolute -bottom-10 -right-10 opacity-5 text-emerald-400 rotate-12" />
                  </div>
                  {activeSessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                      <div className="flex items-center gap-4">
                        <Laptop size={24} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{session.device}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{session.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
               </motion.div>
             )}

             {activeTab === 'Security' && (
               <motion.div key="Security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                     <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-6">
                        <ShieldCheck size={24} className="text-indigo-600 inline mr-2" /> Enterprise Authentication
                     </h2>
                     <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                        <div>
                           <h4 className="font-bold text-slate-800 text-sm tracking-tight uppercase">Single Sign-On (SSO)</h4>
                           <p className="text-xs text-slate-500">Managed via Federated Azure AD / Okta.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-indigo-100 uppercase text-[10px] font-black text-emerald-600">Active</div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-6 border border-slate-200 rounded-2xl hover:border-emerald-300 transition-all cursor-pointer">
                           <Fingerprint size={24} className="text-emerald-500 mb-2" />
                           <h4 className="font-bold text-sm uppercase">Biometric Verification</h4>
                           <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">Passkeys via WebAuthn</p>
                        </div>
                        <div className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all cursor-pointer">
                           <Key size={24} className="text-indigo-500 mb-2" />
                           <h4 className="font-bold text-sm uppercase">Standard Two-Step (TOTP)</h4>
                           <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">Authenticator App</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
