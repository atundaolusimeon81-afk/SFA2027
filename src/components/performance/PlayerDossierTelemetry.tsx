import { useState } from 'react';
import { PlayerTelemetry, SQUAD_PERFORMANCE_DATA } from '../../data/performanceData';
import { 
  Zap, 
  Heart, 
  Moon, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  Gauge, 
  Droplet,
  FileText
} from 'lucide-react';

interface PlayerDossierTelemetryProps {
  selectedPlayerId: string;
  onSelectPlayer: (id: string) => void;
  onOpenReportModal: (region?: string) => void;
}

export function PlayerDossierTelemetry({
  selectedPlayerId,
  onSelectPlayer,
  onOpenReportModal,
}: PlayerDossierTelemetryProps) {
  const player = SQUAD_PERFORMANCE_DATA.find((p) => p.playerId === selectedPlayerId) || SQUAD_PERFORMANCE_DATA[0];

  const getStatusBadge = (status: PlayerTelemetry['status']) => {
    switch (status) {
      case 'fit':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Fit & Available</span>;
      case 'modified':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Modified Training Load</span>;
      case 'high_risk':
        return <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> High Injury Risk</span>;
      case 'injured':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Medical Sidelined / Rehab</span>;
    }
  };

  return (
    <div className="space-y-8 text-white">
      
      {/* Player Selector Strip */}
      <div className="bg-black p-4 rounded-2xl border-2 border-emerald-500/30 flex items-center gap-3 overflow-x-auto pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 shrink-0 px-2">
          Select Lion:
        </span>
        {SQUAD_PERFORMANCE_DATA.map((p) => {
          const isSelected = p.playerId === player.playerId;
          return (
            <button
              key={p.playerId}
              onClick={() => onSelectPlayer(p.playerId)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-md ring-2 ring-emerald-400'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-heading text-[11px] ${
                isSelected ? 'bg-black text-emerald-400' : 'bg-neutral-800 text-neutral-300'
              }`}>
                #{p.number}
              </span>
              <span className="truncate">{p.name}</span>
              <span className={`w-2 h-2 rounded-full ${
                p.status === 'fit' ? 'bg-emerald-400' :
                p.status === 'modified' ? 'bg-amber-400' :
                p.status === 'high_risk' ? 'bg-orange-400' : 'bg-red-500'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Main Dossier Overview Card */}
      <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {player.photoUrl ? (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl bg-neutral-900">
                  <img src={player.photoUrl} alt={player.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 border-2 border-emerald-400 flex items-center justify-center font-heading font-black text-emerald-400 text-3xl shadow-xl">
                  #{player.number}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                {player.positionShort}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-black text-white font-heading uppercase tracking-tight">
                  {player.name}
                </h3>
                {getStatusBadge(player.status)}
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {player.position} ({player.positionShort}) · Resting Heart Rate: {player.restingHrBpm} bpm · Fitness Test: {player.lastFitnessTestScore}
              </p>
              <div className="mt-2 text-xs text-neutral-300 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 inline-block">
                <strong>Medical Directive:</strong> {player.statusReason}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenReportModal()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Log Medical Update</span>
            </button>
          </div>
        </div>

        {/* 4 Core Primary Telemetry Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Readiness Score */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase">
              <span>Readiness Index</span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white font-heading">
                {player.readinessScore}%
              </span>
              <span className={`text-xs font-bold ${
                player.readinessScore >= 85 ? 'text-emerald-400' :
                player.readinessScore >= 70 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {player.readinessScore >= 85 ? 'High Readiness' :
                 player.readinessScore >= 70 ? 'Moderate Fatigue' : 'Rest Advised'}
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-emerald-400 h-2 rounded-full"
                style={{ width: `${player.readinessScore}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block">Based on sleep, HRV, & muscle soreness</span>
          </div>

          {/* ACWR Workload Ratio */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase">
              <span>ACWR Ratio (Gabbett)</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black font-heading ${
                player.acwrRisk === 'optimal' ? 'text-emerald-400' :
                player.acwrRisk === 'elevated' ? 'text-amber-400' : 'text-red-400'
              }`}>
                {player.acwr.toFixed(2)}
              </span>
              <span className="text-xs font-bold uppercase text-neutral-300">
                {player.acwrRisk === 'optimal' ? 'Sweet Spot' :
                 player.acwrRisk === 'elevated' ? 'Elevated Strain' : 'Danger Zone'}
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 relative">
              <div
                className={`h-2 rounded-full ${
                  player.acwrRisk === 'optimal' ? 'bg-emerald-400' :
                  player.acwrRisk === 'elevated' ? 'bg-amber-400' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (player.acwr / 2.0) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block">Acute (7-day): {player.acuteWorkload} | Chronic (28-day): {player.chronicWorkload}</span>
          </div>

          {/* Heart Rate Variability (HRV) */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase">
              <span>Autonomic HRV (rMSSD)</span>
              <Heart className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-400 font-heading">
                {player.hrvRmssd} <span className="text-sm font-normal text-neutral-400">ms</span>
              </span>
              <span className="text-xs font-bold text-neutral-300">
                Rest HR: {player.restingHrBpm} bpm
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-emerald-400 h-2 rounded-full"
                style={{ width: `${Math.min(100, (player.hrvRmssd / 100) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block">Parasympathetic recovery status</span>
          </div>

          {/* Sleep & Rest */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase">
              <span>Sleep & Recovery</span>
              <Moon className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white font-heading">
                {player.sleepHours} <span className="text-sm font-normal text-neutral-400">hrs</span>
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Efficiency: {player.sleepEfficiencyPct}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-emerald-400 h-2 rounded-full"
                style={{ width: `${(player.sleepHours / 10) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block">Hydration USG: {player.hydrationUsg}</span>
          </div>

        </div>

        {/* Detailed Biological & Physical Biometrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* GPS Physical Performance Metrics */}
          <div className="bg-neutral-900/80 rounded-2xl p-6 border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>GPS Velocity & Physical Output (Matchday Average)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-black rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Top Peak Velocity</span>
                <div className="text-2xl font-black text-emerald-400 font-heading mt-0.5">
                  {player.topSpeedKmh} <span className="text-xs font-normal text-neutral-400">km/h</span>
                </div>
                <span className="text-[10px] text-neutral-400">Elite threshold &gt; 33.0 km/h</span>
              </div>

              <div className="p-3.5 bg-black rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Distance Covered</span>
                <div className="text-2xl font-black text-white font-heading mt-0.5">
                  {player.totalDistanceKm} <span className="text-xs font-normal text-neutral-400">km</span>
                </div>
                <span className="text-[10px] text-neutral-400">Engine room volume / 90 mins</span>
              </div>

              <div className="p-3.5 bg-black rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Sprint Distance (&gt;25.2 km/h)</span>
                <div className="text-2xl font-black text-emerald-400 font-heading mt-0.5">
                  {player.sprintDistanceM} <span className="text-xs font-normal text-neutral-400">meters</span>
                </div>
                <span className="text-[10px] text-neutral-400">High eccentric demand</span>
              </div>

              <div className="p-3.5 bg-black rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">High Speed Running (HSR)</span>
                <div className="text-2xl font-black text-white font-heading mt-0.5">
                  {player.highSpeedRunningM} <span className="text-xs font-normal text-neutral-400">meters</span>
                </div>
                <span className="text-[10px] text-neutral-400">Velocity range 19.8 - 25.2 km/h</span>
              </div>
            </div>
          </div>

          {/* Biological Screening & Accelerations */}
          <div className="bg-neutral-900/80 rounded-2xl p-6 border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span>Biomechanical Load & Kinetic Integrity</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-black rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">High Accelerations (&gt;3.0 m/s²)</div>
                  <span className="text-[10px] text-neutral-400">Concentric power output bursts</span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-emerald-400 text-lg">
                    {player.accelerations}
                  </span>
                  <span className="text-[10px] text-emerald-400 block">per match</span>
                </div>
              </div>

              <div className="p-3 bg-black rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">High Decelerations (&lt;-3.0 m/s²)</div>
                  <span className="text-[10px] text-neutral-400">Eccentric braking strain rating</span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-white text-lg">
                    {player.decelerations}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">per match</span>
                </div>
              </div>

              <div className="p-3 bg-black rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Total Player Load (Accelerometer)</div>
                  <span className="text-[10px] text-neutral-400">Mechanical body impact units</span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-emerald-400 text-lg">
                    {player.playerLoadAU} AU
                  </span>
                  <span className="text-[10px] text-neutral-400 block">Tri-axial accelerometer</span>
                </div>
              </div>

              <div className="p-3 bg-black rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Subjective Muscle Soreness Score</div>
                  <span className="text-[10px] text-neutral-400">Daily wellness questionnaire</span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-white text-lg">
                    {player.muscleSoreness} / 10
                  </span>
                  <span className="text-[10px] text-emerald-400 block">Low soreness rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
