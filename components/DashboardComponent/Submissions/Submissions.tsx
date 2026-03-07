// app/admin/submissions/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, Eye, CheckCircle, XCircle, Download, X, Upload } from 'lucide-react';

// Mock data
const mockSubmissions = [
  {
    id: 'SUB-001',
    brief: 'Summer Vibes 2024',
    briefId: 'BRF-123',
    user: 'Sarah Johnson',
    email: 'sarahj@email.com',
    contentType: 'Audio Track',
    fileName: 'summer-beat-v2.wav',
    fileSize: '24.5 MB',
    date: '2024-03-01',
    status: 'Pending Review',
    description: 'Upbeat summer track with tropical vibes',
  },
  {
    id: 'SUB-002',
    brief: 'Urban Beats Collection',
    briefId: 'BRF-124',
    user: 'Michael Chen',
    email: 'm.chen@email.com',
    contentType: 'Audio Track',
    fileName: 'urban-groove-final.mp3',
    fileSize: '31.2 MB',
    date: '2024-03-02',
    status: 'Approved',
    description: 'Dark trap beat with heavy 808s',
  },
  {
    id: 'SUB-003',
    brief: 'Lo-Fi Chill Playlist',
    briefId: 'BRF-125',
    user: 'Emily Davis',
    email: 'emily.d@email.com',
    contentType: 'Audio Track',
    fileName: 'chillhop-session-01.wav',
    fileSize: '18.7 MB',
    date: '2024-03-03',
    status: 'Rejected',
    description: 'Relaxing lo-fi with vinyl crackle',
  },
];

type Submission = typeof mockSubmissions[0];

export default function Submission() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Submissions');

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === 'All Submissions') return mockSubmissions;
    return mockSubmissions.filter(sub => sub.status === statusFilter);
  }, [statusFilter]);

  // Simple stats calculation
  const stats = {
    total: mockSubmissions.length,
    pending: mockSubmissions.filter(s => s.status === 'Pending Review').length,
    approved: mockSubmissions.filter(s => s.status === 'Approved').length,
    rejected: mockSubmissions.filter(s => s.status === 'Rejected').length,
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      'Pending Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
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
            <h1 className="text-2xl font-bold">Submissions Management</h1>
            <p className="text-gray-400 mt-1">Review user submissions for approved briefs</p>
          </div>

          <div className="relative w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Submissions</option>
              <option>Pending Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon={<Upload className="text-red-400" />}
            title="Total Submissions"
            value={stats.total.toString()}
            subtitle="From approved briefs"
          />
          <KpiCard
            title="Pending Review"
            value={stats.pending.toString()}
            color="text-yellow-400"
          />
          <KpiCard
            title="Approved"
            value={stats.approved.toString()}
            color="text-emerald-400"
          />
          <KpiCard
            title="Rejected"
            value={stats.rejected.toString()}
            color="text-red-400"
          />
        </div>

        {/* Table Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">All Submissions</h2>
            <p className="text-sm text-gray-500 mt-1">
              Note: Submissions only appear when their brief is approved
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/60 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">SUBMISSION ID</th>
                  <th className="text-left p-4 font-medium">BRIEF</th>
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">CONTENT</th>
                  <th className="text-left p-4 font-medium">DATE</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{sub.id}</td>
                    <td className="p-4">
                      <div>{sub.brief}</div>
                      <div className="text-xs text-gray-500">{sub.briefId}</div>
                    </td>
                    <td className="p-4">
                      <div>{sub.user}</div>
                      <div className="text-xs text-gray-500">{sub.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-purple-400">{sub.contentType}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{sub.fileSize}</div>
                    </td>
                    <td className="p-4 text-gray-400">{sub.date}</td>
                    <td className="p-4"><StatusBadge status={sub.status} /></td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                      >
                        <Eye size={16} />
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submission Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Submission Details</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Preview Area */}
                <div className="bg-black border border-gray-800 rounded-lg p-8 mb-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <Upload size={32} className="text-gray-500" />
                  </div>
                  <div className="text-gray-400 mb-1">[Demo Audio Player Preview]</div>
                  <div className="text-sm font-medium">{selectedSubmission.fileName}</div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Submission ID</div>
                    <div className="font-medium">{selectedSubmission.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Brief Title</div>
                    <div className="font-medium">{selectedSubmission.brief}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Name</div>
                    <div>{selectedSubmission.user}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">User Email</div>
                    <div className="text-blue-400">{selectedSubmission.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Description</div>
                    <div className="text-gray-300">{selectedSubmission.description}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">File Size</div>
                    <div>{selectedSubmission.fileSize}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Submitted Date</div>
                    <div>{selectedSubmission.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current Status</div>
                    <StatusBadge status={selectedSubmission.status} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
                    <CheckCircle size={18} />
                    Approve Submission
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
                    <XCircle size={18} />
                    Reject Submission
                  </button>

                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
                    <Download size={18} />
                    Download File
                  </button>

                  <button
                    onClick={() => setSelectedSubmission(null)}
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