// app/admin/storage/page.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, HardDrive, Users, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';

// ── Mock data ───────────────────────────────────────────────────────────────

const usageGrowth = [
  { month: 'Jan', tb: 210 },
  { month: 'Feb', tb: 280 },
  { month: 'Mar', tb: 320 },
  { month: 'Apr', tb: 380 },
  { month: 'May', tb: 420 },
  { month: 'Jun', tb: 442 },
];

const nearLimitUsers = [
  { name: 'Sarah Johnson', email: 'sarahj@email.com', used: 48, limit: 50, percent: 96 },
  { name: 'Michael Chen',   email: 'm.chen@email.com',   used: 41, limit: 50, percent: 82 },
  { name: 'James Wilson',   email: 'j.wilson@email.com', used: 24, limit: 30, percent: 80 },
];

const overLimitUsers = [
  { name: 'Lisa Anderson', email: 'lisa.a@email.com', used: 55, limit: 50, over: 5 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const ProgressBar = ({ percent, color = 'bg-red-500' }: { percent: number; color?: string }) => (
  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
    <div
      className={`h-full ${color}`}
      style={{ width: `${percent}%` }}
    />
  </div>
);

export default function Storage() {
  const totalCapacity = 1050; // TB
  const totalUsed = 442;
  const percentUsed = Math.round((totalUsed / totalCapacity) * 100);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ name: string; email: string; limit: number } | null>(null);
  const [newLimit, setNewLimit] = useState('');

  // State for user data (to allow updates)
  const [nearLimitUsersState, setNearLimitUsersState] = useState(nearLimitUsers);
  const [overLimitUsersState, setOverLimitUsersState] = useState(overLimitUsers);

  const openModal = (user: { name: string; email: string; limit: number }) => {
    setSelectedUser(user);
    setNewLimit(user.limit.toString());
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewLimit('');
  };

  const handleIncreaseLimit = () => {
    if (!selectedUser || !newLimit) return;

    const newLimitNum = parseInt(newLimit);
    if (isNaN(newLimitNum) || newLimitNum <= selectedUser.limit) return;

    // Update in nearLimitUsers
    setNearLimitUsersState(prev =>
      prev.map(user =>
        user.email === selectedUser.email
          ? { ...user, limit: newLimitNum, percent: Math.round((user.used / newLimitNum) * 100) }
          : user
      )
    );

    // Update in overLimitUsers
    setOverLimitUsersState(prev =>
      prev.map(user =>
        user.email === selectedUser.email
          ? {
              ...user,
              limit: newLimitNum,
              over: newLimitNum < user.used ? user.used - newLimitNum : 0
            }
          : user
      )
    );

    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100 ">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Storage Management</h1>
            <p className="text-gray-400 mt-1">Monitor and manage platform storage usage</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-950/40 rounded-lg">
                <HardDrive className="text-blue-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Platform Storage</div>
                <div className="text-3xl font-bold mt-1">{totalUsed} TB</div>
                <div className="text-sm text-gray-500 mt-1">
                  of {totalCapacity} TB capacity • {percentUsed}% used
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-950/40 rounded-lg">
                <AlertTriangle className="text-amber-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Users Near Limit (80%+)</div>
                <div className="text-3xl font-bold mt-1">{nearLimitUsersState.length}</div>
                <div className="text-sm text-amber-400 mt-1">Requires attention</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-950/40 rounded-lg">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Users Over Limit</div>
                <div className="text-3xl font-bold mt-1">{overLimitUsersState.length}</div>
                <div className="text-sm text-red-400 mt-1">Action required</div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Growth Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-5">Storage Usage Growth (TB)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '6px',
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar dataKey="tb" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Near Limit */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center gap-3">
            <AlertTriangle className="text-amber-400" size={20} />
            <h2 className="text-lg font-semibold">Users Near Storage Limit (80%+)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">USED</th>
                  <th className="text-left p-4 font-medium">LIMIT</th>
                  <th className="text-left p-4 font-medium">USAGE</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {nearLimitUsersState.map(user => (
                  <tr key={user.name} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4">
                      <div>{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="p-4 font-medium">{user.used} GB</td>
                    <td className="p-4 font-medium">{user.limit} GB</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <ProgressBar percent={user.percent} color="bg-red-500" />
                        <span className="text-red-400 font-medium">{user.percent}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(user)}
                        className="px-4 py-1.5 bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded hover:bg-blue-600/40 text-sm"
                      >
                        Increase Limit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Over Limit */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center gap-3">
            <AlertTriangle className="text-red-400" size={20} />
            <h2 className="text-lg font-semibold">Users Over Storage Limit</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">USED</th>
                  <th className="text-left p-4 font-medium">LIMIT</th>
                  <th className="text-left p-4 font-medium">OVERAGE</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {overLimitUsersState.map(user => (
                  <tr key={user.name} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4">
                      <div>{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="p-4 font-medium">{user.used} GB</td>
                    <td className="p-4 font-medium">{user.limit} GB</td>
                    <td className="p-4 font-medium text-red-400">+{user.over} GB</td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(user)}
                        className="px-4 py-1.5 bg-red-600/30 text-red-400 border border-red-500/40 rounded hover:bg-red-600/40 text-sm"
                      >
                        Increase Limit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for increasing limit */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Increase Storage Limit</h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-400">User: <span className="text-white font-medium">{selectedUser.name}</span></p>
              <p className="text-gray-400">Email: <span className="text-white">{selectedUser.email}</span></p>
              <p className="text-gray-400 mt-2">Current Limit: <span className="text-white font-medium">{selectedUser.limit} GB</span></p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">New Limit (GB)</label>
              <input
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                min={selectedUser.limit + 1}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter new limit"
              />
              {newLimit && parseInt(newLimit) <= selectedUser.limit && (
                <p className="text-red-400 text-sm mt-1">New limit must be greater than current limit</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleIncreaseLimit}
                disabled={!newLimit || parseInt(newLimit) <= selectedUser.limit}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Limit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}