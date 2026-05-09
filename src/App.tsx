/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  ClipboardCheck,
  Timer,
  MessageSquare,
  BarChart2,
  RefreshCw,
  Calendar as CalendarIcon,
  Bell,
  Settings,
  Globe,
  ChevronDown,
  Search,
  User,
  Users,
  CheckCircle,
  Menu,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Components
import { ParentZoneView } from './components/os/ParentZoneView';
import { DashboardTasksView } from './components/os/DashboardTasksView';
import { ComplianceMasterView } from './components/os/ComplianceMasterView';
import { RiskRegistersView } from './components/os/RiskRegistersView';
import { MyProfileView } from './components/os/MyProfileView';
import { DocumentControlView } from './components/os/DocumentControlView';
import { AssetRegisterView } from './components/os/AssetRegisterView';
import { CAPAManagerView } from './components/os/CAPAManagerView';
import { AccessRecertificationView } from './components/os/AccessRecertificationView';
import { ChangeManagementView } from './components/os/ChangeManagementView';
import { ProblemManagementView } from './components/os/ProblemManagementView';
import { PlaceholderView } from './components/os/PlaceholderView';
import { WhatsAppIntegrationView } from './components/os/WhatsAppIntegrationView';
import { SMSIntegrationView } from './components/os/SMSIntegrationView';
import { StopwatchView } from './components/os/StopwatchView';
import { TimeEntriesView } from './components/os/TimeEntriesView';
import { LogTicketView } from './components/os/LogTicketView';
import { ActiveQueueView } from './components/os/ActiveQueueView';
import { StandardReportsView } from './components/os/StandardReportsView';
import { CustomReportBuilderView } from './components/os/CustomReportBuilderView';
import { InternalAuditsView } from './components/os/InternalAuditsView';
import { PolicyLibraryView } from './components/os/PolicyLibraryView';
import { ComplianceAssistant } from './components/ComplianceAssistant';

// OS Navigation Data
const APPS = [
  { id: 'parent', label: 'Parent Zone (Config)', icon: Settings, submenus: ['System Deployment Config'] },
  { id: 'home', label: 'Operations Dashboard', icon: LayoutDashboard, submenus: ['My Tasks Overview'] },
  { id: 'compliance', label: 'Compliance Core', icon: ShieldCheck, submenus: ['Compliance Master', 'Document Control', 'CAPA Manager', 'Access Recertification', 'Policy Library'] },
  { id: 'audit', label: 'Audit & Risk', icon: ClipboardCheck, submenus: ['Risk Registers', 'Asset Register', 'Internal Audits'] },
  { id: 'service', label: 'Service Mgmt', icon: RefreshCw, submenus: ['Change Management', 'Problem Management'] },
  { id: 'integrations', label: 'External App Integration', icon: MessageCircle, submenus: ['WhatsApp Integration', 'SMS Integration'] },
  { id: 'timetracking', label: 'Time Tracking', icon: Timer, submenus: ['Stopwatch', 'Time Entries'] },
  { id: 'support', label: 'Ticketing (IRMS)', icon: MessageSquare, submenus: ['Log a Ticket', 'Active Queue'] },
  { id: 'reports', label: 'Reports Hub', icon: BarChart2, submenus: ['Standard Reports', 'Custom Report Builder'] },
];

export default function App() {
  const [activeApp, setActiveApp] = useState('parent');
  const [activeSubMenu, setActiveSubMenu] = useState('System Deployment Config');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeZone, setActiveZone] = useState('Global HQ (Master)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigateTo = (appId: string, submenu: string) => {
    setActiveApp(appId);
    setActiveSubMenu(submenu);
  };

  const handleAppChange = (appId: string) => {
    setActiveApp(appId);
    const appData = APPS.find(a => a.id === appId);
    if (appData) {
      setActiveSubMenu(appData.submenus[0]);
    }
  };

  const currentApp = APPS.find(app => app.id === activeApp) || { label: 'System Profile' };

  const renderContent = () => {
    switch (activeSubMenu) {
      case 'System Deployment Config': return <ParentZoneView />;
      case 'My Tasks Overview': return <DashboardTasksView navigateTo={navigateTo} />;
      case 'Compliance Master': return <ComplianceMasterView />;
      case 'Document Control': return <DocumentControlView />;
      case 'CAPA Manager': return <CAPAManagerView />;
      case 'Access Recertification': return <AccessRecertificationView />;
      case 'Risk Registers': return <RiskRegistersView />;
      case 'Asset Register': return <AssetRegisterView />;
      case 'Change Management': return <ChangeManagementView />;
      case 'Problem Management': return <ProblemManagementView />;
      case 'WhatsApp Integration': return <WhatsAppIntegrationView />;
      case 'SMS Integration': return <SMSIntegrationView />;
      case 'Stopwatch': return <StopwatchView />;
      case 'Time Entries': return <TimeEntriesView />;
      case 'Log a Ticket': return <LogTicketView />;
      case 'Active Queue': return <ActiveQueueView />;
      case 'Standard Reports': return <StandardReportsView />;
      case 'Custom Report Builder': return <CustomReportBuilderView />;
      case 'Internal Audits': return <InternalAuditsView />;
      case 'Policy Library': return <PolicyLibraryView />;
      case 'My Profile': return <MyProfileView />;
      default: return <PlaceholderView title={currentApp.label} submenu={activeSubMenu} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-700 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto z-30 shadow-sm"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-sm font-bold text-slate-800 leading-tight">Compliance OS</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Universal GRC</p>
              </motion.div>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-100 rounded text-slate-400"
          >
            <Menu size={16} />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto overflow-x-hidden">
          {APPS.map((app) => (
            <div key={app.id}>
              <button
                onClick={() => handleAppChange(app.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm rounded-xl transition-all flex items-center gap-3 group relative",
                  activeApp === app.id 
                    ? 'bg-emerald-50 text-emerald-700 font-medium' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                )}
              >
                <app.icon size={18} className={cn(
                  "shrink-0 transition-transform group-hover:scale-110",
                  activeApp === app.id ? 'text-emerald-500' : 'text-slate-400'
                )} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                    {app.label}
                  </motion.span>
                )}
                {activeApp === app.id && (
                  <motion.div layoutId="navIndicator" className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full" />
                )}
              </button>
              
              {isSidebarOpen && activeApp === app.id && (
                <div className="ml-7 mt-1 space-y-0.5 border-l-2 border-slate-100 pl-3">
                  {app.submenus.map((submenu) => (
                    <button
                      key={submenu}
                      onClick={() => setActiveSubMenu(submenu)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 text-xs rounded-lg transition-all",
                        activeSubMenu === submenu 
                          ? 'bg-emerald-100 text-emerald-700 font-medium' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      )}
                    >
                      {submenu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 flex flex-col items-center gap-1">
          {isSidebarOpen && (
            <div className="flex flex-col items-center gap-1 opacity-60">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest text-center">Version 5.2.0-PRO</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle size={10}/> ISO Certified</span>
            </div>
          )}
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-20">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">{activeSubMenu}</h2>
            <div className="flex items-center gap-1 text-xs text-slate-400">
               <span>{currentApp?.label}</span>
               <span className="opacity-30">/</span>
               <span className="text-emerald-500 font-medium">{activeZone}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search global records..." 
                className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-64 transition-all"
              />
            </div>
            
            <button className="relative text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1" />

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-xl transition-all"
              >
                <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Globe size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 hidden md:block uppercase tracking-tight">{activeZone}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 ring-1 ring-black/5"
                  >
                     <div className="px-4 py-2 border-b border-slate-100">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Workspace context</p>
                       {['Global HQ (Master)', 'APAC Region', 'EMEA Region'].map(zone => (
                         <button 
                          key={zone}
                          onClick={() => { setActiveZone(zone); setIsProfileOpen(false); }} 
                          className={cn(
                            "block w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors",
                            activeZone === zone ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                          )}
                         >
                           {zone}
                         </button>
                       ))}
                     </div>
                     <div className="px-2 py-2 flex flex-col gap-0.5">
                       <button onClick={() => { navigateTo('profile', 'My Profile'); setIsProfileOpen(false); }} className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition"><User size={14}/> My Profile</button>
                       <button className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition"><ShieldCheck size={14}/> Admin Classification</button>
                       <button className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition text-rose-600"><RefreshCw size={14}/> Sign Out</button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              onClick={() => navigateTo('profile', 'My Profile')}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-all ring-padding ring-2 ring-transparent hover:ring-indigo-200"
            >
              AD
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeSubMenu}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.2 }}
               className="h-full"
             >
                {renderContent()}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>

      <ComplianceAssistant />
    </div>
  );
}


