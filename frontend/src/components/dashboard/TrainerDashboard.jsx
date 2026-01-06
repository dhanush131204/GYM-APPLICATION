import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loading from '../common/Loading';
import { FiUsers, FiActivity, FiTrendingUp, FiVideo, FiDollarSign, FiLayout, FiAlertCircle, FiSearch, FiMoreVertical, FiMail, FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import PlanManager from './PlanManager';
import MediaManager from './MediaManager';

const TrainerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await api.get('/trainer/members');
      setMembers(response.data);
    } catch (error) {
      toast.error('System synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  const StatCard = ({ title, value, subtext, icon: Icon, accentColor }) => (
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-premium transition-all hover:shadow-glow hover:-translate-y-1 font-sans group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 tabular-nums">{value}</h3>
          {subtext && <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] italic">{subtext}</p>}
        </div>
        <div className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all group-hover:scale-110 shadow-sm ${accentColor}`}>
          <Icon size={28} />
        </div>
      </div>
    </div>
  );

  const Overview = () => {
    const activeClients = members.filter(m => m.membership?.status === 'active').length;
    const totalEarnings = members.reduce((sum, m) => sum + (m.membership?.amount || 0), 0);
    const atRiskClients = members.filter(m => (m.gamification?.attendanceStreak || 0) === 0 && m.membership?.status === 'active');

    return (
      <div className="space-y-10 animate-fade-in font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard
            title="Managed Users"
            value={members.length}
            subtext={`${activeClients} ACTIVE DEPLOYMENTS`}
            icon={FiUsers}
            accentColor="text-primary-500"
          />
          <StatCard
            title="Fiscal Revenue"
            value={`$${totalEarnings.toLocaleString()}`}
            subtext="PROJECTED MONTHLY"
            icon={FiDollarSign}
            accentColor="text-emerald-500"
          />
          <StatCard
            title="Protocol Load"
            value={activeClients}
            subtext="UTILIZATION RATE 84%"
            icon={FiActivity}
            accentColor="text-blue-500"
          />
          <StatCard
            title="Risk Factor"
            value={atRiskClients.length}
            subtext="STAGNANT ACTIVITY"
            icon={FiAlertCircle}
            accentColor="text-amber-500"
          />
        </div>

        {atRiskClients.length > 0 && (
          <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/30 rounded-3xl p-8 flex items-start gap-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-2xl">
              <FiAlertCircle size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-amber-900 dark:text-amber-400 uppercase tracking-tight">Intervention Required</h4>
              <p className="text-sm text-amber-700 dark:text-amber-500/80 mt-2 leading-relaxed">
                Critical Alert: {atRiskClients.length} accounts show zero-streak activity.
                Immediate communication is advised to prevent churn.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'plans', title: 'Plan Architect', desc: 'Membership Tier Management', icon: FiDollarSign, color: 'primary' },
            { id: 'media', title: 'Content Sync', desc: 'Exercise Repository Management', icon: FiVideo, color: 'secondary' },
            { id: 'clients', title: 'User Index', desc: 'Protocol Lifecycle Tracking', icon: FiUsers, color: 'emerald' },
          ].map(action => (
            <button key={action.id} onClick={() => setActiveTab(action.id)} className="group p-10 bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:border-primary-500/50 transition-all text-left shadow-premium hover:shadow-premium-hover">
              <div className={`w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                <action.icon size={28} className={`text-primary-500`} />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-[0.15em]">{action.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase mt-3 tracking-widest leading-relaxed">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ClientsTable = () => (
    <div className="bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-premium overflow-hidden animate-fade-in font-sans">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Active Deployments</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Personnel Management Index</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            className="pl-12 pr-6 py-3 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-900/30 font-sans">
            <tr>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Client Identity</th>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Subscription Tier</th>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Protocol Stats</th>
              <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Channel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">Registry Empty / No Active Links</td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 text-xs text-sans">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</div>
                        <div className="text-xs font-bold text-slate-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="badge bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                      Operational
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                      {member.membership?.planType || 'UNASSIGNED'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${(member.gamification?.attendanceStreak || 0) > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase">{member.gamification?.attendanceStreak || 0} DAY STREAK</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setSelectedClient(member)}
                      className="p-2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl"
                    >
                      <FiChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Header Suite */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10 border-b border-slate-100 dark:border-slate-800 pb-12">
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-500 text-xs font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-glow border border-primary-100 dark:border-primary-800/50">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" /> EXECUTIVE MGMT SUITE
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Executive <span className="text-primary-500">Operations.</span></h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400 mt-6 max-w-2xl leading-relaxed uppercase tracking-widest">Master authority portal for client synchronization and system architectural oversight.</p>
        </div>

        <div className="flex space-x-3 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
          {[
            { id: 'overview', icon: FiLayout, label: 'INSIGHTS' },
            { id: 'clients', icon: FiUsers, label: 'REGISTRY' },
            { id: 'plans', icon: FiDollarSign, label: 'TIERS' },
            { id: 'media', icon: FiVideo, label: 'CONTENT' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-10 py-5 rounded-[1.25rem] text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-primary-500 hover:bg-white dark:hover:bg-slate-800'
                }`}
            >
              <tab.icon className="mr-3 w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'clients' && <ClientsTable />}
        {activeTab === 'plans' && <PlanManager />}
        {activeTab === 'media' && <MediaManager />}
      </div>

      {selectedClient && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white dark:bg-[#111214] rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-10 shadow-2xl relative overflow-hidden">

            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-3xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-black text-2xl">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedClient.name}</h2>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{selectedClient.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-slate-300 hover:text-slate-600 transition-colors text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Live Streak</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{selectedClient.gamification?.attendanceStreak || 0} <span className="text-xs font-bold text-slate-400 uppercase">Days</span></p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Access Level</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{selectedClient.gamification?.level || 1}</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={async () => {
                  const note = window.prompt("SECURE CHANNEL: Send direct message to client registry", "Report synchronization complete.");
                  if (!note) return;

                  try {
                    await api.post('/trainer/message', {
                      userId: selectedClient._id,
                      message: note
                    });
                    toast.success("CHANNEL SYNC SUCCESSFUL");
                  } catch (err) {
                    toast.error("CHANNEL COMMUNICATION FAILURE");
                  }
                }}
                className="w-full py-5 text-xs font-black uppercase bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:opacity-90 transition-all tracking-[0.2em] flex items-center justify-center gap-3"
              >
                <FiMessageSquare /> SEND DIRECTIVE
              </button>

              <button
                onClick={() => setSelectedClient(null)}
                className="w-full py-5 text-xs font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                TERMINATE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
