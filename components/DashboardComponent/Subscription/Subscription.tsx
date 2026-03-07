// app/admin/subscriptions/page.tsx
'use client';

import { useState } from 'react';
import { MoreVertical, TrendingUp, DollarSign, Users, Ban, PauseCircle, RotateCcw, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data
const planData = [
  { name: 'Ignite', value: 6843, color: '#3b82f6', price: '$9.99', mrr: '$68,373' },
  { name: 'Launch', value: 3920, color: '#a855f7', price: '$29.99', mrr: '$117,541' },
  { name: 'Excel', value: 1780, color: '#f59e0b', price: '$49.99', mrr: '$88,982' },
];

const recentBilling = [
  {
    id: '1',
    user: 'Sarah Johnson',
    email: 'sarahj@email.com',
    plan: 'Excel',
    amount: '$49.99',
    status: 'Active',
    nextBilling: 'Mar 20, 2024',
  },
  {
    id: '2',
    user: 'Michael Chen',
    email: 'm.chen@email.com',
    plan: 'Launch',
    amount: '$29.99',
    status: 'Active',
    nextBilling: 'Mar 18, 2024',
  },
  {
    id: '3',
    user: 'Emily Davis',
    email: 'emily.d@email.com',
    plan: 'Ignite',
    amount: '$9.99',
    status: 'Payment Failed',
    nextBilling: '-',
  },
  {
    id: '4',
    user: 'David Wilson',
    email: 'david.w@email.com',
    plan: 'Excel',
    amount: '$49.99',
    status: 'Canceled',
    nextBilling: '-',
  },
  {
    id: '5',
    user: 'Lisa Brown',
    email: 'lisa.b@email.com',
    plan: 'Launch',
    amount: '$29.99',
    status: 'Active',
    nextBilling: 'Mar 25, 2024',
  },
];

const totalSubscribers = planData.reduce((sum, p) => sum + p.value, 0);
const totalMRR = 274904.57;

export default function Subscription() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: string; user: string; message: string } | null>(null);

  const handleAction = (action: string, user: string) => {
    setActionMessage({
      type: action,
      user: user,
      message: `${action} action performed on ${user}'s subscription`
    });
    setOpenMenuId(null);
    
    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setActionMessage(null);
    }, 3000);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
          <CheckCircle size={12} />
          Active
        </span>
      );
    }
    if (status.includes('Failed')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
          <AlertCircle size={12} />
          Payment Failed
        </span>
      );
    }
    if (status === 'Canceled') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs font-medium">
          <XCircle size={12} />
          Canceled
        </span>
      );
    }
    return <span className="px-2.5 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">{status}</span>;
  };

  const PlanBadge = ({ plan }: { plan: string }) => {
    const colors: Record<string, string> = {
      Ignite: 'bg-blue-600/30 text-blue-400',
      Launch: 'bg-purple-600/30 text-purple-400',
      Excel: 'bg-amber-600/30 text-amber-400',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[plan] || 'bg-gray-700'}`}>
        {plan}
      </span>
    );
  };

  // Custom label formatter to handle undefined percent
  const renderCustomizedLabel = (props: any) => {
    const { name, percent } = props;
    const percentage = percent ? Math.round(percent * 100) : 0;
    return `${name} ${percentage}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-medium">{data.name}</p>
          <p className="text-gray-400 text-xs mt-1">
            {data.value.toLocaleString()} subscribers
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-4 sm:space-y-6">

        {/* Action Message Toast */}
        {actionMessage && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className={`px-4 py-3 rounded-lg shadow-xl border flex items-center gap-3 ${
              actionMessage.type === 'Ban' ? 'bg-red-900/50 border-red-700 text-red-200' :
              actionMessage.type === 'Pause' ? 'bg-orange-900/50 border-orange-700 text-orange-200' :
              actionMessage.type === 'Refund' ? 'bg-blue-900/50 border-blue-700 text-blue-200' :
              'bg-emerald-900/50 border-emerald-700 text-emerald-200'
            }`}>
              {actionMessage.type === 'Ban' && <Ban size={18} />}
              {actionMessage.type === 'Pause' && <PauseCircle size={18} />}
              {actionMessage.type === 'Refund' && <RotateCcw size={18} />}
              <span className="text-sm">{actionMessage.message}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Subscription Management</h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">Monitor subscription plans and billing</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <KpiCard
            icon={<Users className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />}
            title="Total Subscribers"
            value={totalSubscribers.toLocaleString()}
            change="+8.2% from last month"
            changeColor="text-emerald-400"
          />
          <KpiCard
            icon={<DollarSign className="text-emerald-400 w-5 h-5 sm:w-6 sm:h-6" />}
            title="Monthly Recurring Revenue"
            value={`$${totalMRR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change="+12.5% growth"
            changeColor="text-emerald-400"
          />
          <KpiCard
            icon={<TrendingUp className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />}
            title="Avg Revenue Per User"
            value="$21.92"
            subtitle="Across plans"
          />
        </div>

        {/* Plan Distribution & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Donut Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Plan Distribution</h2>
            <div className="h-60 sm:h-72 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={{ stroke: '#4b5563' }}
                  >
                    {planData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Plan Details</h2>
            <div className="space-y-4 sm:space-y-6">
              {planData.map((plan) => (
                <div key={plan.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                      <span className="font-medium">{plan.name}</span>
                    </div>
                    <span className="font-medium">{plan.price}/month</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {plan.value.toLocaleString()} subscribers • MRR: {plan.mrr}
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(plan.value / totalSubscribers) * 100}%`,
                        backgroundColor: plan.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Billing Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold">Recent Billing Activity</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-950/60 border-b border-gray-800">
                  <th className="text-left p-3 sm:p-4 font-medium">USER</th>
                  <th className="text-left p-3 sm:p-4 font-medium">PLAN</th>
                  <th className="text-left p-3 sm:p-4 font-medium">AMOUNT</th>
                  <th className="text-left p-3 sm:p-4 font-medium">STATUS</th>
                  <th className="text-left p-3 sm:p-4 font-medium">NEXT BILLING</th>
                  <th className="text-left p-3 sm:p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentBilling.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 sm:p-4">
                      <div className="font-medium">{item.user}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.email}</div>
                    </td>
                    <td className="p-3 sm:p-4"><PlanBadge plan={item.plan} /></td>
                    <td className="p-3 sm:p-4 font-medium">{item.amount}</td>
                    <td className="p-3 sm:p-4"><StatusBadge status={item.status} /></td>
                    <td className="p-3 sm:p-4 text-gray-400">{item.nextBilling}</td>
                    <td className="p-3 sm:p-4 relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === item.id && (
                        <>
                          {/* Backdrop to close menu when clicking outside */}
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(null)}
                          />
                          
                          {/* Dropdown Menu */}
                          <div className="absolute right-0 mt-1 w-40 sm:w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 py-1">
                            <button
                              onClick={() => handleAction('Ban', item.user)}
                              className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2 transition-colors"
                            >
                              <Ban size={14} className="text-red-400" />
                              <span>Ban User</span>
                            </button>
                            <button
                              onClick={() => handleAction('Pause', item.user)}
                              className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2 transition-colors"
                            >
                              <PauseCircle size={14} className="text-orange-400" />
                              <span>Pause Subscription</span>
                            </button>
                            <button
                              onClick={() => handleAction('Refund', item.user)}
                              className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2 transition-colors"
                            >
                              <RotateCcw size={14} className="text-blue-400" />
                              <span>Process Refund</span>
                            </button>
                            <div className="border-t border-gray-700 my-1"></div>
                            <button
                              onClick={() => handleAction('Cancel', item.user)}
                              className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2 transition-colors"
                            >
                              <XCircle size={14} />
                              <span>Cancel Subscription</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
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

// Reusable KPI Card
function KpiCard({
  icon,
  title,
  value,
  change,
  changeColor = 'text-gray-400',
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  changeColor?: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
      {icon && <div className="mb-3 sm:mb-4">{icon}</div>}
      <div className="text-xs sm:text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-lg sm:text-2xl font-bold">{value}</div>
      {change && <div className={`text-xs sm:text-sm mt-2 ${changeColor}`}>{change}</div>}
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}

// Add this CSS to your global styles or add a style tag
const styles = `
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`;

// If you don't have a global styles file, you can add this style tag
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}