import { useState } from 'react';
import { WORKLOAD_PERIODIZATION_CYCLE, SQUAD_PERFORMANCE_DATA } from '../../data/performanceData';
import { TrendingUp, AlertTriangle, CheckCircle2, Shield, Calendar, Activity } from 'lucide-react';

export function WorkloadPeriodization() {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // MD-3 Wednesday default

  const currentDay = WORKLOAD_PERIODIZATION_CYCLE[selectedDayIndex];

  return (
    <div className="space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Sports Science & Load Management</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1 uppercase tracking-tight">
            Workload Periodization & ACWR Sweet Spot
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Gabbett ACWR Model balancing acute fatigue against chronic fitness to minimize soft-tissue injury risk.
          </p>
        </div>

        {/* Sweet spot range chip */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold">
          <span className="text-neutral-400">Optimal ACWR Target:</span>
          <span className="text-emerald-400 font-black">0.80 - 1.30</span>
        </div>
      </div>

      {/* Weekly Matchday Periodization Microcycle Strip */}
      <div className="bg-black p-6 rounded-3xl border-2 border-emerald-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Weekly Matchday Microcycle (MD-4 to MD+1)</span>
          </span>
          <span className="text-xs text-emerald-400 font-mono">Current Focus: MD-3 Tactical Speed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {WORKLOAD_PERIODIZATION_CYCLE.map((cycle, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={cycle.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-400 ring-2 ring-emerald-400 text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  {cycle.day.split(' ')[0]}
                </div>
                <div className="font-bold text-white text-xs mt-1">{cycle.title}</div>
                <div className="mt-3 text-[11px] font-mono text-neutral-300">
                  Load: <strong className="text-emerald-400">{cycle.targetLoad}</strong>
                </div>
                <span className="text-[9px] text-neutral-400 block mt-0.5 line-clamp-1">{cycle.focus}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Deep Dive Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Training Specifications (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900/90 rounded-3xl border border-emerald-500/25 p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-neutral-800">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
              Daily Training Prescription
            </span>
            <h4 className="text-2xl font-black text-white font-heading uppercase mt-1">
              {currentDay.day} — {currentDay.title}
            </h4>
            <p className="text-xs text-neutral-400 mt-1">{currentDay.focus}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-black p-4 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Planned Target Load</span>
              <div className="text-xl font-black text-emerald-400 font-heading mt-1">{currentDay.targetLoad}</div>
            </div>
            <div className="bg-black p-4 rounded-xl border border-neutral-800">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Peak Velocity Range</span>
              <div className="text-xl font-black text-white font-heading mt-1">{currentDay.avgSpeed}</div>
            </div>
            <div className="bg-black p-4 rounded-xl border border-neutral-800 sm:col-span-1 col-span-2">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Risk Management</span>
              <div className="text-xl font-black text-emerald-300 font-heading mt-1">Controlled ACWR</div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Sports Science Protocols & Instructions
            </h5>
            <div className="bg-black p-4 rounded-xl border border-neutral-800 space-y-2 text-xs text-neutral-300">
              <p>• Warm-up: 15 mins dynamic mobility + FIFA 11+ injury prevention drills.</p>
              <p>• Main Session: High-intensity small-sided games (5v5 with goalkeepers) on 40x30m pitch to develop maximum acceleration impulses.</p>
              <p>• High-Speed Threshold: Ensure wingers and fullbacks hit at least 85% of peak match velocity to inoculate hamstrings against strain.</p>
              <p>• Cooldown: Active regeneration, cold water hydrotherapy immersion (10 mins at 12°C).</p>
            </div>
          </div>
        </div>

        {/* Right: Gabbett ACWR Quadrant Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 space-y-6">
          <div className="pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Gabbett ACWR Risk Quadrants</span>
            </div>
            <h4 className="text-xl font-black text-white font-heading uppercase mt-1">
              Injury Probability Matrix
            </h4>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-neutral-900 rounded-xl border-l-4 border-emerald-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Sweet Spot (0.80 - 1.30)</span>
                <span className="text-emerald-400 font-black">&lt; 5% Injury Risk</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Optimal fitness accumulation. Chronic load shields tissues from traumatic spikes.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900 rounded-xl border-l-4 border-amber-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Elevated Strain (1.31 - 1.49)</span>
                <span className="text-amber-400 font-black">10 - 15% Injury Risk</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Mild fatigue accumulation. Cap sprint minutes and monitor morning resting HRV.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900 rounded-xl border-l-4 border-red-500">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Danger Zone (&gt; 1.50)</span>
                <span className="text-red-400 font-black">&gt; 35% Injury Risk</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Acute spike exceeds adaptive capacity. Mandate recovery session and substitute at 60 mins.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <span className="text-xs font-bold text-neutral-300 block mb-2">
              Current Squad ACWR Outliers:
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-white font-semibold">Victor Amadi (FW)</span>
                <span className="font-mono text-red-400 font-black">1.54 (Danger Zone)</span>
              </div>
              <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-white font-semibold">Kingsley Okafor (DF)</span>
                <span className="font-mono text-emerald-400 font-black">1.12 (Optimal)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
