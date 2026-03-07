// app/admin/briefs/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, Eye, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockBriefs = [
  {
    id: '1',
    title: 'Summer Vibes 2024',
    createdBy: 'A&R Team - Mike',
    tier: 'Excel',
    submissions: 47,
    status: 'Active',
    deadline: 'Mar 15, 2024',
  },
  {
    id: '2',
    title: 'Urban Beats Collection',
    createdBy: 'A&R Team - Sarah',
    tier: 'Launch',
    submissions: 23,
    status: 'Pending',
    deadline: 'Mar 10, 2024',
  },
  {
    id: '3',
    title: 'Chill Lo-Fi Pack',
    createdBy: 'A&R Team - James',
    tier: 'Ignite',
    submissions: 89,
    status: 'Active',
    deadline: 'Mar 20, 2024',
  },
  {
    id: '4',
    title: 'Workout Energy Mix',
    createdBy: 'A&R Team - Lisa',
    tier: 'Launch',
    submissions: 12,
    status: 'Closed',
    deadline: 'Feb 28, 2024',
  },
];

type Brief = typeof mockBriefs[0];

export default function BriefsManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredBriefs = useMemo(() => {
    return mockBriefs.filter(brief => {
      const matchesSearch = brief.title.toLowerCase().includes(search.toLowerCase()) ||
                           brief.createdBy.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || brief.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      Active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      Pending: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      Closed: 'bg-gray-700 text-gray-300 border-gray-600',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[status] || 'bg-gray-700 text-gray-300'}`}>
        {status}
      </span>
    );
  };

  const TierBadge = ({ tier }: { tier: string }) => {
    const colors: Record<string, string> = {
      Excel: 'bg-amber-600/30 text-amber-400 border-amber-500/40',
      Launch: 'bg-emerald-600/30 text-emerald-400 border-emerald-500/40',
      Ignite: 'bg-blue-600/30 text-blue-400 border-blue-500/40',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[tier] || 'bg-gray-700 text-gray-300'}`}>
        {tier}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl font-bold">Briefs & Submissions</h1>
          <p className="text-gray-400 mt-1">Manage briefs and monitor submissions</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              placeholder="Search briefs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Active</option>
              <option>Closed</option>
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
                  <th className="text-left p-4 font-medium">BRIEF TITLE</th>
                  <th className="text-left p-4 font-medium">CREATED BY</th>
                  <th className="text-left p-4 font-medium">TIER</th>
                  <th className="text-left p-4 font-medium">SUBMISSIONS</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">DEADLINE</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBriefs.map(brief => (
                  <tr key={brief.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{brief.title}</td>
                    <td className="p-4 text-gray-300">{brief.createdBy}</td>
                    <td className="p-4"><TierBadge tier={brief.tier} /></td>
                    <td className="p-4">{brief.submissions}</td>
                    <td className="p-4"><StatusBadge status={brief.status} /></td>
                    <td className="p-4 text-gray-400">{brief.deadline}</td>
                    <td className="p-4">
                      <Link href={`/dashboard/briefs-management/${brief.id}`} className="text-blue-400 hover:text-blue-300">
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