// app/admin/transactions/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, Download, Eye } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockTransactions = [
  {
    id: 'TXN-001',
    type: 'License',
    users: 'Sarah J. → Mike Studios',
    gross: '$150.00',
    fee: '$22.50',
    net: '$127.50',
    status: 'Completed',
    date: 'Feb 20, 2024',
  },
  {
    id: 'TXN-002',
    type: 'Subscription',
    users: 'Emily D.',
    gross: '$49.99',
    fee: '$0.00',
    net: '$49.99',
    status: 'Completed',
    date: 'Feb 20, 2024',
  },
  {
    id: 'TXN-003',
    type: 'Collaboration Split',
    users: 'James W. + Lisa A.',
    gross: '$300.00',
    fee: '$45.00',
    net: '$255.00',
    status: 'Pending',
    date: 'Feb 20, 2024',
  },
  {
    id: 'TXN-004',
    type: 'License',
    users: 'Michael C. → Brand XYZ',
    gross: '$500.00',
    fee: '$75.00',
    net: '$425.00',
    status: 'Completed',
    date: 'Feb 20, 2024',
  },
];

type Transaction = typeof mockTransactions[0];

export default function LicensingTransactions() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(t => {
      const matchesSearch = 
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.users.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === 'All Types' || t.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const TypeBadge = ({ type }: { type: string }) => {
    const colors: Record<string, string> = {
      License: 'bg-blue-600/30 text-blue-400 border-blue-500/40',
      Subscription: 'bg-purple-600/30 text-purple-400 border-purple-500/40',
      'Collaboration Split': 'bg-orange-600/30 text-orange-400 border-orange-500/40',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[type] || 'bg-gray-700 text-gray-300'}`}>
        {type}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      Pending: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      Failed: 'bg-red-500/20 text-red-400 border-red-500/40',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[status] || 'bg-gray-700 text-gray-300'}`}>
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
            <h1 className="text-2xl font-bold">Licensing & Transactions</h1>
            <p className="text-gray-400 mt-1">Monitor all financial transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Revenue" value="$48,392" change="+18.3% from last month" changeColor="text-emerald-400" />
          <KpiCard title="Platform Fees" value="$7,259" subtitle="15% commission avg" />
          <KpiCard title="Creator Earnings" value="$41,133" change="+22% growth" changeColor="text-emerald-400" />
          <KpiCard title="Pending Payouts" value="$2,340" subtitle="12 transactions" color="text-orange-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative w-full sm:w-44">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Types</option>
              <option>License</option>
              <option>Subscription</option>
              <option>Collaboration Split</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="relative w-full sm:w-44">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">TRANSACTION ID</th>
                  <th className="text-left p-4 font-medium">TYPE</th>
                  <th className="text-left p-4 font-medium">USERS INVOLVED</th>
                  <th className="text-left p-4 font-medium">GROSS AMOUNT</th>
                  <th className="text-left p-4 font-medium">PLATFORM FEE</th>
                  <th className="text-left p-4 font-medium">NET EARNINGS</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">DATE</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{tx.id}</td>
                    <td className="p-4"><TypeBadge type={tx.type} /></td>
                    <td className="p-4 text-gray-300">{tx.users}</td>
                    <td className="p-4 font-medium">{tx.gross}</td>
                    <td className="p-4 text-red-400">{tx.fee}</td>
                    <td className="p-4 font-medium text-emerald-400">{tx.net}</td>
                    <td className="p-4"><StatusBadge status={tx.status} /></td>
                    <td className="p-4 text-gray-400">{tx.date}</td>
                    <td className="p-4">
                      <Link href={`/dashboard/licensing-transactions/${tx.id}`} className="text-blue-400 hover:text-blue-300">
                        <Eye size={18} />
                      </Link>
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

function KpiCard({
  title,
  value,
  subtitle,
  change,
  changeColor = 'text-gray-400',
  color = 'text-gray-100',
}: {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeColor?: string;
  color?: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {change && <div className={`text-sm mt-1 ${changeColor}`}>{change}</div>}
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}