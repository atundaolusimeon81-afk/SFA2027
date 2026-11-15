import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  TrendingDown, 
  Activity, 
  PieChart as PieIcon, 
  BarChart3,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';

// Monthly trend data over the full last season (2025/26)
const MONTHLY_INJURY_TRENDS = [
  { month: 'Aug', incidents: 2, muscleStrain: 1, jointLigament: 1, contact: 0, daysLost: 18, matchloadHours: 28 },
  { month: 'Sep', incidents: 3, muscleStrain: 2, jointLigament: 1, contact: 0, daysLost: 26, matchloadHours: 42 },
  { month: 'Oct', incidents: 4, muscleStrain: 3, jointLigament: 1, contact: 0, daysLost: 45, matchloadHours: 56 },
  { month: 'Nov', incidents: 3, muscleStrain: 1, jointLigament: 1, contact: 1, daysLost: 30, matchloadHours: 48 },
  { month: 'Dec', incidents: 5, muscleStrain: 3, jointLigament: 1, contact: 1, daysLost: 58, matchloadHours: 64 }, // Festive congestion spike
  { month: 'Jan', incidents: 2, muscleStrain: 1, jointLigament: 0, contact: 1, daysLost: 16, matchloadHours: 32 }, // Interventions applied
  { month: 'Feb', incidents: 3, muscleStrain: 2, jointLigament: 1, contact: 0, daysLost: 24, matchloadHours: 50 },
  { month: 'Mar', incidents: 4, muscleStrain: 2, jointLigament: 2, contact: 0, daysLost: 38, matchloadHours: 54 },
  { month: 'Apr', incidents: 2, muscleStrain: 1, jointLigament: 1, contact: 0, daysLost: 20, matchloadHours: 46 },
  { month: 'May', incidents: 1, muscleStrain: 0, jointLigament: 1, contact: 0, daysLost: 12, matchloadHours: 38 },
];

// Injury type breakdown aligned with White, Green, and Black theme
const INJURY_TYPE_DATA = [
  { name: 'Hamstring Strains', count: 9, percentage: 31, color: '#10b981' }, // Emerald green
  { name: 'Ankle Sprains (ATFL)', count: 6, percentage: 21, color: '#34d399' }, // Light mint
  { name: 'Adductor & Groin', count: 5, percentage: 17, color: '#059669' }, // Deep green
  { name: 'Knee & Ligaments', count: 4, percentage: 14, color: '#ffffff' }, // Pure white
  { name: 'Calf & Achilles', count: 3, percentage: 10, color: '#047857' }, // Forest green
  { name: 'Contusions & Other', count: 2, percentage: 7, color: '#6ee7b7' }, // Mint accent
];

// Breakdown by player positions
const POSITION_INJURY_DATA = [
  { position: 'Forwards (FW)', incidents: 10, daysLost: 94, avgReturnDays: 9.4, highSpeedRunningM: 980 },
  { position: 'Midfielders (MF)', incidents: 9, daysLost: 88, avgReturnDays: 9.7, highSpeedRunningM: 820 },
  { position: 'Defenders (DF)', incidents: 8, daysLost: 76, avgReturnDays: 9.5, highSpeedRunningM: 590 },
  { position: 'Goalkeepers (GK)', incidents: 2, daysLost: 16, avgReturnDays: 8.0, highSpeedRunningM: 140 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey?: string;
  }>;
  label?: string;
}

const CustomChartTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 border-2 border-emerald-500/50 p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
        <p className="font-heading font-black text-emerald-400 text-sm uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-mono font-bold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function InjuryTrendsChart() {
  const [chartView, setChartView] = useState<'trends' | 'subtypes' | 'positions'>('trends');
  const [trendMetric, setTrendMetric] = useState<'incidents' | 'daysLost'>('incidents');

  const totalIncidents = MONTHLY_INJURY_TRENDS.reduce((sum, item) => sum + item.incidents, 0);
  const totalDaysLost = MONTHLY_INJURY_TRENDS.reduce((sum, item) => sum + item.daysLost, 0);
  const muscleIncidents = MONTHLY_INJURY_TRENDS.reduce((sum, item) => sum + item.muscleStrain, 0);

  return (
    <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-8">
      
      {/* Header with Navigation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Sports Science Longitudinal Analytics · Recharts</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mt-1 uppercase tracking-tight">
            Last Season Injury Frequency Trends (2025/26)
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Longitudinal epidemiology tracking monthly incident spikes, soft-tissue strain patterns, and days lost across fixture congestion blocks.
          </p>
        </div>

        {/* View Switcher Controls (White, Green & Black) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 rounded-2xl border border-neutral-800 shrink-0">
          <button
            onClick={() => setChartView('trends')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              chartView === 'trends'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Monthly Curve</span>
          </button>

          <button
            onClick={() => setChartView('subtypes')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              chartView === 'subtypes'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Tissue Distribution</span>
          </button>

          <button
            onClick={() => setChartView('positions')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              chartView === 'positions'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Positional Load</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip in White, Green & Black */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Season Incidents</span>
          <div className="text-3xl font-black text-emerald-400 font-heading mt-1">
            {totalIncidents} <span className="text-sm font-normal text-neutral-400">cases</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
            <TrendingDown className="w-3 h-3" /> 28% below league average
          </span>
        </div>

        <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Days Sidelined</span>
          <div className="text-3xl font-black text-white font-heading mt-1">
            {totalDaysLost} <span className="text-sm font-normal text-neutral-400">days</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-semibold">
            Avg. 7.5 days per incident
          </span>
        </div>

        <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Muscle & Hamstring Share</span>
          <div className="text-3xl font-black text-emerald-300 font-heading mt-1">
            {Math.round((muscleIncidents / totalIncidents) * 100)}%
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            Primary focus of NordBord screening
          </span>
        </div>

        <div className="bg-neutral-900/90 p-4 rounded-2xl border border-emerald-500/25">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Squad Availability Rate</span>
          <div className="text-3xl font-black text-white font-heading mt-1">
            88.4%
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Top tier in Super League
          </span>
        </div>
      </div>

      {/* VIEW 1: MONTHLY TRENDS (Recharts AreaChart / BarChart) */}
      {chartView === 'trends' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Monthly Injury Frequency & Tissue Strain Progression
              </h4>
              <p className="text-xs text-neutral-400">
                Notice the peak in December ({trendMetric === 'incidents' ? '5 incidents' : '58 days lost'}) correlating with congested midweek fixtures.
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                onClick={() => setTrendMetric('incidents')}
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                  trendMetric === 'incidents'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Incident Count
              </button>
              <button
                onClick={() => setTrendMetric('daysLost')}
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                  trendMetric === 'daysLost'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Days Lost
              </button>
            </div>
          </div>

          {/* Recharts Area Chart in White, Green and Black */}
          <div className="h-80 w-full bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
            <ResponsiveContainer width="100%" height="100%">
              {trendMetric === 'incidents' ? (
                <AreaChart data={MONTHLY_INJURY_TRENDS} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalIncidentsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="muscleStrainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="jointLigamentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#a3a3a3" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#a3a3a3" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="incidents"
                    name="Total Incidents"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#totalIncidentsGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="muscleStrain"
                    name="Muscle & Hamstring"
                    stroke="#34d399"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#muscleStrainGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="jointLigament"
                    name="Joint & Ligament"
                    stroke="#ffffff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#jointLigamentGrad)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={MONTHLY_INJURY_TRENDS} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#a3a3a3" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#a3a3a3" tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}
                  />
                  <Bar
                    dataKey="daysLost"
                    name="Total Days Lost"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Clinical Trend Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Peak Exposure: Festive Congestion
              </span>
              <p className="text-xs text-neutral-300">
                December experienced 5 injuries due to 7 matches in 21 days. 4 of 5 were soft-tissue fatigue related.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                Intervention Success: January Drop
              </span>
              <p className="text-xs text-neutral-300">
                Implemented mandatory 48-hour recovery protocols & NordBord strength checks, reducing January incidents to just 2.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Spring Surge & Title Run
              </span>
              <p className="text-xs text-neutral-300">
                March experienced 4 cases during Champions Cup quarter-finals, managed successfully back to pitch within 9 days average.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TISSUE DISTRIBUTION (Recharts PieChart & Breakdown) */}
      {chartView === 'subtypes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Pie Chart Display (6 Cols) */}
          <div className="lg:col-span-6 h-80 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INJURY_TYPE_DATA}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={55}
                  paddingAngle={4}
                  stroke="#000000"
                  strokeWidth={2}
                >
                  {INJURY_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} incidents`, name]}
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#10b981', borderRadius: '12px', fontSize: '12px', color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black font-heading text-white">{totalIncidents}</span>
              <span className="text-[10px] uppercase font-bold text-emerald-400">Total Cases</span>
            </div>
          </div>

          {/* Detailed Distribution Breakdown (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="pb-2 border-b border-neutral-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Anatomical Tissue Diagnosis Breakdown
              </h4>
              <p className="text-xs text-neutral-400">
                Hamstring and posterior chain strains constitute the single greatest epidemiological threat in elite football.
              </p>
            </div>

            <div className="space-y-2">
              {INJURY_TYPE_DATA.map((type) => (
                <div
                  key={type.name}
                  className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: type.color }} />
                    <div>
                      <div className="text-xs font-bold text-white">{type.name}</div>
                      <span className="text-[10px] text-neutral-400">{type.percentage}% of all squad injuries</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-heading font-black text-white text-base">{type.count}</span>
                    <span className="text-[10px] text-neutral-400 block">cases</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: POSITIONAL LOAD BREAKDOWN (Recharts BarChart) */}
      {chartView === 'positions' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-neutral-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Injury Distribution by Tactical Role & Sprint Volume
            </h4>
            <p className="text-xs text-neutral-400">
              Forwards and Wingers sustain the highest injury count (10 incidents) due to maximum velocity sprinting (&gt;25.2 km/h) and eccentric decelerations.
            </p>
          </div>

          <div className="h-80 w-full bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={POSITION_INJURY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.6} />
                <XAxis dataKey="position" stroke="#a3a3a3" tick={{ fontSize: 11 }} />
                <YAxis stroke="#a3a3a3" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}
                />
                <Bar dataKey="incidents" name="Injury Incidents" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avgReturnDays" name="Avg Return Days" fill="#ffffff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {POSITION_INJURY_DATA.map((pos) => (
              <div key={pos.position} className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                <span className="font-bold text-white uppercase text-xs block">{pos.position}</span>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Total Incidents:</span>
                  <strong className="text-emerald-400">{pos.incidents}</strong>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Total Days Out:</span>
                  <strong className="text-white">{pos.daysLost} d</strong>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Avg HSR / Match:</span>
                  <strong className="text-emerald-400">{pos.highSpeedRunningM} m</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
