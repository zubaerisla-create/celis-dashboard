"use client"

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, FileText, DollarSign, AlertTriangle, ChevronDown, Download } from 'lucide-react';

type TimeFilter = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

// Define data types
type UserGrowthData = {
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  users: number;
};

type RevenueGrowthData = {
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  revenue: number;
};

type BriefSubmissionsData = {
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  count: number;
};

export default function DashboardOverview() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Monthly');
  const [showDropdown, setShowDropdown] = useState(false);

  // ── Sample data (replace with your real API data later)
  const allUserGrowth: Record<TimeFilter, UserGrowthData[]> = {
    Weekly: [
      { week: 'W1', users: 2200 },
      { week: 'W2', users: 2500 },
      { week: 'W3', users: 2800 },
      { week: 'W4', users: 3100 },
      { week: 'W5', users: 3400 },
      { week: 'W6', users: 3600 },
    ],
    Monthly: [
      { month: 'Jan', users: 9500 },
      { month: 'Feb', users: 10500 },
      { month: 'Mar', users: 11800 },
      { month: 'Apr', users: 12400 },
      { month: 'May', users: 13000 },
      { month: 'Jun', users: 12543 },
    ],
    Quarterly: [
      { quarter: 'Q1', users: 31800 },
      { quarter: 'Q2', users: 37943 },
      { quarter: 'Q3', users: 42000 },
      { quarter: 'Q4', users: 48500 },
    ],
    Yearly: [
      { year: '2021', users: 45000 },
      { year: '2022', users: 52000 },
      { year: '2023', users: 58000 },
      { year: '2024', users: 63000 },
    ],
  };

  const allRevenueGrowth: Record<TimeFilter, RevenueGrowthData[]> = {
    Weekly: [
      { week: 'W1', revenue: 8500 },
      { week: 'W2', revenue: 10200 },
      { week: 'W3', revenue: 11800 },
      { week: 'W4', revenue: 13500 },
      { week: 'W5', revenue: 15200 },
      { week: 'W6', revenue: 16800 },
    ],
    Monthly: [
      { month: 'Jan', revenue: 32000 },
      { month: 'Feb', revenue: 36000 },
      { month: 'Mar', revenue: 41000 },
      { month: 'Apr', revenue: 44500 },
      { month: 'May', revenue: 47000 },
      { month: 'Jun', revenue: 48392 },
    ],
    Quarterly: [
      { quarter: 'Q1', revenue: 109000 },
      { quarter: 'Q2', revenue: 139892 },
      { quarter: 'Q3', revenue: 165000 },
      { quarter: 'Q4', revenue: 192000 },
    ],
    Yearly: [
      { year: '2021', revenue: 380000 },
      { year: '2022', revenue: 445000 },
      { year: '2023', revenue: 512000 },
      { year: '2024', revenue: 589000 },
    ],
  };

  const allBriefSubmissions: Record<TimeFilter, BriefSubmissionsData[]> = {
    Weekly: [
      { week: 'W1', count: 65 },
      { week: 'W2', count: 78 },
      { week: 'W3', count: 92 },
      { week: 'W4', count: 105 },
      { week: 'W5', count: 118 },
      { week: 'W6', count: 130 },
    ],
    Monthly: [
      { month: 'Jan', count: 280 },
      { month: 'Feb', count: 320 },
      { month: 'Mar', count: 380 },
      { month: 'Apr', count: 420 },
      { month: 'May', count: 450 },
      { month: 'Jun', count: 480 },
    ],
    Quarterly: [
      { quarter: 'Q1', count: 980 },
      { quarter: 'Q2', count: 1350 },
      { quarter: 'Q3', count: 1580 },
      { quarter: 'Q4', count: 1820 },
    ],
    Yearly: [
      { year: '2021', count: 4200 },
      { year: '2022', count: 5100 },
      { year: '2023', count: 5950 },
      { year: '2024', count: 6800 },
    ],
  };

  // KPI data based on time filter
  const getKpiData = useMemo(() => {
    switch(timeFilter) {
      case 'Weekly':
        return {
          totalUsers: '3,600',
          activeUsers: '2,450',
          activeBriefs: '18',
          monthlyRevenue: '$16,800',
          totalSubmissions: '130',
          flaggedContent: '8',
          revenueGrowth: '+12.4%',
          userGrowth: '+8.2%'
        };
      case 'Monthly':
        return {
          totalUsers: '12,543',
          activeUsers: '8,234',
          activeBriefs: '23',
          monthlyRevenue: '$48,392',
          totalSubmissions: '480',
          flaggedContent: '12',
          revenueGrowth: '+18.3%',
          userGrowth: '+12.5%'
        };
      case 'Quarterly':
        return {
          totalUsers: '48,500',
          activeUsers: '32,150',
          activeBriefs: '31',
          monthlyRevenue: '$192,000',
          totalSubmissions: '1,820',
          flaggedContent: '24',
          revenueGrowth: '+22.1%',
          userGrowth: '+16.8%'
        };
      case 'Yearly':
        return {
          totalUsers: '63,000',
          activeUsers: '45,200',
          activeBriefs: '42',
          monthlyRevenue: '$589,000',
          totalSubmissions: '6,800',
          flaggedContent: '45',
          revenueGrowth: '+15.2%',
          userGrowth: '+14.3%'
        };
      default:
        return {
          totalUsers: '12,543',
          activeUsers: '8,234',
          activeBriefs: '23',
          monthlyRevenue: '$48,392',
          totalSubmissions: '480',
          flaggedContent: '12',
          revenueGrowth: '+18.3%',
          userGrowth: '+12.5%'
        };
    }
  }, [timeFilter]);

  const subscriptionData = [
    { name: 'Ignite', value: 8343, color: '#3b82f6' },
    { name: 'Launch', value: 5000, color: '#10b981' },
    { name: 'Excel', value: 1786, color: '#f59e0b' },
  ];

  // Get current data based on filter
  const currentUserGrowth = allUserGrowth[timeFilter];
  const currentRevenueGrowth = allRevenueGrowth[timeFilter];
  const currentBriefSubmissions = allBriefSubmissions[timeFilter];

  // Get the correct data key for XAxis
  const getUserGrowthDataKey = () => {
    if (timeFilter === 'Weekly') return 'week';
    if (timeFilter === 'Monthly') return 'month';
    if (timeFilter === 'Quarterly') return 'quarter';
    return 'year';
  };

  const getRevenueGrowthDataKey = () => {
    if (timeFilter === 'Weekly') return 'week';
    if (timeFilter === 'Monthly') return 'month';
    if (timeFilter === 'Quarterly') return 'quarter';
    return 'year';
  };

  const getBriefSubmissionsDataKey = () => {
    if (timeFilter === 'Weekly') return 'week';
    if (timeFilter === 'Monthly') return 'month';
    if (timeFilter === 'Quarterly') return 'quarter';
    return 'year';
  };

  // Export function
  const handleExport = () => {
    // Prepare data for export
    const exportData = {
      timeFilter,
      kpiData: getKpiData,
      userGrowth: currentUserGrowth,
      revenueGrowth: currentRevenueGrowth,
      briefSubmissions: currentBriefSubmissions,
      subscriptionData,
      exportedAt: new Date().toISOString()
    };

    // Convert to JSON string
    const dataStr = JSON.stringify(exportData, null, 2);
    
    // Create download link
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    // Create filename with current date
    const exportFileDefaultName = `dashboard-overview-${timeFilter.toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    
    // Create link element and trigger download
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100  font-sans">
      <div className="max-w-9xl mx-auto space-y-4 sm:space-y-6">
        {/* Header with Dropdown and Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard Overview</h1>
          
          <div className="flex items-center gap-3">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg border border-emerald-500 text-sm font-medium transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export Overview</span>
              <span className="sm:hidden">Export</span>
            </button>

            {/* Custom Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-sm w-36 sm:w-40 focus:outline-none focus:border-blue-500"
              >
                <span>{timeFilter}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-1 w-36 sm:w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                  {(['Weekly', 'Monthly', 'Quarterly', 'Yearly'] as TimeFilter[]).map((filter, index) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setTimeFilter(filter);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors ${
                        timeFilter === filter ? 'bg-gray-700 text-white' : 'text-gray-300'
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${index === 3 ? 'rounded-b-lg' : ''}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Total Users"
            value={getKpiData.totalUsers}
            change={`+${getKpiData.userGrowth}`}
            changeColor="text-emerald-400"
          />
          <KpiCard
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Active Users"
            value={getKpiData.activeUsers}
            subtitle="(monthly)"
            change="+8.7%"
            changeColor="text-emerald-400"
          />
          <KpiCard
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Active Briefs"
            value={getKpiData.activeBriefs}
            change="-3"
            changeColor="text-red-400"
          />
          <KpiCard
            icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Monthly Revenue"
            value={getKpiData.monthlyRevenue}
            change={`+${getKpiData.revenueGrowth}`}
            changeColor="text-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Additional KPIs row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:col-span-2">
            <KpiCard
              icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="Total Submissions"
              value={getKpiData.totalSubmissions}
              change="+24%"
              changeColor="text-emerald-400"
              small
            />
            <KpiCard
              icon={<AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="Flagged Content"
              value={getKpiData.flaggedContent}
              change="-2"
              changeColor="text-red-400"
              small
            />
            <KpiCard
              icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
              title="Revenue Growth"
              value={getKpiData.revenueGrowth}
              small
            />
          </div>

          {/* Charts */}
          <ChartCard title={`User Growth (${timeFilter})`}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={currentUserGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={getUserGrowthDataKey()} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title={`Revenue Growth (${timeFilter})`}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={currentRevenueGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={getRevenueGrowthDataKey()} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Subscription Breakdown">
            <div className="flex flex-col sm:flex-row justify-center items-center h-[260px]">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="sm:ml-8 mt-4 sm:mt-0 space-y-2 text-xs sm:text-sm">
                {subscriptionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}: {item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title={`Brief Submission Trends (${timeFilter})`}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={currentBriefSubmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={getBriefSubmissionsDataKey()} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

// ── Reusable components ────────────────────────────────────────────────

function KpiCard({
  icon,
  title,
  value,
  subtitle,
  change,
  changeColor = "text-gray-400",
  small = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeColor?: string;
  small?: boolean;
}) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 ${small ? 'py-3 sm:py-4' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-400 text-xs sm:text-sm mb-1">{title}</div>
          <div className="text-lg sm:text-2xl font-bold">{value}</div>
          {subtitle && <div className="text-gray-500 text-xs mt-0.5">{subtitle}</div>}
        </div>
        <div className={`p-2 sm:p-2.5 rounded-lg bg-gray-800/70 ${small ? 'p-1.5 sm:p-2' : ''}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className={`mt-2 sm:mt-3 text-xs sm:text-sm font-medium ${changeColor}`}>
          {change.startsWith('-') ? '↓' : '↑'} {change}
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{title}</h3>
      {children}
    </div>
  );
}