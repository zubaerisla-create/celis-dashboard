// app/admin/analytics/page.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChevronDown, Download, TrendingUp } from 'lucide-react';

// ── Mock data ───────────────────────────────────────────────────────────────

const userGrowth = [
  { month: 'Jan', users: 7200 },
  { month: 'Feb', users: 8500 },
  { month: 'Mar', users: 9800 },
  { month: 'Apr', users: 11200 },
  { month: 'May', users: 12800 },
  { month: 'Jun', users: 14700 },
];

const retentionRate = [
  { month: 'Jan', rate: 78 },
  { month: 'Feb', rate: 76 },
  { month: 'Mar', rate: 75 },
  { month: 'Apr', rate: 79 },
  { month: 'May', rate: 81 },
  { month: 'Jun', rate: 83 },
];

const revenueByTier = [
  { name: 'Ignite', value: 68373, color: '#3b82f6' },
  { name: 'Launch', value: 117541, color: '#a855f7' },
  { name: 'Excel', value: 88982, color: '#f59e0b' },
];

const topGenres = [
  { genre: 'Hip-Hop', revenue: 3200 },
  { genre: 'Pop', revenue: 2800 },
  { genre: 'Electronic', revenue: 2100 },
  { genre: 'Rock', revenue: 850 },
];

const topCreators = [
  { rank: 1, name: 'Sarah Johnson', earnings: 12450, licenses: 47, avg: 264.89 },
  { rank: 2, name: 'Michael Chen', earnings: 8930, licenses: 38, avg: 235.00 },
  { rank: 3, name: 'Emily Davis', earnings: 8290, licenses: 32, avg: 259.06 },
  { rank: 4, name: 'James Wilson', earnings: 7650, licenses: 29, avg: 263.79 },
  { rank: 5, name: 'Lisa Anderson', earnings: 6920, licenses: 28, avg: 246.43 },
];

// ── Components ─────────────────────────────────────────────────────────────

const KpiCard = ({
  title,
  value,
  change,
  changeColor = 'text-emerald-400',
  subtitle,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeColor?: string;
  subtitle?: string;
}) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <div className="text-sm text-gray-400 mb-2">{title}</div>
    <div className="text-3xl font-bold">{value}</div>
    {change && (
      <div className={`text-sm mt-2 ${changeColor}`}>{change}</div>
    )}
    {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
  </div>
);

const COLORS = ['#3b82f6', '#a855f7', '#f59e0b'];

export default function AnalyticsReports() {
  return (
    <div className="min-h-screen bg-gray text-gray-100 ">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
        
            <h1 className="text-2xl font-bold">Analytics & Reports</h1>
            <p className="text-gray-400 mt-1">Platform performance and insights</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-36">
              <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm appearance-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard title="Active Collaborations" value="1,247" change="+7.5% this month" />
          <KpiCard title="Brief Conversion Rate" value="38.5%" change="+42.2% improvement" changeColor="text-emerald-400" />
          <KpiCard title="Avg License Value" value="$285" subtitle="Across all tiers" />
          <KpiCard title="Platform Uptime" value="99.9%" subtitle="Excellent" changeColor="text-emerald-400" />
        </div>

        {/* Charts - 2×2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* User Growth */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-5">User Growth</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#1f2937', border: 'none' }} />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Retention Rate */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-5">Retention Rate (%)</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={retentionRate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis domain={[0, 100]} stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#1f2937', border: 'none' }} />
                  <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Tier (Donut) */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-5">Revenue by Tier</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-72">
              <div className="w-56 h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={revenueByTier}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {revenueByTier.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1f2937', border: 'none' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 text-sm">
                {revenueByTier.map((tier) => (
                  <div key={tier.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }} />
                    <div>
                      <div className="font-medium">{tier.name}</div>
                      <div className="text-gray-400">${tier.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Genres */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-5">Top Genres</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={topGenres} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="genre" type="category" stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#1f2937', border: 'none' }} />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Earning Creators */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Top Earning Creators</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">RANK</th>
                  <th className="text-left p-4 font-medium">CREATOR</th>
                  <th className="text-left p-4 font-medium">TOTAL EARNINGS</th>
                  <th className="text-left p-4 font-medium">LICENSES SOLD</th>
                  <th className="text-left p-4 font-medium">AVG PER LICENSE</th>
                </tr>
              </thead>
              <tbody>
                {topCreators.map((creator) => (
                  <tr key={creator.rank} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">#{creator.rank}</td>
                    <td className="p-4 font-medium">{creator.name}</td>
                    <td className="p-4 font-medium text-emerald-400">
                      ${creator.earnings.toLocaleString()}
                    </td>
                    <td className="p-4">{creator.licenses}</td>
                    <td className="p-4 font-medium">${creator.avg.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}