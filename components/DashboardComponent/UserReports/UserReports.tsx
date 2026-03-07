// app/admin/reports/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, AlertTriangle, Clock, CheckCircle, XCircle, Eye, X } from 'lucide-react';

// Mock data
const mockReports = [
  {
    id: 'RPT-001',
    reportedUser: 'John Doe',
    reportedEmail: 'john.d@email.com',
    reportedBy: 'Sarah Johnson',
    reporterEmail: 'sarahj@email.com',
    reason: 'Inappropriate Behavior',
    severity: 'High',
    date: '2024-03-01',
    status: 'Pending',
    description: 'User sent harassing messages in collaboration chat',
    evidence: ['Chat logs', 'Screenshots'],
  },
  {
    id: 'RPT-002',
    reportedUser: 'Jane Smith',
    reportedEmail: 'jane.s@email.com',
    reportedBy: 'Michael Chen',
    reporterEmail: 'm.chen@email.com',
    reason: 'Copyright Infringement',
    severity: 'Critical',
    date: '2024-03-02',
    status: 'Under Review',
    description: 'Uploaded multiple tracks containing uncleared samples',
    evidence: ['Uploaded files', 'Original track comparison'],
  },
  {
    id: 'RPT-003',
    reportedUser: 'Alex Brown',
    reportedEmail: 'alex.b@email.com',
    reportedBy: 'Emily Davis',
    reporterEmail: 'emily.d@email.com',
    reason: 'Spam/Scam',
    severity: 'Medium',
    date: '2024-03-03',
    status: 'Resolved',
    description: 'Sent unsolicited promotional messages to multiple users',
    evidence: ['Message screenshots'],
  },
];

type Report = typeof mockReports[0];

export default function UserReports() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Requests');

  const filteredReports = useMemo(() => {
    if (statusFilter === 'All Requests') return mockReports;
    return mockReports.filter(r => r.status === statusFilter);
  }, [statusFilter]);

  const stats = {
    total: mockReports.length,
    pending: mockReports.filter(r => r.status === 'Pending').length,
    underReview: mockReports.filter(r => r.status === 'Under Review').length,
    resolved: mockReports.filter(r => r.status === 'Resolved').length,
  };

  const SeverityBadge = ({ severity }: { severity: string }) => {
    const colors = {
      High: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      Critical: 'bg-red-500/20 text-red-400 border-red-500/40',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      Low: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    };

    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[severity as keyof typeof colors] || 'bg-gray-700 text-gray-300'}`}>
        {severity}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      'Under Review': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      Resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      Rejected: 'bg-red-500/20 text-red-400 border-red-500/40',
    };

    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[status as keyof typeof colors] || 'bg-gray-700 text-gray-300'}`}>
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
            <h1 className="text-2xl font-bold">User Reports</h1>
            <p className="text-gray-400 mt-1">Review and handle reported user violations</p>
          </div>

          <div className="relative w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500"
            >
              <option>All Requests</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Resolved</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={<AlertTriangle className="text-red-400" />} title="Total Reports" value={stats.total.toString()} />
          <KpiCard title="Pending Review" value={stats.pending.toString()} subtitle="Awaiting decision" color="text-yellow-400" />
          <KpiCard title="Under Review" value={stats.underReview.toString()} color="text-blue-400" />
          <KpiCard title="Resolved" value={stats.resolved.toString()} color="text-emerald-400" />
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-lg font-semibold">All User Reports</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">REPORT ID</th>
                  <th className="text-left p-4 font-medium">REPORTED USER</th>
                  <th className="text-left p-4 font-medium">REPORTED BY</th>
                  <th className="text-left p-4 font-medium">REASON</th>
                  <th className="text-left p-4 font-medium">SEVERITY</th>
                  <th className="text-left p-4 font-medium">DATE</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{report.id}</td>
                    <td className="p-4">
                      <div>{report.reportedUser}</div>
                      <div className="text-xs text-gray-500">{report.reportedEmail}</div>
                    </td>
                    <td className="p-4">
                      <div>{report.reportedBy}</div>
                      <div className="text-xs text-gray-500">{report.reporterEmail}</div>
                    </td>
                    <td className="p-4 text-gray-300">{report.reason}</td>
                    <td className="p-4"><SeverityBadge severity={report.severity} /></td>
                    <td className="p-4 text-gray-400">{report.date}</td>
                    <td className="p-4"><StatusBadge status={report.status} /></td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedReport(report)}
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

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Report Details</h2>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* ID & Severity */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-xs text-gray-500">Report ID</div>
                    <div className="text-lg font-medium">{selectedReport.id}</div>
                  </div>
                  <SeverityBadge severity={selectedReport.severity} />
                </div>

                {/* Reported User */}
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Reported User Details</div>
                  <div className="font-medium">{selectedReport.reportedUser}</div>
                  <div className="text-gray-400 text-sm">{selectedReport.reportedEmail}</div>
                </div>

                {/* Reporter */}
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Reporter Details</div>
                  <div className="font-medium">{selectedReport.reportedBy}</div>
                  <div className="text-gray-400 text-sm">{selectedReport.reporterEmail}</div>
                </div>

                {/* Violation & Description */}
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Violation Type</div>
                    <div className="font-medium text-orange-400">{selectedReport.reason}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Description</div>
                    <div className="text-gray-300">{selectedReport.description}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Evidence Provided</div>
                    <div className="flex gap-3 mt-2">
                      {selectedReport.evidence.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Report Date</div>
                      <div>{selectedReport.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Status</div>
                      <StatusBadge status={selectedReport.status} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-600/20 text-orange-400 border border-orange-500/40 rounded-lg hover:bg-orange-600/30">
                    <AlertTriangle size={18} />
                    Send Warning
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
                    <Clock size={18} />
                    Suspend Account
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-700/40 text-red-300 border border-red-600/50 rounded-lg hover:bg-red-700/50">
                    <XCircle size={18} />
                    Ban User
                  </button>

                  <button
                    onClick={() => setSelectedReport(null)}
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