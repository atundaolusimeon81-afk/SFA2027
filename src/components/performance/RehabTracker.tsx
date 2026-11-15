import { useState } from 'react';
import { SQUAD_PERFORMANCE_DATA, ActiveInjury } from '../../data/performanceData';
import { soundEffects } from '../../utils/audioEffects';
import confetti from 'canvas-confetti';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  UserCheck, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface RehabTrackerProps {
  onSelectPlayer: (id: string) => void;
}

export function RehabTracker({ onSelectPlayer }: RehabTrackerProps) {
  // Pull all active injuries from squad data
  const initialInjuries = SQUAD_PERFORMANCE_DATA
    .filter((p) => p.activeInjury !== undefined)
    .map((p) => p.activeInjury as ActiveInjury);

  const [activeInjuries, setActiveInjuries] = useState<ActiveInjury[]>(initialInjuries);
  const [selectedInjuryId, setSelectedInjuryId] = useState<string>(initialInjuries[0]?.id || '');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const currentInjury = activeInjuries.find((i) => i.id === selectedInjuryId) || activeInjuries[0];

  const handleToggleMilestone = (milestoneIndex: number) => {
    if (!currentInjury) return;

    const updatedInjuries = activeInjuries.map((inj) => {
      if (inj.id === currentInjury.id) {
        const nextMilestones = [...inj.milestones];
        nextMilestones[milestoneIndex] = {
          ...nextMilestones[milestoneIndex],
          completed: !nextMilestones[milestoneIndex].completed,
        };
        const completedCount = nextMilestones.filter((m) => m.completed).length;
        const progressPct = Math.round((completedCount / nextMilestones.length) * 100);

        return {
          ...inj,
          milestones: nextMilestones,
          progressPct,
        };
      }
      return inj;
    });

    setActiveInjuries(updatedInjuries);
    soundEffects.playWhistle();
  };

  const handleSignOffClearance = (newStatus: ActiveInjury['clearanceStatus']) => {
    if (!currentInjury) return;

    const updatedInjuries = activeInjuries.map((inj) => {
      if (inj.id === currentInjury.id) {
        return {
          ...inj,
          clearanceStatus: newStatus,
        };
      }
      return inj;
    });

    setActiveInjuries(updatedInjuries);
    soundEffects.playGoalCheer();
    confetti({
      particleCount: 50,
      spread: 60,
    });

    setSuccessToast(`Medical clearance updated to: "${newStatus}" for ${currentInjury.playerName}`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Rehabilitation & Return-To-Play (RTP) Protocol</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1 uppercase tracking-tight">
            Clinical Milestone & Clearance Tracker
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Structured 4-Phase return criteria aligned with UEFA Medical Guidelines & Sports Science standards.
          </p>
        </div>

        {/* Status Count Pill */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold">
          <span className="text-neutral-400">Active Rehabilitation Cases:</span>
          <span className="text-emerald-400 font-black">{activeInjuries.length} Players</span>
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Injured Player Switcher Tabs */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 overflow-x-auto">
          {activeInjuries.map((inj) => {
            const isSelected = inj.id === currentInjury?.id;
            return (
              <button
                key={inj.id}
                onClick={() => setSelectedInjuryId(inj.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-black border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-lg ${
                  isSelected ? 'bg-emerald-500 text-black' : 'bg-neutral-900 text-neutral-400'
                }`}>
                  #{inj.playerNumber}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-xs">{inj.playerName}</div>
                  <span className="text-[10px] text-neutral-400">{inj.injuryName}</span>
                </div>
                <span className="text-xs font-heading font-black text-emerald-400 ml-2">
                  {inj.progressPct}%
                </span>
              </button>
            );
          })}
        </div>

        {currentInjury && (
          <div className="mt-8 space-y-8">
            
            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Diagnosis</span>
                <div className="text-sm font-bold text-white mt-1">{currentInjury.injuryName}</div>
                <span className="text-[10px] text-emerald-400">{currentInjury.severity}</span>
              </div>

              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Timeline</span>
                <div className="text-sm font-bold text-white mt-1">
                  {currentInjury.daysSidelined} / {currentInjury.expectedDaysTotal} Days Out
                </div>
                <span className="text-[10px] text-neutral-400">Target RTP: {currentInjury.targetReturnDate}</span>
              </div>

              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Current Phase</span>
                <div className="text-sm font-bold text-emerald-400 mt-1">{currentInjury.rehabPhaseTitle}</div>
                <span className="text-[10px] text-neutral-400">Physio: {currentInjury.physioAssigned}</span>
              </div>

              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Clearance Status</span>
                <div className="text-sm font-bold text-white mt-1">{currentInjury.clearanceStatus}</div>
                <span className="text-[10px] text-emerald-400">UEFA Clinical Framework</span>
              </div>
            </div>

            {/* Overall Progress Gauge */}
            <div className="bg-neutral-900/90 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">Overall RTP Progression</h4>
                  <span className="text-xs text-neutral-400">Interactive milestone verification criteria</span>
                </div>
                <div className="text-2xl font-black font-heading text-emerald-400">
                  {currentInjury.progressPct}% Complete
                </div>
              </div>

              <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentInjury.progressPct}%` }}
                />
              </div>
            </div>

            {/* 4 Phase Protocol Progression Map */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                UEFA 4-Phase Return To Play Criteria Checklist
              </h4>

              <div className="space-y-3">
                {currentInjury.milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleMilestone(idx)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      milestone.completed
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        milestone.completed
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : 'border-neutral-700 bg-neutral-950'
                      }`}>
                        {milestone.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${milestone.completed ? 'text-white' : 'text-neutral-300'}`}>
                          {milestone.title}
                        </div>
                        <span className="text-[10px] text-neutral-400">Target: {milestone.targetDate}</span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      milestone.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {milestone.completed ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Protocol & Clearance Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Active Clinical Treatment Directives
                </span>
                <ul className="text-xs text-neutral-300 space-y-1.5 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                  {currentInjury.treatmentProtocol.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Doctor / Physio Sign-Off Actions
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSignOffClearance('Modified Pitch Drills')}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase text-white transition-all cursor-pointer"
                  >
                    Clear for Pitch Drills
                  </button>
                  <button
                    onClick={() => handleSignOffClearance('Match Fit Pending Test')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Match Fit Clearance
                  </button>
                  <button
                    onClick={() => onSelectPlayer(currentInjury.playerId)}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase cursor-pointer"
                  >
                    View Player Dossier →
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
