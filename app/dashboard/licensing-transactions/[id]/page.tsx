// app/admin/transactions/[id]/page.tsx
'use client';

import { ArrowLeft, Download } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// Mock data (in real app → fetch by id)
const mockDetails: Record<string, any> = {
  'TXN-001': {
    id: 'TXN-001',
    type: 'License',
    track: 'Summer Vibes Mix',
    users: 'Sarah J. → Mike Studios',
    date: 'Feb 20, 2024',
    paymentMethod: 'Visa ****4242',
    gross: '$150.00',
    fee: '$22.50',
    tax: '$0.00',
    net: '$127.50',
    stripeId: 'pi_3Mn8b2ZvY1o2cX8k0gK7df',
    status: 'Completed',
    auditLog: [
      'Transaction completed',
      'Feb 20, 2024 at 10:32 AM - Payment processed via Stripe',
      'Feb 20, 2024 at 10:31 AM - Transaction initiated',
    ],
  },
  // add more if needed
};

export default function TransactionDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const tx = mockDetails[id as string];

  if (!tx) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Transaction not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">TXN-{id} Details</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
            <Download size={16} />
            Export Invoice
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold">Transaction Summary</h2>
              <p className="text-gray-400 mt-1">
                License purchase for track <span className="text-gray-200">'{tx.track}'</span>
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-xs font-medium">
              {tx.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-gray-500">Transaction Type</div>
              <div className="mt-1 font-medium">{tx.type}</div>
            </div>
            <div>
              <div className="text-gray-500">Users Involved</div>
              <div className="mt-1">{tx.users}</div>
            </div>
            <div>
              <div className="text-gray-500">Transaction Date</div>
              <div className="mt-1">{tx.date}</div>
            </div>
            <div>
              <div className="text-gray-500">Payment Method</div>
              <div className="mt-1">{tx.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Breakdown</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-300">Gross Amount</span>
              <span className="font-medium">{tx.gross}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800 text-red-400">
              <span>Platform Commission (15%)</span>
              <span>-{tx.fee}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span>Tax</span>
              <span>{tx.tax}</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>Net Creator Earnings</span>
              <span className="text-emerald-400">{tx.net}</span>
            </div>
          </div>
        </div>

        {/* Payment & Stripe Details */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Stripe Payment Details</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-gray-500">Stripe Payment ID</div>
              <div className="font-mono text-gray-300 break-all">{tx.stripeId}</div>
            </div>
            <div>
              <div className="text-gray-500">Payout Status</div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-xs font-medium">
                Completed
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
              Mark Payout Complete
            </button>
            <button className="px-5 py-2.5 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
              Issue Refund
            </button>
            <button className="px-5 py-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/40 rounded-lg hover:bg-blue-600/30">
              Resolve Dispute
            </button>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Audit Log</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {tx.auditLog.map((entry: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                {entry}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}