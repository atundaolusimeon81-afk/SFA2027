import { useState } from 'react';
import { 
  UPCOMING_FIXTURES, 
  RECENT_RESULTS, 
  LEAGUE_STANDINGS, 
  CLUB_INFO, 
  TableRow 
} from '../data/clubData';
import { Calendar, Trophy, ChevronRight, Ticket, ArrowUpDown } from 'lucide-react';

interface FixturesAndTableProps {
  onOpenTickets: () => void;
}

export function FixturesAndTable({ onOpenTickets }: FixturesAndTableProps) {
  const [subTab, setSubTab] = useState<'fixtures' | 'results' | 'table'>('table');
  const [sortBy, setSortBy] = useState<'points' | 'gd' | 'gf'>('points');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Sorting for standings
  const sortedStandings = [...LEAGUE_STANDINGS].sort((a: TableRow, b: TableRow) => {
    let diff = 0;
    if (sortBy === 'points') diff = b.points - a.points;
    else if (sortBy === 'gd') diff = b.gd - a.gd;
    else if (sortBy === 'gf') diff = b.gf - a.gf;
    return sortAsc ? -diff : diff;
  });

  const toggleSort = (col: 'points' | 'gd' | 'gf') => {
    if (sortBy === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(col);
      setSortAsc(false);
    }
  };

  return (
    <section id="matches" className="py-20 bg-neutral-950 text-white border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>Competition Center</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading mt-1 uppercase tracking-tight">
              Fixtures, Results & Standings
            </h2>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-black rounded-xl border border-neutral-800 shrink-0">
            <button
              onClick={() => setSubTab('table')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                subTab === 'table'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              League Table
            </button>
            <button
              onClick={() => setSubTab('fixtures')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                subTab === 'fixtures'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Fixtures
            </button>
            <button
              onClick={() => setSubTab('results')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                subTab === 'results'
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Recent Results
            </button>
          </div>
        </div>

        {/* Tab 1: League Table */}
        {subTab === 'table' && (
          <div className="bg-black rounded-3xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-black border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white uppercase font-heading">
                  Premier Super League 2026/27
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">Matchday 20 of 30 · Simolat Sporting FC holds top spot</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-white">Champions Cup (1-2)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                  <span>Continental Cup (3-4)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Relegation (9-10)</span>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">Pos</th>
                    <th className="py-3.5 px-4">Club</th>
                    <th className="py-3.5 px-3 text-center">P</th>
                    <th className="py-3.5 px-3 text-center">W</th>
                    <th className="py-3.5 px-3 text-center">D</th>
                    <th className="py-3.5 px-3 text-center">L</th>
                    <th 
                      onClick={() => toggleSort('gf')} 
                      className="py-3.5 px-3 text-center cursor-pointer hover:text-white"
                      title="Click to sort by Goals For"
                    >
                      <span className="inline-flex items-center gap-1">GF <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                    <th className="py-3.5 px-3 text-center">GA</th>
                    <th 
                      onClick={() => toggleSort('gd')} 
                      className="py-3.5 px-3 text-center cursor-pointer hover:text-white"
                      title="Click to sort by Goal Difference"
                    >
                      <span className="inline-flex items-center gap-1">GD <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                    <th 
                      onClick={() => toggleSort('points')} 
                      className="py-3.5 px-4 text-center cursor-pointer text-emerald-400 hover:text-emerald-300"
                      title="Click to sort by Points"
                    >
                      <span className="inline-flex items-center gap-1">PTS <ArrowUpDown className="w-3 h-3" /></span>
                    </th>
                    <th className="py-3.5 px-4 text-center hidden md:table-cell">Recent Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {sortedStandings.map((row) => {
                    const isSimolat = row.isSimolat;
                    return (
                      <tr 
                        key={row.team}
                        className={`transition-colors ${
                          isSimolat 
                            ? 'bg-emerald-950/50 hover:bg-emerald-900/50 font-semibold text-white border-l-4 border-emerald-400' 
                            : 'hover:bg-neutral-900/60 text-neutral-300'
                        }`}
                      >
                        {/* Position */}
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                            row.position <= 2 
                              ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600/60' 
                              : row.position <= 4 
                              ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' 
                              : row.position >= 9 
                              ? 'bg-red-950/60 text-red-400 border border-red-800/40' 
                              : 'text-neutral-400'
                          }`}>
                            {row.position}
                          </span>
                        </td>

                        {/* Team Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            {isSimolat ? (
                              <img 
                                src={CLUB_INFO.crestImage} 
                                alt="Crest" 
                                referrerPolicy="no-referrer"
                                className="w-6 h-6 object-contain shrink-0" 
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs shrink-0">
                                ⚽
                              </div>
                            )}
                            <span className={isSimolat ? 'text-white font-extrabold' : 'font-medium'}>
                              {row.team}
                            </span>
                            {isSimolat && (
                              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500 text-black font-black">
                                Club
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stats */}
                        <td className="py-3.5 px-3 text-center text-neutral-200 font-medium">{row.played}</td>
                        <td className="py-3.5 px-3 text-center text-neutral-200">{row.won}</td>
                        <td className="py-3.5 px-3 text-center text-neutral-400">{row.drawn}</td>
                        <td className="py-3.5 px-3 text-center text-neutral-400">{row.lost}</td>
                        <td className="py-3.5 px-3 text-center text-neutral-200">{row.gf}</td>
                        <td className="py-3.5 px-3 text-center text-neutral-400">{row.ga}</td>
                        <td className={`py-3.5 px-3 text-center font-bold ${row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-red-400' : 'text-neutral-400'}`}>
                          {row.gd > 0 ? `+${row.gd}` : row.gd}
                        </td>
                        <td className="py-3.5 px-4 text-center font-black text-emerald-400 text-base">
                          {row.points}
                        </td>

                        {/* Form */}
                        <td className="py-3.5 px-4 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {row.form.map((res, i) => (
                              <span 
                                key={i}
                                className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                  res === 'W' 
                                    ? 'bg-emerald-600 text-white' 
                                    : res === 'D' 
                                    ? 'bg-slate-700 text-slate-300' 
                                    : 'bg-red-600 text-white'
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Upcoming Fixtures */}
        {subTab === 'fixtures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UPCOMING_FIXTURES.map((match) => (
              <div 
                key={match.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-6 hover:border-amber-500/40 transition-all shadow-xl group relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-base">{match.competitionBadge}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {match.competition}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {match.date}
                  </span>
                </div>

                <div className="py-6 flex items-center justify-between">
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 border border-slate-700 p-1 flex items-center justify-center mb-2">
                      <img 
                        src={CLUB_INFO.crestImage} 
                        alt="Simolat FC" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="font-bold text-white text-sm">Simolat FC</div>
                    <span className="text-[10px] text-amber-400 uppercase font-semibold">Home</span>
                  </div>

                  <div className="px-4 text-center">
                    <div className="text-xs font-black uppercase text-amber-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                      {match.time}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Live Broadcast</span>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl mb-2">
                      {match.opponentBadge}
                    </div>
                    <div className="font-bold text-slate-200 text-sm">{match.opponent}</div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Away</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{match.stadium}</span>
                  </div>

                  <button
                    onClick={onOpenTickets}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Get Tickets</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Recent Results */}
        {subTab === 'results' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECENT_RESULTS.map((res) => {
              const isWin = (res.homeScore ?? 0) > (res.awayScore ?? 0);
              const isDraw = (res.homeScore ?? 0) === (res.awayScore ?? 0);

              return (
                <div 
                  key={res.id}
                  className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {res.competition} · {res.date}
                    </span>
                    <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded ${
                      isWin ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      isDraw ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {isWin ? 'VICTORY' : isDraw ? 'DRAW' : 'DEFEAT'}
                    </span>
                  </div>

                  {/* Match Score Display */}
                  <div className="py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <img 
                        src={CLUB_INFO.crestImage} 
                        alt="Simolat FC" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <div className="font-bold text-white text-base">Simolat FC</div>
                        <span className="text-xs text-slate-400">{res.isHome ? 'Home' : 'Away'}</span>
                      </div>
                    </div>

                    <div className="px-5 text-center">
                      <div className="text-3xl font-black font-heading text-amber-400 tracking-wider">
                        {res.homeScore} - {res.awayScore}
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Full Time</span>
                    </div>

                    <div className="flex items-center justify-end gap-3 flex-1 text-right">
                      <div>
                        <div className="font-bold text-slate-300 text-base">{res.opponent}</div>
                        <span className="text-xs text-slate-400">{res.isHome ? 'Away' : 'Home'}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl">
                        {res.opponentBadge}
                      </div>
                    </div>
                  </div>

                  {/* Goal Scorers list */}
                  {res.scorers && res.scorers.length > 0 && (
                    <div className="mt-2 pt-3 border-t border-slate-850/80 bg-slate-900/40 -mx-6 -mb-6 p-4">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Key Scorers
                      </div>
                      <div className="text-xs text-slate-300 space-y-0.5">
                        {res.scorers.map((scorer, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span>⚽</span>
                            <span>{scorer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
