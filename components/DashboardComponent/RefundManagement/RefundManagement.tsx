// app/admin/refunds/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, RotateCcw, Clock, CheckCircle, XCircle, Eye, X } from 'lucide-react';

// Mock data
const mockRefunds = [
  {
    id: 'REF-001',
    transactionId: 'TRX-2024-145',
    user: 'Sarah Johnson',
    email: 'sarahj@email.com',
    product: 'Music License',
    amount: '$49.99',
    originalAmount: '$49.99',
    reason: 'Service not as described',
    description: 'Purchased license but quality did not match preview',
    paymentMethod: 'Visa ****4242',
    transactionDate: '2024-02-28',
    requestDate: '2024-03-01',
    status: 'Pending',
  },
  {
    id: 'REF-002',
    transactionId: 'TRX-2024-132',
    user: 'Michael Chen',
    email: 'm.chen@email.com',
    product: 'Subscription',
    amount: '$29.99',
    originalAmount: '$29.99',
    reason: 'Accidental purchase',
    description: 'User requested refund due to accidental subscription',
    paymentMethod: 'PayPal',
    transactionDate: '2024-02-25',
    requestDate: '2024-03-02',
    status: 'Approved',
  },
  {
    id: 'REF-003',
    transactionId: 'TRX-2024-098',
    user: 'Emily Davis',
    email: 'emily.d@email.com',
    product: 'License Pack',
    amount: '$75.00',
    originalAmount: '$150.00',
    reason: 'Partial refund request',
    description: 'Partial refund for unused portion of license pack',
    paymentMethod: 'Stripe',
    transactionDate: '2024-02-20',
    requestDate: '2024-03-03',
    status: 'Rejected',
  },
];

type Refund = typeof mockRefunds[0];

export default function RefundManagement() {
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Requests');

  const filteredRefunds = useMemo(() => {
    if (statusFilter === 'All Requests') return mockRefunds;
    return mockRefunds.filter(r => r.status === statusFilter);
  }, [statusFilter]);

  const stats = {
    total: mockRefunds.length,
    pending: mockRefunds.filter(r => r.status === 'Pending').length,
    approvedThisMonth: mockRefunds.filter(r => r.status === 'Approved').length,
    totalRefundAmount: mockRefunds.reduce((sum, r) => sum + parseFloat(r.amount.replace(/[$,]/g, '')), 0),
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
            <h1 className="text-2xl font-bold">Refund Management</h1>
            <p className="text-gray-400 mt-1">Handle refund requests and payment reversals</p>
          </div>

          <div className="relative w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Requests</option>
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
            icon={<RotateCcw className="text-red-400" />}
            title="Total Requests"
            value={stats.total.toString()}
          />
          <KpiCard
            title="Pending Review"
            value={stats.pending.toString()}
            subtitle="Awaiting decision"
            color="text-yellow-400"
          />
          <KpiCard
            title="Approved This Month"
            value={stats.approvedThisMonth.toString()}
            color="text-emerald-400"
          />
          <KpiCard
            title="Total Refund Amount"
            value={`$${stats.totalRefundAmount.toFixed(2)}`}
            color="text-gray-100"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">All Refund Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">REFUND ID</th>
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">PRODUCT</th>
                  <th className="text-left p-4 font-medium">AMOUNT</th>
                  <th className="text-left p-4 font-medium">REASON</th>
                  <th className="text-left p-4 font-medium">REQUEST DATE</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map(refund => (
                  <tr key={refund.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">
                      {refund.id}
                      <div className="text-xs text-gray-500 mt-0.5">{refund.transactionId}</div>
                    </td>
                    <td className="p-4">
                      <div>{refund.user}</div>
                      <div className="text-xs text-gray-500">{refund.email}</div>
                    </td>
                    <td className="p-4 text-gray-300">{refund.product}</td>
                    <td className="p-4 font-medium">{refund.amount}</td>
                    <td className="p-4 text-gray-400">{refund.reason}</td>
                    <td className="p-4 text-gray-400">{refund.requestDate}</td>
                    <td className="p-4"><StatusBadge status={refund.status} /></td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedRefund(refund)}
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

        {/* Refund Details Modal */}
        {selectedRefund && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Refund Request Details</h2>
                  <button
                    onClick={() => setSelectedRefund(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* ID & Status */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-gray-500">Refund ID</div>
                    <div className="text-lg font-medium">{selectedRefund.id}</div>
                  </div>
                  <StatusBadge status={selectedRefund.status} />
                </div>

                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Name</div>
                    <div className="font-medium">{selectedRefund.user}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Email</div>
                    <div className="text-blue-400">{selectedRefund.email}</div>
                  </div>
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1">Original Amount</div>
                    <div className="text-xl font-bold">{selectedRefund.originalAmount}</div>
                  </div>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1">Refund Amount</div>
                    <div className="text-xl font-bold text-red-400">{selectedRefund.amount}</div>
                  </div>
                </div>

                {/* Product & Reason */}
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Product Type</div>
                    <div className="font-medium">{selectedRefund.product}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Refund Reason</div>
                    <div className="text-gray-300 font-medium">{selectedRefund.reason}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Description</div>
                    <div className="text-gray-300">{selectedRefund.description}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Payment Method</div>
                      <div>{selectedRefund.paymentMethod}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Transaction Date</div>
                      <div>{selectedRefund.transactionDate}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Request Date</div>
                    <div>{selectedRefund.requestDate}</div>
                  </div>
                </div>

                {/* Verified badge / note */}
                <div className="bg-blue-950/40 border border-blue-800/50 rounded-lg p-4 mb-8 text-center text-blue-300 text-sm">
                  Payment History Verified – Transaction records have been verified against payment processor logs
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
                    <CheckCircle size={18} />
                    Approve Refund
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
                    <XCircle size={18} />
                    Reject Request
                  </button>

                  <button
                    onClick={() => setSelectedRefund(null)}
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

// Reusable KPI Card component
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