// app/admin/activity-log/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Download, ChevronDown, User, Shield, Server, Clock } from 'lucide-react';

// Mock data
const mockActivities = [
  {
    id: 'ACT-001',
    type: 'UserAction',
    action: 'User Registration',
    user: 'Sarah Johnson',
    details: 'New user account created',
    timestamp: '2024-05-04 10:30:35',
    ip: '192.168.1.146',
  },
  {
    id: 'ACT-002',
    type: 'AdminAction',
    action: 'Content Moderation',
    user: 'Admin User',
    details: 'Flagged content removed - Beat Pack Vol. 3',
    timestamp: '2024-05-04 10:30:38',
    ip: '192.168.1.178',
  },
  {
    id: 'ACT-003',
    type: 'SystemUpdate',
    action: 'Database Backup',
    user: 'System',
    details: 'Automated daily backup completed successfully',
    timestamp: '2024-05-04 05:00:00',
    ip: '127.0.0.1',
  },
  {
    id: 'ACT-004',
    type: 'UserAction',
    action: 'Brief Submission',
    user: 'Michael Chen',
    details: 'New submission for brief "Urban Beats Collection"',
    timestamp: '2024-05-03 09:30:45',
    ip: '192.168.1.165',
  },
  {
    id: 'ACT-005',
    type: 'AdminAction',
    action: 'Payout Approved',
    user: 'Admin User',
    details: 'Payout request PAY-001 approved - $1,450.00',
    timestamp: '2024-05-04 10:15:00',
    ip: '192.168.1.178',
  },
  {
    id: 'ACT-006',
    type: 'UserAction',
    action: 'Profile Updated',
    user: 'Emily Davis',
    details: 'User profile information updated',
    timestamp: '2024-05-03 09:53:21',
    ip: '192.168.2.181',
  },
  {
    id: 'ACT-007',
    type: 'AdminAction',
    action: 'User Suspended',
    user: 'Admin User',
    details: 'User account John Doe suspended for policy violation',
    timestamp: '2024-05-03 06:19:00',
    ip: '192.168.1.178',
  },
  {
    id: 'ACT-008',
    type: 'SystemUpdate',
    action: 'Storage Cleanup',
    user: 'System',
    details: 'Temporary files cleaned - 2.3 GB freed',
    timestamp: '2024-05-03 09:50:30',
    ip: '127.0.0.1',
  },
];

export default function ActivityLog() {
  const [timeRange, setTimeRange] = useState('This Week');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const filteredActivities = useMemo(() => {
    let result = [...mockActivities];

    // Simple mock filtering (you would replace with real date logic)
    if (timeRange === 'This Month') {
      // in real app → filter by actual date
      result = result.filter(() => Math.random() > 0.3); // demo
    }

    if (typeFilter !== 'All Types') {
      const typeMap: Record<string, string> = {
        'User Actions': 'UserAction',
        'Admin Actions': 'AdminAction',
        'System Updates': 'SystemUpdate',
      };
      const targetType = typeMap[typeFilter];
      if (targetType) {
        result = result.filter(a => a.type === targetType);
      }
    }

    return result;
  }, [timeRange, typeFilter]);

  const stats = {
    total: filteredActivities.length,
    userActions: filteredActivities.filter(a => a.type === 'UserAction').length,
    adminActions: filteredActivities.filter(a => a.type === 'AdminAction').length,
    systemUpdates: filteredActivities.filter(a => a.type === 'SystemUpdate').length,
  };

  const TypeBadge = ({ type }: { type: string }) => {
    const styles = {
      UserAction: 'bg-blue-600/30 text-blue-400 border-blue-500/40',
      AdminAction: 'bg-purple-600/30 text-purple-400 border-purple-500/40',
      SystemUpdate: 'bg-green-600/30 text-green-400 border-green-500/40',
    };

    const label = {
      UserAction: 'User Action',
      AdminAction: 'Admin Action',
      SystemUpdate: 'System Update',
    }[type] || type;

    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${styles[type as keyof typeof styles] || 'bg-gray-700 text-gray-300'}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <p className="text-gray-400 mt-1">Track all system, user, and admin actions</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-40">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm appearance-none"
              >
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative w-44">
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm appearance-none"
              >
                <option>All Types</option>
                <option>User Actions</option>
                <option>Admin Actions</option>
                <option>System Updates</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
              <Download size={16} />
              Export Log
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={<Clock className="text-blue-400" />} title="Total Activities" value={stats.total.toString()} />
          <KpiCard title="User Actions" value={stats.userActions.toString()} color="text-blue-400" />
          <KpiCard title="Admin Actions" value={stats.adminActions.toString()} color="text-purple-400" />
          <KpiCard title="System Updates" value={stats.systemUpdates.toString()} color="text-green-400" />
        </div>

        {/* Activity Timeline */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-5">Activity Timeline</h2>
          <div className="space-y-4">
            {filteredActivities.map(act => (
              <div
                key={act.id}
                className="flex items-start gap-4 p-4 bg-gray-950 border border-gray-800 rounded-lg"
              >
                <div className="mt-1">
                  <TypeBadge type={act.type} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{act.action}</div>
                  <div className="text-sm text-gray-400 mt-0.5">
                    {act.user} • {act.details}
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  {act.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Activity Log */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Detailed Activity Log</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">ID</th>
                  <th className="text-left p-4 font-medium">TYPE</th>
                  <th className="text-left p-4 font-medium">ACTION</th>
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">DETAILS</th>
                  <th className="text-left p-4 font-medium">TIMESTAMP</th>
                  <th className="text-left p-4 font-medium">IP ADDRESS</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map(act => (
                  <tr key={act.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{act.id}</td>
                    <td className="p-4"><TypeBadge type={act.type} /></td>
                    <td className="p-4">{act.action}</td>
                    <td className="p-4 text-gray-300">{act.user}</td>
                    <td className="p-4 text-gray-400">{act.details}</td>
                    <td className="p-4 text-gray-500">{act.timestamp}</td>
                    <td className="p-4 font-mono text-gray-500">{act.ip}</td>
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
  subtitle,
  color = 'text-gray-100',
}: {
  icon?: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      {icon && <div className="mb-3">{icon}</div>}
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}