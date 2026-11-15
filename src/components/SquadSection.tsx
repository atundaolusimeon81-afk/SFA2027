import { useState } from 'react';
import { SQUAD_PLAYERS, TECHNICAL_STAFF, Player } from '../data/clubData';
import { Users, Award, Shield, ArrowRight, X } from 'lucide-react';

interface SquadSectionProps {
  onCustomizeJersey: (playerName: string, playerNum: number) => void;
}

export function SquadSection({ onCustomizeJersey }: SquadSectionProps) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = SQUAD_PLAYERS.filter((player) => {
    if (filter === 'All') return true;
    if (filter === 'Goalkeepers') return player.position === 'Goalkeeper';
    if (filter === 'Defenders') return player.position === 'Defender';
    if (filter === 'Midfielders') return player.position === 'Midfielder';
    if (filter === 'Forwards') return player.position === 'Forward';
    return true;
  });

  return (
    <section id="squad" className="py-20 bg-white text-neutral-900 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-emerald-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Simolat Sporting FC First Team</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black font-heading mt-1 uppercase tracking-tight">
              Meet The Lions Squad
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl">
              Engineered with world-class international stars and elite academy graduates, led by Head Coach Simeon Atundaolu.
            </p>
          </div>

          {/* Filter segment */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-300">
            {['All', 'Goalkeepers', 'Defenders', 'Midfielders', 'Forwards', 'Staff'].map((pos) => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  filter === pos
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Staff Tab View */}
        {filter === 'Staff' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNICAL_STAFF.map((staff, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 text-center hover:border-amber-500/40 transition-all shadow-xl"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-950 to-slate-800 border-2 border-amber-400/60 flex items-center justify-center text-3xl mb-4 shadow-lg">
                  👔
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {staff.role}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">{staff.name}</h4>
                <p className="text-xs text-slate-400 mt-2">{staff.exp}</p>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  Origin: {staff.nationality}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Players Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group relative bg-white rounded-2xl border-2 border-neutral-200 hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                {/* Top card banner */}
                <div className="relative h-48 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 p-4 flex flex-col justify-between overflow-hidden">
                  
                  {/* Background Watermark Number */}
                  <span className="absolute -right-2 -top-6 text-9xl font-black text-neutral-800/40 select-none font-heading group-hover:text-emerald-500/10 transition-colors">
                    {player.number}
                  </span>

                  {/* Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 px-2.5 py-0.5 rounded-full bg-black/80 border border-emerald-500/40 backdrop-blur-sm">
                      {player.position}
                    </span>
                    {player.isCaptain && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-400 text-black shadow">
                        Captain ©
                      </span>
                    )}
                    {player.isStarPlayer && !player.isCaptain && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white text-black shadow flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-600" /> Top Form
                      </span>
                    )}
                  </div>

                  {/* Player Image / Avatar Visual */}
                  <div className="relative z-10 flex items-end justify-between mt-auto">
                    {player.photoUrl ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xl bg-black">
                        <img 
                          src={player.photoUrl} 
                          alt={player.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center text-center p-2 shadow-lg">
                        <Shield className="w-6 h-6 text-emerald-400 mb-1" />
                        <span className="text-[10px] font-bold text-neutral-300"># {player.number}</span>
                      </div>
                    )}

                    <div className="text-right">
                      <div className="text-4xl font-black text-emerald-400 font-heading">
                        #{player.number}
                      </div>
                      <div className="text-xs text-neutral-400 font-medium">
                        Rating: <strong className="text-white">{player.rating}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body Info (White Surface) */}
                <div className="p-5 space-y-4 bg-white">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                      <span>{player.flag}</span>
                      <span>{player.nationality}</span>
                      <span>·</span>
                      <span>{player.age} yrs</span>
                    </div>
                    <h3 className="text-lg font-black text-black mt-1 group-hover:text-emerald-700 transition-colors uppercase font-heading tracking-wide">
                      {player.name}
                    </h3>
                  </div>

                  {/* Quick Stat Pill Row */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                    <div>
                      <div className="text-sm font-black text-black">{player.appearances}</div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Apps</div>
                    </div>
                    <div>
                      <div className="text-sm font-black text-emerald-600">
                        {player.position === 'Goalkeeper' ? player.cleanSheets : player.goals}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">
                        {player.position === 'Goalkeeper' ? 'Clean Sh' : 'Goals'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-black text-neutral-800">
                        {player.position === 'Goalkeeper' ? player.height : player.assists}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">
                        {player.position === 'Goalkeeper' ? 'Height' : 'Assists'}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between text-xs pt-1 font-bold text-emerald-700 group-hover:text-emerald-900">
                    <span>View player dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/60 p-6 border-b border-slate-800">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-lg shrink-0 overflow-hidden">
                  {selectedPlayer.photoUrl ? (
                    <img 
                      src={selectedPlayer.photoUrl} 
                      alt={selectedPlayer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="font-heading font-black text-amber-400 text-2xl">
                      #{selectedPlayer.number}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    <span>{selectedPlayer.flag} {selectedPlayer.nationality}</span>
                    <span>·</span>
                    <span>{selectedPlayer.position}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-heading mt-0.5 uppercase">
                    {selectedPlayer.fullName}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium">
                    Squad #{selectedPlayer.number} · Market Value: <span className="text-emerald-400 font-bold">{selectedPlayer.marketValue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Detailed Metrics */}
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-lg font-black text-white font-heading">{selectedPlayer.appearances}</div>
                  <div className="text-[10px] uppercase text-slate-400">Match Apps</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-400 font-heading">
                    {selectedPlayer.position === 'Goalkeeper' ? (selectedPlayer.cleanSheets ?? 0) : selectedPlayer.goals}
                  </div>
                  <div className="text-[10px] uppercase text-slate-400">
                    {selectedPlayer.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-400 font-heading">{selectedPlayer.assists}</div>
                  <div className="text-[10px] uppercase text-slate-400">Assists</div>
                </div>
                <div>
                  <div className="text-lg font-black text-blue-400 font-heading">{selectedPlayer.rating}</div>
                  <div className="text-[10px] uppercase text-slate-400">Match Rating</div>
                </div>
              </div>

              {/* Bio & Scouting Report */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tactical Profile & Scouting Report
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedPlayer.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onCustomizeJersey(selectedPlayer.name, selectedPlayer.number);
                    setSelectedPlayer(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Order Official #{selectedPlayer.number} Jersey
                </button>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
