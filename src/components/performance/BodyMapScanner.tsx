import { useState } from 'react';
import { BODY_MAP_HOTSPOTS, SQUAD_PERFORMANCE_DATA, ActiveInjury } from '../../data/performanceData';
import { Shield, AlertTriangle, Activity, User, Calendar, CheckCircle2 } from 'lucide-react';

interface BodyMapScannerProps {
  onSelectPlayer: (playerId: string) => void;
  onOpenReportModal: (preselectedRegion?: string) => void;
}

export function BodyMapScanner({ onSelectPlayer, onOpenReportModal }: BodyMapScannerProps) {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedHotspot, setSelectedHotspot] = useState<string>('hamstring_right');

  // Find all players with active injury or elevated risk associated with regions
  const getRegionStatus = (hotspotId: string) => {
    // Check if any player has an active injury in this region
    const injuredPlayers = SQUAD_PERFORMANCE_DATA.filter((p) => {
      if (!p.activeInjury) return false;
      const inj = p.activeInjury;
      if (hotspotId.includes('hamstring') && inj.bodyRegion === 'hamstrings') {
        if (hotspotId.includes(inj.side)) return true;
      }
      if (hotspotId.includes('ankle') && inj.bodyRegion === 'ankle') {
        if (hotspotId.includes(inj.side)) return true;
      }
      if (hotspotId.includes('knee') && inj.bodyRegion === 'knee') return true;
      if (hotspotId.includes('groin') && inj.bodyRegion === 'adductor') return true;
      if (hotspotId.includes('quadriceps') && inj.bodyRegion === 'quadriceps') return true;
      return false;
    });

    // Check risk flags
    const atRiskPlayers = SQUAD_PERFORMANCE_DATA.filter((p) => {
      if (hotspotId.includes('hamstring') && p.status === 'high_risk') return true;
      if (hotspotId.includes('groin') && p.status === 'modified') return true;
      return false;
    });

    if (injuredPlayers.length > 0) return { type: 'injured', count: injuredPlayers.length, players: injuredPlayers };
    if (atRiskPlayers.length > 0) return { type: 'risk', count: atRiskPlayers.length, players: atRiskPlayers };
    return { type: 'clear', count: 0, players: [] };
  };

  const currentHotspots = BODY_MAP_HOTSPOTS.filter((h) => h.view === activeView);
  const activeHotspotData = BODY_MAP_HOTSPOTS.find((h) => h.id === selectedHotspot) || BODY_MAP_HOTSPOTS[0];
  const activeRegionStatus = getRegionStatus(selectedHotspot);

  return (
    <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Clinical Sports Medicine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1 uppercase tracking-tight">
            Interactive Anatomical Injury Scanner
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time biometric anatomical mapping. Click on joint and muscle clusters to inspect clinical diagnostics and rehabilitation protocols.
          </p>
        </div>

        {/* View Toggle (Anterior / Posterior) */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => {
              setActiveView('front');
              setSelectedHotspot('groin');
            }}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeView === 'front'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            onClick={() => {
              setActiveView('back');
              setSelectedHotspot('hamstring_right');
            }}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeView === 'back'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        
        {/* Left: Anatomical Visual Model (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-black p-6 rounded-2xl border border-emerald-500/20 flex flex-col items-center relative overflow-hidden shadow-inner">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          {/* Legend */}
          <div className="w-full flex items-center justify-between text-[11px] font-semibold text-neutral-400 mb-4 z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm animate-pulse" />
              <span>Active Sidelined</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
              <span>Elevated Risk</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span>Clear</span>
            </span>
          </div>

          {/* Athlete Vector Silhouette Graphic Container */}
          <div className="relative w-64 h-[440px] my-2 flex items-center justify-center select-none">
            
            {/* Athletic Silhouette Outline SVG */}
            <svg
              className="w-full h-full drop-shadow-2xl"
              viewBox="0 0 200 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head */}
              <circle cx="100" cy="35" r="22" className="fill-neutral-900 stroke-emerald-500/40" strokeWidth="2" />
              {/* Neck */}
              <path d="M92 56 L108 56 L112 68 L88 68 Z" className="fill-neutral-900 stroke-emerald-500/40" strokeWidth="1.5" />
              {/* Torso & Shoulders */}
              <path
                d="M60 75 Q100 68 140 75 L148 100 L135 180 L128 220 L72 220 L65 180 L52 100 Z"
                className="fill-neutral-900 stroke-emerald-500/40"
                strokeWidth="2"
              />
              {/* Arms */}
              <path d="M52 100 L38 180 L34 235 L44 240 L54 185 L65 115 Z" className="fill-neutral-900 stroke-emerald-500/40" strokeWidth="1.5" />
              <path d="M148 100 L162 180 L166 235 L156 240 L146 185 L135 115 Z" className="fill-neutral-900 stroke-emerald-500/40" strokeWidth="1.5" />
              
              {/* Pelvis & Hips */}
              <path d="M72 220 L128 220 L132 250 L100 262 L68 250 Z" className="fill-neutral-900 stroke-emerald-500/40" strokeWidth="1.5" />

              {/* Left Leg (Thigh, Knee, Calf, Ankle) */}
              <path
                d="M68 250 L64 320 L66 350 L68 410 L58 430 L80 430 L84 410 L86 350 L90 320 L96 260 Z"
                className="fill-neutral-900 stroke-emerald-500/40"
                strokeWidth="2"
              />

              {/* Right Leg (Thigh, Knee, Calf, Ankle) */}
              <path
                d="M132 250 L136 320 L134 350 L132 410 L142 430 L120 430 L116 410 L114 350 L110 320 L104 260 Z"
                className="fill-neutral-900 stroke-emerald-500/40"
                strokeWidth="2"
              />

              {/* Center Division & Anatomical Muscle Contours */}
              <line x1="100" y1="75" x2="100" y2="220" stroke="#10b981" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
            </svg>

            {/* Clickable Anatomical Hotspots Overlay */}
            {currentHotspots.map((hotspot) => {
              const status = getRegionStatus(hotspot.id);
              const isSelected = selectedHotspot === hotspot.id;

              return (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot.id)}
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-300 group z-20 cursor-pointer ${
                    isSelected ? 'scale-130 ring-4 ring-white' : 'hover:scale-120'
                  }`}
                  title={hotspot.name}
                >
                  <span
                    className={`block w-4 h-4 rounded-full border shadow-lg ${
                      status.type === 'injured'
                        ? 'bg-red-500 border-white animate-pulse'
                        : status.type === 'risk'
                        ? 'bg-amber-400 border-white'
                        : 'bg-emerald-500 border-emerald-400'
                    }`}
                  />
                  {status.count > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-black font-black text-[9px] flex items-center justify-center">
                      {status.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-neutral-400 text-center mt-2 z-10">
            Silhouette: <strong className="text-white uppercase">{activeView} kinetic chain</strong> · Click nodes to view clinical dossiers
          </div>
        </div>

        {/* Right: Regional Diagnostic & Medical Dossier Details (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900/90 rounded-2xl border border-emerald-500/30 p-6 space-y-6">
          
          {/* Header of selected region */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                Anatomical Cluster Selected
              </span>
              <h4 className="text-2xl font-black text-white font-heading uppercase">
                {activeHotspotData.name}
              </h4>
              <span className="text-xs text-neutral-400">
                View: {activeHotspotData.view === 'front' ? 'Anterior' : 'Posterior'} chain · Quadrant {activeHotspotData.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                activeRegionStatus.type === 'injured' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                activeRegionStatus.type === 'risk' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {activeRegionStatus.type === 'injured' ? 'Active Injury Incident' :
                 activeRegionStatus.type === 'risk' ? 'Fatigue / High Risk Flag' : 'Tissue Tolerant / Clear'}
              </span>
            </div>
          </div>

          {/* Player Cases within this region */}
          <div>
            {activeRegionStatus.type === 'injured' ? (
              <div className="space-y-4">
                {activeRegionStatus.players.map((p) => {
                  const inj = p.activeInjury!;
                  return (
                    <div
                      key={p.playerId}
                      className="bg-black rounded-2xl border-2 border-red-500/40 p-5 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-heading font-black text-emerald-400 text-lg">
                            #{p.number}
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-base uppercase">{p.name}</h5>
                            <span className="text-xs text-neutral-400">{p.position} ({p.positionShort})</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectPlayer(p.playerId)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Open Dossier →
                        </button>
                      </div>

                      {/* Injury Breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] text-neutral-400 block uppercase">Severity</span>
                          <span className="font-bold text-red-400">{inj.severity}</span>
                        </div>
                        <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] text-neutral-400 block uppercase">Mechanism</span>
                          <span className="font-bold text-neutral-200">{inj.mechanism}</span>
                        </div>
                        <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] text-neutral-400 block uppercase">Time Out</span>
                          <span className="font-bold text-amber-400">{inj.daysSidelined} / {inj.expectedDaysTotal} days</span>
                        </div>
                        <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] text-neutral-400 block uppercase">Target RTP</span>
                          <span className="font-bold text-emerald-400">{inj.targetReturnDate}</span>
                        </div>
                      </div>

                      {/* Rehabilitation Progress Bar */}
                      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-neutral-300">
                            Current Stage: <span className="text-emerald-400">{inj.rehabPhaseTitle}</span>
                          </span>
                          <span className="font-black text-emerald-400 font-heading text-sm">
                            {inj.progressPct}% RTP
                          </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${inj.progressPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Clinical Protocol & Treatment Notes */}
                      <div className="bg-neutral-900/70 p-4 rounded-xl border border-neutral-800 space-y-2">
                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                          Prescribed Treatment Protocol
                        </div>
                        <ul className="text-xs text-neutral-300 space-y-1">
                          {inj.treatmentProtocol.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
                          <strong className="text-neutral-300">Physio Case Officer:</strong> {inj.physioAssigned}
                          <p className="mt-1 italic text-neutral-300">"{inj.notes}"</p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : activeRegionStatus.type === 'risk' ? (
              /* Elevated Fatigue & Strain Warning */
              <div className="mt-5 space-y-4">
                <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Predictive Fatigue Flag: High Strain Probability</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    GPS telemetry indicates acute overload in this muscle group. Recommend immediate recovery intervention to prevent structural tears.
                  </p>
                </div>

                {activeRegionStatus.players.map((p) => (
                  <div key={p.playerId} className="p-4 bg-black rounded-xl border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-heading font-black text-emerald-400 text-lg">#{p.number}</span>
                        <div>
                          <div className="font-bold text-white text-sm">{p.name}</div>
                          <span className="text-[11px] text-neutral-400">{p.statusReason}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                        Risk: {p.injuryRiskScore}%
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <span className="text-neutral-400 text-[10px] uppercase font-bold">Identified Risk Triggers:</span>
                      <ul className="text-neutral-300 space-y-0.5">
                        {p.riskFactors.map((rf, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-400">•</span>
                            <span>{rf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onSelectPlayer(p.playerId)}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                      >
                        Inspect Telemetry & ACWR →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Clear State */
              <div className="mt-6 py-8 text-center bg-black/60 rounded-xl border border-neutral-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-white text-sm uppercase">No Active Injuries in this Segment</h5>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  All first-team squad members have normal tissue tolerance and baseline strength in the {activeHotspotData.name.toLowerCase()} region.
                </p>
              </div>
            )}

            {/* Quick Action to log medical case */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => onOpenReportModal(activeHotspotData.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all border border-emerald-500/30 cursor-pointer"
              >
                <span>+ Log Clinical Entry for {activeHotspotData.name}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
