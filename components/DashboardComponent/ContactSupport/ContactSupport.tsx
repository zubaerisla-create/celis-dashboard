// app/admin/support/page.tsx
'use client';

import { useState } from 'react';
import { Search, ChevronDown, X, Paperclip, Send, AlertCircle, Clock, CheckCircle } from 'lucide-react';

// Mock ticket data
const mockTickets = [
  {
    id: 'TKT-001',
    user: 'Sarah Johnson',
    email: 'sarahj@email.com',
    subject: 'Payment Processing Issue',
    status: 'Open',
    priority: 'High',
    created: 'Feb 20, 2024 10:30 AM',
    message: "I'm having issues with my payment processing. The transaction keeps failing.",
    attachment: 'screenshot.png',
  },
  {
    id: 'TKT-002',
    user: 'Michael Chen',
    email: 'm.chen@email.com',
    subject: 'Account Verification Needed',
    status: 'In Progress',
    priority: 'Medium',
    created: 'Feb 19, 2024 2:15 PM',
  },
  {
    id: 'TKT-003',
    user: 'Emily Davis',
    email: 'emily.d@email.com',
    subject: 'Feature Request: Export Analytics',
    status: 'Resolved',
    priority: 'Low',
    created: 'Feb 18, 2024 9:00 AM',
  },
  {
    id: 'TKT-004',
    user: 'James Wilson',
    email: 'j.wilson@email.com',
    subject: 'Storage Limit Exceeded',
    status: 'Open',
    priority: 'High',
    created: 'Feb 21, 2024 8:45 AM',
  },
  {
    id: 'TKT-005',
    user: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    subject: 'Brief Submission Not Showing',
    status: 'In Progress',
    priority: 'Medium',
    created: 'Feb 20, 2024 3:20 PM',
  },
];

type Ticket = typeof mockTickets[0];

export default function ContactSupport() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search, setSearch] = useState('');

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.user.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All Status' || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      Open: 'bg-red-500/20 text-red-400 border-red-500/40',
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      Resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    };

    const icons = {
      Open: <AlertCircle size={14} />,
      'In Progress': <Clock size={14} />,
      Resolved: <CheckCircle size={14} />,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border ${styles[status as keyof typeof styles] || 'bg-gray-700 text-gray-300'}`}>
        {icons[status as keyof typeof icons]}
        {status}
      </span>
    );
  };

  const PriorityBadge = ({ priority }: { priority: string }) => {
    const colors = {
      High: 'bg-red-600/30 text-red-400 border-red-500/40',
      Medium: 'bg-yellow-600/30 text-yellow-400 border-yellow-500/40',
      Low: 'bg-blue-600/30 text-blue-400 border-blue-500/40',
    };

    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[priority as keyof typeof colors] || 'bg-gray-700 text-gray-300'}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Contact & Support</h1>
            <p className="text-gray-400 mt-1">Manage support tickets and customer inquiries</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm">
              <span className="px-2.5 py-1 bg-red-600/30 text-red-400 rounded">2 Open</span>
              <span className="px-2.5 py-1 bg-yellow-600/30 text-yellow-400 rounded">2 In Progress</span>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by ticket ID, user, or subject..."
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
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-950/70 border-b border-gray-800">
                  <th className="text-left p-4 font-medium">TICKET ID</th>
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">SUBJECT</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">PRIORITY</th>
                  <th className="text-left p-4 font-medium">CREATED</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                    <td className="p-4 font-medium">{ticket.id}</td>
                    <td className="p-4">
                      <div>{ticket.user}</div>
                      <div className="text-xs text-gray-500">{ticket.email}</div>
                    </td>
                    <td className="p-4 text-gray-300">{ticket.subject}</td>
                    <td className="p-4"><StatusBadge status={ticket.status} /></td>
                    <td className="p-4"><PriorityBadge priority={ticket.priority} /></td>
                    <td className="p-4 text-gray-400">{ticket.created}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedTicket.id} • {selectedTicket.user} ({selectedTicket.email})
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Status & Priority */}
                <div className="flex items-center gap-3 mb-6">
                  <StatusBadge status={selectedTicket.status} />
                  <PriorityBadge priority={selectedTicket.priority} />
                </div>

                {/* Message Thread */}
                <div className="space-y-6 mb-8">
                  {/* User Message */}
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{selectedTicket.user}</div>
                      <div className="text-xs text-gray-500">{selectedTicket.created}</div>
                    </div>
                    <p className="text-gray-300 mb-3">{selectedTicket.message}</p>
                    {selectedTicket.attachment && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded text-sm text-blue-400">
                        <Paperclip size={16} />
                        {selectedTicket.attachment}
                      </div>
                    )}
                  </div>

                  {/* Admin Reply Area */}
                  <div>
                    <div className="text-sm font-medium mb-3">Admin Reply</div>
                    <textarea
                      placeholder="Type your reply here..."
                      rows={4}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-4 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
                      <Paperclip size={16} />
                      Attach File
                    </button>
                  </div>

                  <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex-1">
                    <Send size={16} />
                    Send Reply
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