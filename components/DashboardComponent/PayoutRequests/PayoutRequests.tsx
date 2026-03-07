// app/admin/payouts/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, DollarSign, Clock, CheckCircle, XCircle, Eye, X } from 'lucide-react';

// Mock data
const mockPayouts = [
  {
    id: 'PAY-001',
    user: 'Sarah Johnson',
    email: 'sarahj@email.com',
    amount: '$1,450.00',
    method: 'Bank Transfer',
    account: '****4532',
    date: '2024-03-01',
    status: 'Pending',
    reason: 'Monthly earnings withdrawal',
    balance: '$2,850.00',
  },
  {
    id: 'PAY-002',
    user: 'Michael Chen',
    email: 'm.chen@email.com',
    amount: '$890.50',
    method: 'PayPal',
    account: 'm.chen@paypal.com',
    date: '2024-03-02',
    status: 'Approved',
    reason: 'Monthly payout',
    balance: '$1,420.00',
  },
  {
    id: 'PAY-003',
    user: 'Emily Davis',
    email: 'emily.d@email.com',
    amount: '$2,300.00',
    method: 'Bank Transfer',
    account: '****0821',
    date: '2024-03-03',
    status: 'Rejected',
    reason: 'Insufficient verification',
    balance: '$4,120.00',
  },
  {
    id: 'PAY-004',
    user: 'James Wilson',
    email: 'j.wilson@email.com',
    amount: '$650.00',
    method: 'PayPal',
    account: 'james.w@paypal.com',
    date: '2024-03-04',
    status: 'Pending',
    reason: 'Quarterly withdrawal',
    balance: '$3,180.00',
  },
];

type Payout = typeof mockPayouts[0];

export default function PayoutRequest() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredPayouts = useMemo(() => {
    if (statusFilter === 'All Status') return mockPayouts;
    return mockPayouts.filter(p => p.status === statusFilter);
  }, [statusFilter]);

  const stats = {
    total: mockPayouts.length,
    pending: mockPayouts.filter(p => p.status === 'Pending').length,
    totalPendingAmount: mockPayouts
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0),
    processedThisMonth: 1, // static for demo
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      Approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      Rejected: 'bg-red-500/20 text-red-400 border-red-500/40',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${styles[status as keyof typeof styles] || 'bg-gray-700 text-gray-300'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payout Requests</h1>
            <p className="text-gray-400 mt-1">Manage user withdrawal requests</p>
          </div>

          <div className="relative w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon={<DollarSign className="text-red-400" />}
            title="Total Requests"
            value={stats.total.toString()}
          />
          <KpiCard
            title="Pending"
            value={stats.pending.toString()}
            subtitle="Awaiting review"
            color="text-yellow-400"
          />
          <KpiCard
            title="Total Amount Pending"
            value={`$${stats.totalPendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            color="text-yellow-400"
          />
          <KpiCard
            title="Processed This Month"
            value={stats.processedThisMonth.toString()}
          />
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">All Payout Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">REQUEST ID</th>
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">AMOUNT</th>
                  <th className="text-left p-4 font-medium">PAYMENT METHOD</th>
                  <th className="text-left p-4 font-medium">REQUEST DATE</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayouts.map(payout => (
                  <tr key={payout.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{payout.id}</td>
                    <td className="p-4">
                      <div>{payout.user}</div>
                      <div className="text-xs text-gray-500">{payout.email}</div>
                    </td>
                    <td className="p-4 font-medium">{payout.amount}</td>
                    <td className="p-4 text-gray-300">{payout.method}</td>
                    <td className="p-4 text-gray-400">{payout.date}</td>
                    <td className="p-4"><StatusBadge status={payout.status} /></td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedPayout(payout)}
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                      >
                        <Eye size={16} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Details Modal */}
        {selectedPayout && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Payout Request Details</h2>
                  <button
                    onClick={() => setSelectedPayout(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Request ID & Status */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-xs text-gray-500">Request ID</div>
                    <div className="font-medium text-lg">{selectedPayout.id}</div>
                  </div>
                  <StatusBadge status={selectedPayout.status} />
                </div>

                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Name</div>
                    <div className="font-medium">{selectedPayout.user}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Email</div>
                    <div className="text-blue-400">{selectedPayout.email}</div>
                  </div>
                </div>

                {/* Amount & Balance */}
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Requested Amount</div>
                      <div className="text-2xl font-bold text-red-400">{selectedPayout.amount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Current Balance</div>
                      <div className="text-2xl font-bold text-emerald-400">{selectedPayout.balance}</div>
                    </div>
                  </div>
                </div>

                {/* Reason & Payment Info */}
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Withdrawal Reason</div>
                    <div className="text-gray-300">{selectedPayout.reason}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Payment Method</div>
                      <div>{selectedPayout.method}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Account Details</div>
                      <div className="font-mono">{selectedPayout.account}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Request Date</div>
                    <div>{selectedPayout.date}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
                    <CheckCircle size={18} />
                    Approve & Process Payment
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
                    <XCircle size={18} />
                    Reject Request
                  </button>

                  <button
                    onClick={() => setSelectedPayout(null)}
                    className="px-8 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                  >
                    Close
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
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-2xl font-bold mt-1 ${color}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}