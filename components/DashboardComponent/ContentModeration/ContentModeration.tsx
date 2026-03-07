// app/admin/moderation/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, Eye, X, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';

// Mock flagged content data
const mockContent = [
  {
    id: 1,
    title: 'Beat Pack Vol. 3',
    uploadedBy: 'John Doe',
    type: 'Audio',
    reason: 'Inappropriate Content',
    date: '2024-02-20',
    riskScore: 82,
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Summer Mix 2024',
    uploadedBy: 'Jane Smith',
    type: 'Audio',
    reason: 'Copyright Violation',
    date: '2024-02-19',
    riskScore: 45,
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Studio Session Photos',
    uploadedBy: 'Mike Johnson',
    type: 'Image',
    reason: 'Spam',
    date: '2024-02-18',
    riskScore: 21,
    status: 'Pending',
  },
];

type ContentItem = typeof mockContent[0];

export default function ContentModeration() {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const filteredContent = useMemo(() => {
    return mockContent.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
        item.reason.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All Status' || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [search, selectedContent, selectedStatus]);

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      Approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      Removed: 'bg-red-500/20 text-red-400 border-red-500/40',
    };

    return (
      <span
        className={`px-2.5 py-1 rounded text-xs font-medium border ${
          colors[status as keyof typeof colors] || 'bg-gray-700 text-gray-300'
        }`}
      >
        {status}
      </span>
    );
  };

  const TypeBadge = ({ type }: { type: string }) => {
    const colors = {
      Audio: 'bg-purple-600/30 text-purple-400',
      Image: 'bg-blue-600/30 text-blue-400',
      Video: 'bg-pink-600/30 text-pink-400',
    };

    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-medium ${
          colors[type as keyof typeof colors] || 'bg-gray-700 text-gray-300'
        }`}
      >
        {type}
      </span>
    );
  };

  const RiskScore = ({ score }: { score: number }) => {
    const color = score >= 70 ? 'text-red-400' : score >= 40 ? 'text-orange-400' : 'text-yellow-400';
    return <span className={`${color} font-medium`}>{score}%</span>;
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Content Moderation</h1>
          <p className="text-gray-400 mt-1">Review and moderate flagged content</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search flagged content..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm appearance-none pr-10 focus:outline-none focus:border-blue-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Removed</option>
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
                  <th className="text-left p-4 font-medium">ASSET TITLE</th>
                  <th className="text-left p-4 font-medium">UPLOADED BY</th>
                  <th className="text-left p-4 font-medium">TYPE</th>
                  <th className="text-left p-4 font-medium">REPORT REASON</th>
                  <th className="text-left p-4 font-medium">REPORTED DATE</th>
                  <th className="text-left p-4 font-medium">AI RISK SCORE</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map(item => (
                  <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 text-gray-300">{item.uploadedBy}</td>
                    <td className="p-4"><TypeBadge type={item.type} /></td>
                    <td className="p-4 text-gray-300">{item.reason}</td>
                    <td className="p-4 text-gray-400">{item.date}</td>
                    <td className="p-4"><RiskScore score={item.riskScore} /></td>
                    <td className="p-4"><StatusBadge status={item.status} /></td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedContent(item)}
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium"
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

          {filteredContent.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No content matches the current filters
            </div>
          )}
        </div>

        {/* Review Modal / Side Panel */}
        {selectedContent && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Review Content</h2>
                  <button
                    onClick={() => setSelectedContent(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Preview Placeholder */}
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-6 text-center">
                  <div className="text-gray-500 mb-2">[Content Preview: {selectedContent.type}]</div>
                  <div className="text-lg font-medium">{selectedContent.title}</div>
                </div>

                <div className="space-y-5 mb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Uploaded By</div>
                      <div>{selectedContent.uploadedBy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Report Reason</div>
                      <div className="text-red-400">{selectedContent.reason}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Reporter</div>
                    <div>User #4823</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">AI Risk Score</div>
                    <div className="text-2xl font-bold text-red-400">
                      {selectedContent.riskScore}% Risk
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Reporter Notes</div>
                    <div className="text-gray-300">
                      This content violates community guidelines.
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
                    <CheckCircle size={18} />
                    Approve Content
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
                    <Trash2 size={18} />
                    Remove Content
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-600/20 text-orange-400 border border-orange-500/40 rounded-lg hover:bg-orange-600/30">
                    <AlertTriangle size={18} />
                    Warn User
                  </button>

                  <button
                    onClick={() => setSelectedContent(null)}
                    className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
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