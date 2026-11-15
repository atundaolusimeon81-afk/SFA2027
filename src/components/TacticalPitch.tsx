import { useState } from 'react';
import { SQUAD_PLAYERS, Player } from '../data/clubData';
import { Shield, Sparkles, RefreshCw } from 'lucide-react';

interface FormationPreset {
  name: string;
  style: string;
  slots: { role: string; top: string; left: string; defaultPlayerNum: number; instruction: string }[];
}

export function TacticalPitch() {
  const [formation, setFormation] = useState<'4-3-3' | '4-2-3-1' | '3-5-2'>('4-3-3');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const formations: Record<string, FormationPreset> = {
    '4-3-3': {
      name: '4-3-3 Attacking Total Football',
      style: 'High press, wide wingers stretching the pitch, creative midfield triangle with Adeleke & Vane.',
      slots: [
        { role: 'GK', top: '88%', left: '50%', defaultPlayerNum: 1, instruction: 'Sweeper Keeper - quick distribution and box domination' },
        { role: 'LB', top: '70%', left: '16%', defaultPlayerNum: 3, instruction: 'Inverted Wing Back - overlaps to deliver curled crosses' },
        { role: 'CB', top: '75%', left: '38%', defaultPlayerNum: 4, instruction: 'Ball-Playing Defender (Captain) - aerial command and line organization' },
        { role: 'CB', top: '75%', left: '62%', defaultPlayerNum: 5, instruction: 'Stopper - aggressive tackles and recovery pace' },
        { role: 'RB', top: '70%', left: '84%', defaultPlayerNum: 2, instruction: 'Attacking Full Back - high pace sprint and transition cover' },
        { role: 'CDM', top: '54%', left: '50%', defaultPlayerNum: 6, instruction: 'Anchor Man - shields center-backs and breaks counters' },
        { role: 'CM', top: '42%', left: '32%', defaultPlayerNum: 8, instruction: 'Mezzala / Playmaker - roaming creative engine with long range shots' },
        { role: 'CAM', top: '40%', left: '68%', defaultPlayerNum: 10, instruction: 'Advanced Playmaker - key passes and through-ball specialist' },
        { role: 'LW', top: '22%', left: '18%', defaultPlayerNum: 11, instruction: 'Inside Forward - cuts onto right foot and tests goalkeeper' },
        { role: 'ST', top: '15%', left: '50%', defaultPlayerNum: 14, instruction: 'Complete Forward - lethal box finisher and pressing spearhead' },
        { role: 'RW', top: '22%', left: '82%', defaultPlayerNum: 7, instruction: 'Winger - electric 1v1 dribbles and low driven cutbacks' },
      ],
    },
    '4-2-3-1': {
      name: '4-2-3-1 Controlled Dominance',
      style: 'Double pivot stability in midfield, solid transition defense, lethal counter-attack.',
      slots: [
        { role: 'GK', top: '88%', left: '50%', defaultPlayerNum: 1, instruction: 'Sweeper Keeper' },
        { role: 'LB', top: '72%', left: '16%', defaultPlayerNum: 3, instruction: 'Defensive Wingback' },
        { role: 'CB', top: '75%', left: '38%', defaultPlayerNum: 4, instruction: 'Central Organizer' },
        { role: 'CB', top: '75%', left: '62%', defaultPlayerNum: 5, instruction: 'Aggressive Stopper' },
        { role: 'RB', top: '72%', left: '84%', defaultPlayerNum: 2, instruction: 'Supporting Fullback' },
        { role: 'CDM', top: '56%', left: '36%', defaultPlayerNum: 6, instruction: 'Defensive Pivot' },
        { role: 'CDM', top: '56%', left: '64%', defaultPlayerNum: 8, instruction: 'Deep Playmaker' },
        { role: 'LAM', top: '35%', left: '22%', defaultPlayerNum: 11, instruction: 'Left Playmaker' },
        { role: 'CAM', top: '32%', left: '50%', defaultPlayerNum: 10, instruction: 'Classic Number 10' },
        { role: 'RAM', top: '35%', left: '78%', defaultPlayerNum: 7, instruction: 'Right Speed Flanker' },
        { role: 'ST', top: '16%', left: '50%', defaultPlayerNum: 14, instruction: 'Target Man Striker' },
      ],
    },
    '3-5-2': {
      name: '3-5-2 Fortress & Wing Dominance',
      style: 'Triple center-back wall with flying wingbacks controlling the flanks and twin strikers.',
      slots: [
        { role: 'GK', top: '88%', left: '50%', defaultPlayerNum: 1, instruction: 'Commanding Keeper' },
        { role: 'CB', top: '76%', left: '26%', defaultPlayerNum: 5, instruction: 'Left Stopper' },
        { role: 'CB', top: '77%', left: '50%', defaultPlayerNum: 4, instruction: 'Central Sweeper' },
        { role: 'CB', top: '76%', left: '74%', defaultPlayerNum: 15, instruction: 'Right Stopper' },
        { role: 'LWB', top: '50%', left: '12%', defaultPlayerNum: 3, instruction: 'Wingback - end-to-end stamina' },
        { role: 'CM', top: '52%', left: '34%', defaultPlayerNum: 6, instruction: 'Ball Winner' },
        { role: 'CAM', top: '44%', left: '50%', defaultPlayerNum: 10, instruction: 'Creative Pivot' },
        { role: 'CM', top: '52%', left: '66%', defaultPlayerNum: 8, instruction: 'Box-to-Box Engine' },
        { role: 'RWB', top: '50%', left: '88%', defaultPlayerNum: 2, instruction: 'Attacking Wingback' },
        { role: 'ST', top: '18%', left: '38%', defaultPlayerNum: 9, instruction: 'Poacher' },
        { role: 'ST', top: '18%', left: '62%', defaultPlayerNum: 14, instruction: 'Spearhead Striker' },
      ],
    },
  };

  const currentFormationData = formations[formation];

  const getPlayerByNum = (num: number): Player | undefined => {
    return SQUAD_PLAYERS.find((p) => p.number === num);
  };

  return (
    <section id="tactics" className="py-20 bg-neutral-950 text-white border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Simolat Sporting FC Boardroom & Dugout</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading mt-1 uppercase tracking-tight">
              Tactical Lineup & Masterclass
            </h2>
            <p className="text-sm text-neutral-300 mt-2 max-w-xl">
              Inspect Head Coach Simeon Atundaolu’s tactical setup on our virtual match pitch. Click any player node to view tactical directives.
            </p>
          </div>

          {/* Formation Toggle */}
          <div className="flex items-center gap-2 p-1.5 bg-black rounded-xl border border-neutral-800">
            {(['4-3-3', '4-2-3-1', '3-5-2'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => {
                  setFormation(fmt);
                  setActiveSlot(null);
                }}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  formation === fmt
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Pitch and Tactical Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Virtual Football Pitch (7 Cols) */}
          <div className="lg:col-span-7 bg-black p-4 sm:p-6 rounded-3xl border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Realistic Football Grass Pitch Surface */}
            <div className="relative aspect-[3/4] w-full max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-inner bg-emerald-950 pitch-pattern">
              
              {/* Pitch Chalk Markings (SVG overlay) */}
              <div className="absolute inset-4 border-2 border-white/50 rounded-sm pointer-events-none">
                {/* Halfway line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50" />
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-white/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/80" />
                
                {/* Top Penalty Box (Opponent goal area) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-b-2 border-x-2 border-white/50" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10 border-b-2 border-x-2 border-white/50" />
                
                {/* Bottom Penalty Box (Simolat Home goal area) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-white/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-10 border-t-2 border-x-2 border-white/50" />
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/80" />
              </div>

              {/* Pitch Player Nodes (White, Green, and Black) */}
              {currentFormationData.slots.map((slot, index) => {
                const player = getPlayerByNum(slot.defaultPlayerNum);
                const isSelected = activeSlot === index;

                return (
                  <button
                    key={`${formation}-${index}`}
                    onClick={() => setActiveSlot(index)}
                    style={{ top: slot.top, left: slot.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform duration-200 z-20 cursor-pointer focus:outline-none ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                  >
                    {/* Jersey Circle Node */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs sm:text-sm font-heading shadow-xl transition-all border-2 ${
                      isSelected
                        ? 'bg-white text-black border-emerald-400 ring-4 ring-emerald-400/60'
                        : slot.role === 'GK'
                        ? 'bg-black text-emerald-400 border-emerald-400'
                        : 'bg-emerald-600 text-white border-white group-hover:bg-emerald-500'
                    }`}>
                      #{slot.defaultPlayerNum}
                    </div>

                    {/* Name Pill */}
                    <div className="mt-1 px-2 py-0.5 rounded-md bg-black/95 border border-emerald-500/40 text-[10px] sm:text-[11px] font-bold text-white whitespace-nowrap shadow-md flex items-center gap-1">
                      <span className="text-emerald-400 font-extrabold">{slot.role}</span>
                      <span className="truncate max-w-[70px]">{player?.name.split(' ')[1] || player?.name}</span>
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Hint message */}
            <div className="text-center text-xs text-neutral-400 mt-4 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Tap any player node on the turf to inspect tactical directives</span>
            </div>
          </div>

          {/* Tactical Analysis & Active Role Drawer (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Formation Summary Card */}
            <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Tactical Blueprint
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-500 text-black font-mono font-black">
                  {formation}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white font-heading mt-3 uppercase">
                {currentFormationData.name}
              </h3>
              
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                {currentFormationData.style}
              </p>

              {/* Tactical Philosophy Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-neutral-800 text-center">
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-bold">Press Intensity</div>
                  <div className="text-lg font-black text-emerald-400 font-heading">High PPDA 7.2</div>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-bold">Defensive Line</div>
                  <div className="text-lg font-black text-white font-heading">54m Average</div>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase font-bold">Possession</div>
                  <div className="text-lg font-black text-emerald-400 font-heading">62.8% Mean</div>
                </div>
              </div>
            </div>

            {/* Selected Player Tactical Directive Card */}
            {activeSlot !== null ? (
              (() => {
                const slot = currentFormationData.slots[activeSlot];
                const player = getPlayerByNum(slot.defaultPlayerNum);
                return (
                  <div className="bg-black rounded-3xl border-2 border-emerald-500/50 p-6 shadow-xl space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-heading font-black text-sm">
                          {slot.role}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm uppercase">Role Tactical Orders</h4>
                          <span className="text-[10px] text-emerald-400">Position Directive #{slot.defaultPlayerNum}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveSlot(null)}
                        className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                      >
                        Reset Selection
                      </button>
                    </div>

                    {player && (
                      <div className="flex items-center gap-3 bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                        <div className="w-12 h-12 rounded-xl bg-black border border-emerald-400 flex items-center justify-center font-heading font-black text-emerald-400 text-xl shadow">
                          #{player.number}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{player.name}</div>
                          <span className="text-xs text-neutral-400">{player.position} · {player.age} yrs · {player.flag} {player.nationality}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Coach's Match Directive:</span>
                      <p className="text-xs text-neutral-200 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 leading-relaxed">
                        "{slot.instruction}"
                      </p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-black/60 rounded-3xl border border-neutral-800 p-8 text-center space-y-2">
                <RefreshCw className="w-8 h-8 text-emerald-400 mx-auto animate-spin duration-3000" />
                <h4 className="font-bold text-white text-sm uppercase">Interactive Dugout Ready</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Click any player node on the virtual pitch to reveal Coach Simeon’s strategic phase directives.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
