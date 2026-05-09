import React, { useState } from 'react';
import { 
  Zap, 
  Globe, 
  ChevronLeft, 
  ArrowRight, 
  Server, 
  Settings, 
  Activity, 
  Landmark, 
  Lock, 
  CheckSquare, 
  Save, 
  Plus, 
  CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function ParentZoneView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('Technology & SaaS');
  const [masterAccountId, setMasterAccountId] = useState('ACC-001');
  const [isDeploying, setIsDeploying] = useState(false);

  const [roles, setRoles] = useState([
    { id: 1, role: 'Global Super Admin', class: 'Tier 1 - Master', access: 'All System Kernels & Modules' },
    { id: 2, role: 'Zone Admin (Regional)', class: 'Tier 2 - Regional', access: 'Compliance, Ticketing, Dashboard' },
  ]);

  const [modules, setModules] = useState([
    { name: 'Immutable Audit Logs', desc: 'Cryptographic system-wide activity tracking', active: true, locked: true },
    { name: 'Core Compliance Master', desc: 'Central tracking of tasks and certificates', active: true, locked: true },
    { name: 'IRMS Support Ticketing', desc: 'Multi-tier issue resolution and CAPA intake', active: true, locked: true },
    { name: 'Dashboard & Analytics (AID)', desc: 'Real-time GRC metrics and data warehousing', active: true, locked: true },
    { name: 'Information Security Mgmt', desc: 'IT security control mapping & testing', active: true, locked: false },
    { name: 'Quality Management (QMS)', desc: 'Quality processes & Document Control', active: true, locked: false },
    { name: 'Time Tracking Service', desc: 'Track work hours on compliance activities', active: true, locked: false },
  ]);

  const industries = [
    { id: 'Technology & SaaS', icon: Server, desc: 'Privacy, Cloud Security' },
    { id: 'Manufacturing', icon: Settings, desc: 'Quality Control, Supply Chain' },
    { id: 'Healthcare', icon: Activity, desc: 'Patient Privacy, Medical Records' },
    { id: 'Financial', icon: Landmark, desc: 'AML, KYC, SEC Regulations' },
  ];

  const handleToggleModule = (index: number) => {
    if (modules[index].locked) return;
    setModules(prev => prev.map((mod, i) => i === index ? { ...mod, active: !mod.active } : mod));
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert("Deployment configuration applied. System kernels initialized.");
      setCurrentStep(1);
    }, 2500);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-20">
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
          <Zap size={10} /> Configuration Wizard
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Deployment Engine</h1>
        <p className="text-slate-500 mt-2 max-w-3xl">Architect the core governance structure by provisioning modules, defining primary account sharding, and establishing admin access tiers.</p>
      </div>

      {/* Stepper */}
      <div className="flex gap-4">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex-1">
            <div className={cn(
              "p-4 rounded-2xl border-2 transition-all",
              currentStep === step ? 'bg-white border-emerald-500 shadow-md ring-4 ring-emerald-500/5' : currentStep > step ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-slate-50 border-slate-200 opacity-40'
            )}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  currentStep >= step ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
                )}>
                  {currentStep > step ? <CheckCircle2 size={14}/> : step}
                </div>
                <span className="text-sm font-bold">Step {step}</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">
                {step === 1 ? 'Global Alignment' : step === 2 ? 'Module Provisioning' : 'Role Distribution'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Globe size={20} className="text-emerald-500"/> Root Tenant Identifier</h2>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Master Account ID (CID)</label>
                  <input 
                    type="text" 
                    value={masterAccountId} 
                    onChange={e => setMasterAccountId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-emerald-900 font-mono font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {industries.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 text-center transition-all group",
                    selectedIndustry === ind.id ? 'bg-white border-emerald-500 shadow-lg -translate-y-1' : 'bg-slate-50 border-transparent hover:border-slate-200'
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors",
                    selectedIndustry === ind.id ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 group-hover:text-slate-600 shadow-sm'
                  )}>
                    <ind.icon size={24} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 mb-1">{ind.id}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight uppercase font-bold tracking-tighter">{ind.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-8 border-t border-slate-100">
               <button onClick={() => setCurrentStep(2)} className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
                 Continue to Modules <ArrowRight size={18}/>
               </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod, i) => (
                <div key={i} className={cn(
                  "p-5 rounded-3xl border transition-all flex items-start gap-4",
                  mod.active ? 'bg-white border-emerald-200 shadow-sm' : 'bg-slate-50 border-slate-100'
                )}>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    mod.active ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-300'
                  )}>
                    {mod.locked ? <Lock size={18}/> : mod.active ? <CheckSquare size={18}/> : <Plus size={18}/>}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">{mod.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{mod.desc}</p>
                    {!mod.locked && (
                      <button 
                        onClick={() => handleToggleModule(i)}
                        className={cn(
                          "mt-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors",
                          mod.active ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        )}
                      >
                        {mod.active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-8 border-t border-slate-100">
               <button onClick={() => setCurrentStep(1)} className="px-6 py-3.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-all"><ChevronLeft size={18} className="inline mr-2"/> Back</button>
               <button onClick={() => setCurrentStep(3)} className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2">Protocol Access Mapping <ArrowRight size={18}/></button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Defined Access Tier</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Module Visibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roles.map(role => (
                    <tr key={role.id}>
                      <td className="px-6 py-4 font-bold text-slate-700">{role.role}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-[10px] font-bold px-2.5 py-1 rounded-lg text-slate-600">{role.class}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{role.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2">
                   <Plus size={14}/> Provision Additional Administrator
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100">
               <button onClick={() => setCurrentStep(2)} className="px-6 py-3.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-all">Back</button>
               <button 
                onClick={handleDeploy}
                className="px-8 py-3.5 bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold rounded-xl shadow-lg ring-4 ring-emerald-500/10 hover:shadow-emerald-200 transition-all flex items-center gap-2"
               >
                 {isDeploying ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save size={18}/>}
                 {isDeploying ? 'Synthesizing Kernels...' : 'Deploy OS Architecture'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
