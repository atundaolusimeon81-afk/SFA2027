import { useState } from 'react';
import { SQUAD_PERFORMANCE_DATA, PlayerTelemetry, ActiveInjury } from '../../data/performanceData';
import { BodyMapScanner } from './BodyMapScanner';
import { PlayerDossierTelemetry } from './PlayerDossierTelemetry';
import { RehabTracker } from './RehabTracker';
import { WorkloadPeriodization } from './WorkloadPeriodization';
import { LogMedicalModal } from './LogMedicalModal';
import { InjuryTrendsChart } from './InjuryTrendsChart';
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  Heart, 
  TrendingUp, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  Award,
  Layers,
  FilePlus,
  RefreshCw,
  BarChart3
} from 'lucide-react';

interface PerformanceHubProps {
  onBackToPortal: () => void;
}

export function PerformanceHub({ onBackToPortal }: PerformanceHubProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'bodymap' | 'dossier' | 'rehab' | 'periodization'>('overview');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(SQUAD_PERFORMANCE_DATA[0].playerId);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [modalPreselectedRegion, setModalPreselectedRegion] = useState<string | undefined>(undefined);
  const [squadData, setSquadData] = useState<PlayerTelemetry[]>(SQUAD_PERFORMANCE_DATA);

  // Quick stats
  const totalCount = squadData.length;
  const fitCount = squadData.filter((p) => p.status === 'fit').length;
  const modifiedCount = squadData.filter((p) => p.status === 'modified').length;
  const highRiskCount = squadData.filter((p) => p.status === 'high_risk').length;
  const injuredCount = squadData.filter((p) => p.status === 'injured').length;
  const avgReadiness = Math.round(squadData.reduce((sum, p) => sum + p.readinessScore, 0) / totalCount);

  // Filtered players for Overview tab
  const filteredSquad = squadData.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || String(p.number).includes(q) || p.position.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenReportModal = (region?: string) => {
    setModalPreselectedRegion(region);
    setIsReportModalOpen(true);
  };

  const handleSaveInjury = (newInjury: ActiveInjury) => {
    setSquadData((prev) =>
      prev.map((player) => {
        if (player.playerId === newInjury.playerId) {
          return {
            ...player,
            status: 'injured',
            statusReason: `${newInjury.injuryName} sustained. In Phase 1 Rehabilitation.`,
            activeInjury: newInjury,
            injuryRiskScore: 90,
          };
        }
        return player;
      })
    );
  };

  const handleSelectPlayerFromCard = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setActiveTab('dossier');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      
      {/* Top Banner Ribbon (White, Green, and Black) */}
      <div className="bg-gradient-to-r from-black via-neutral-950 to-emerald-950/80 border-b border-emerald-500/30 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simolat Medical & Performance Intelligence System</span>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-300">UEFA Medical Committee Approved Telemetry</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenReportModal()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[11px] transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Log Clinical Incident</span>
            </button>

            <button
              onClick={onBackToPortal}
              className="text-xs text-neutral-300 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Club Public Site</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Hub Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Sports Science & High Performance Division</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white font-heading mt-1 uppercase tracking-tight">
              Player Performance & Injury Monitoring
            </h1>
            <p className="text-sm text-neutral-300 mt-2 max-w-2xl">
              Live biometric tracking, GPS velocity diagnostics, acute:chronic workload ratios (ACWR), and clinical rehabilitation protocols for Simolat Sporting FC.
            </p>
          </div>

          {/* Quick Hub Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-black rounded-2xl border border-emerald-500/30">
            {[
              { id: 'overview', label: 'Squad Matrix', icon: Layers },
              { id: 'trends', label: 'Injury Trends', icon: BarChart3 },
              { id: 'bodymap', label: 'Anatomy Scanner', icon: Activity },
              { id: 'dossier', label: 'Player Dossier', icon: Zap },
              { id: 'rehab', label: 'Rehab & RTP', icon: CheckCircle2 },
              { id: 'periodization', label: 'ACWR & Workload', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Live Telemetry Stat Banners (White, Green, and Black) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Squad Availability</span>
            <div className="text-2xl font-black text-emerald-400 font-heading mt-0.5">
              {Math.round((fitCount / totalCount) * 100)}%
            </div>
            <span className="text-[10px] text-neutral-400">{fitCount} of {totalCount} Cleared</span>
          </div>

          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Mean Readiness</span>
            <div className="text-2xl font-black text-white font-heading mt-0.5">
              {avgReadiness}%
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Optimal Recovery</span>
          </div>

          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Modified Load</span>
            <div className="text-2xl font-black text-emerald-300 font-heading mt-0.5">
              {modifiedCount} Players
            </div>
            <span className="text-[10px] text-neutral-400">Capped Minutes</span>
          </div>

          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">High Risk Alert</span>
            <div className="text-2xl font-black text-amber-400 font-heading mt-0.5">
              {highRiskCount} Flag
            </div>
            <span className="text-[10px] text-amber-400">Victor Amadi</span>
          </div>

          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Active Rehab (RTP)</span>
            <div className="text-2xl font-black text-red-400 font-heading mt-0.5">
              {injuredCount} Sidelined
            </div>
            <span className="text-[10px] text-neutral-400">Vane & Hernandez</span>
          </div>

          <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Max Peak Sprint</span>
            <div className="text-2xl font-black text-emerald-400 font-heading mt-0.5">
              35.8 <span className="text-xs font-normal text-neutral-400">km/h</span>
            </div>
            <span className="text-[10px] text-neutral-400">V. Amadi (FW)</span>
          </div>

        </div>

        {/* TAB 1: SQUAD OVERVIEW MATRIX */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Speed & Workload Leaderboards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Peak Sprint Velocity Leaderboard */}
              <div className="bg-black p-6 rounded-3xl border-2 border-emerald-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Top Sprint Velocity Leaderboard</span>
                  </div>
                  <span className="text-xs text-neutral-500">Matchday Peak (km/h)</span>
                </div>

                <div className="space-y-2.5">
                  {[...squadData]
                    .sort((a, b) => b.topSpeedKmh - a.topSpeedKmh)
                    .slice(0, 4)
                    .map((p, idx) => (
                      <div
                        key={p.playerId}
                        onClick={() => handleSelectPlayerFromCard(p.playerId)}
                        className="p-3 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-heading font-black text-xs ${
                            idx === 0 ? 'bg-emerald-500 text-black' :
                            idx === 1 ? 'bg-white text-black' :
                            idx === 2 ? 'bg-emerald-800 text-white' : 'bg-neutral-800 text-neutral-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-white text-xs">{p.name}</div>
                            <span className="text-[10px] text-neutral-400">#{p.number} · {p.positionShort}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-heading font-black text-emerald-400 text-base">{p.topSpeedKmh} km/h</div>
                          <span className="text-[10px] text-neutral-400">{p.sprintDistanceM}m Sprint Vol</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Engine Room Total Distance Covered */}
              <div className="bg-black p-6 rounded-3xl border-2 border-emerald-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Total Distance & Work Output</span>
                  </div>
                  <span className="text-xs text-neutral-500">Per 90 Mins (km)</span>
                </div>

                <div className="space-y-2.5">
                  {[...squadData]
                    .sort((a, b) => b.totalDistanceKm - a.totalDistanceKm)
                    .slice(0, 4)
                    .map((p, idx) => (
                      <div
                        key={p.playerId}
                        onClick={() => handleSelectPlayerFromCard(p.playerId)}
                        className="p-3 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-heading font-black text-xs ${
                            idx === 0 ? 'bg-emerald-500 text-black' :
                            idx === 1 ? 'bg-white text-black' :
                            idx === 2 ? 'bg-emerald-800 text-white' : 'bg-neutral-800 text-neutral-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-white text-xs">{p.name}</div>
                            <span className="text-[10px] text-neutral-400">#{p.number} · {p.positionShort}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-heading font-black text-white text-base">{p.totalDistanceKm} km</div>
                          <span className="text-[10px] text-emerald-400">{p.highSpeedRunningM}m HSR Distance</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Last Season Injury Trends Visualization (Recharts) */}
            <InjuryTrendsChart />

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900/80 p-4 rounded-2xl border border-emerald-500/20">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, squad #, or position..."
                  className="w-full bg-black border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              {/* Status Segmented Control */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black rounded-xl border border-neutral-800">
                {[
                  { id: 'all', label: 'All Squad' },
                  { id: 'fit', label: 'Fit' },
                  { id: 'modified', label: 'Modified' },
                  { id: 'high_risk', label: 'High Risk' },
                  { id: 'injured', label: 'Rehab' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      statusFilter === st.id
                        ? 'bg-emerald-500 text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Squad Telemetry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSquad.map((player) => (
                <div
                  key={player.playerId}
                  onClick={() => handleSelectPlayerFromCard(player.playerId)}
                  className="bg-black rounded-2xl border-2 border-emerald-500/20 hover:border-emerald-400 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-emerald-500/40 flex items-center justify-center font-heading font-black text-emerald-400 text-xl shadow-lg">
                        #{player.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors uppercase">
                            {player.name}
                          </h4>
                        </div>
                        <span className="text-xs text-neutral-400">
                          {player.position} ({player.positionShort})
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      player.status === 'fit' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      player.status === 'modified' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      player.status === 'high_risk' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                      'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {player.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Status Reason */}
                  <p className="text-xs text-neutral-300 line-clamp-2 bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                    {player.statusReason}
                  </p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-bold">Readiness</div>
                      <div className="text-lg font-black text-emerald-400 font-heading">{player.readinessScore}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-bold">ACWR</div>
                      <div className={`text-lg font-black font-heading ${
                        player.acwrRisk === 'optimal' ? 'text-emerald-400' :
                        player.acwrRisk === 'elevated' ? 'text-amber-400' :
                        player.acwrRisk === 'high_danger' ? 'text-red-400' : 'text-neutral-400'
                      }`}>
                        {player.acwr.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase font-bold">Top Speed</div>
                      <div className="text-lg font-black text-white font-heading">{player.topSpeedKmh} <span className="text-[10px]">km/h</span></div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 group-hover:text-emerald-400">
                    <span>Inspect full medical dossier</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: INJURY TRENDS CHART (RECHARTS) */}
        {activeTab === 'trends' && (
          <div className="animate-fade-in">
            <InjuryTrendsChart />
          </div>
        )}

        {/* TAB 3: ANATOMICAL INJURY SCANNER */}
        {activeTab === 'bodymap' && (
          <BodyMapScanner
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
              setActiveTab('dossier');
            }}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {/* TAB 4: PLAYER DOSSIER & TELEMETRY */}
        {activeTab === 'dossier' && (
          <PlayerDossierTelemetry
            selectedPlayerId={selectedPlayerId}
            onSelectPlayer={setSelectedPlayerId}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {/* TAB 5: REHABILITATION & RTP TRACKER */}
        {activeTab === 'rehab' && (
          <RehabTracker
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
              setActiveTab('dossier');
            }}
          />
        )}

        {/* TAB 6: ACWR & PERIODIZATION */}
        {activeTab === 'periodization' && (
          <WorkloadPeriodization />
        )}

      </div>

      {/* Log Medical Incident Modal */}
      <LogMedicalModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        preselectedRegion={modalPreselectedRegion}
        onSaveInjury={handleSaveInjury}
      />

    </div>
  );
}
