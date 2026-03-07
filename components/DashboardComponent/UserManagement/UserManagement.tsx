// app/admin/users/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  Search, Filter, ChevronDown, MoreHorizontal, Eye, 
  CheckCircle2, XCircle, Ban, UserX, UserCheck, Download,
  Shield, Mail, Edit, Trash2, RefreshCw
} from 'lucide-react';

// ── Mock data (replace with real API later)
const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarahj@email.com', role: 'Creator', plan: 'Excel', status: 'Active', storage: '8.2 GB', lastActive: '2 hours ago', verified: true, flags: 0 },
  { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', role: 'A&R', plan: 'Launch', status: 'Active', storage: '3.5 GB', lastActive: '1 day ago', verified: true, flags: 0 },
  { id: 3, name: 'Emily Davis', email: 'emilyd@email.com', role: 'Creator', plan: 'Ignite', status: 'Suspended', storage: '1.8 GB', lastActive: '5 days ago', verified: false, flags: 3 },
  { id: 4, name: 'James Wilson', email: 'j.wilson@email.com', role: 'Creator', plan: 'Launch', status: 'Active', storage: '5.4 GB', lastActive: '3 hours ago', verified: true, flags: 0 },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.a@email.com', role: 'A&R', plan: 'Excel', status: 'Active', storage: '12.1 GB', lastActive: '30 minutes ago', verified: true, flags: 0 },
];

type User = typeof mockUsers[0];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const PlanBadge = ({ plan }: { plan: string }) => {
    const colors = {
      Excel: 'bg-amber-600/30 text-amber-400 border-amber-500/40',
      Launch: 'bg-emerald-600/30 text-emerald-400 border-emerald-500/40',
      Ignite: 'bg-blue-600/30 text-blue-400 border-blue-500/40',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${colors[plan as keyof typeof colors] || 'bg-gray-700 text-gray-300'}`}>
        {plan}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      Active: 'bg-emerald-500/20 text-emerald-400',
      Suspended: 'bg-red-500/20 text-red-400',
    };
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-700 text-gray-300'}`}>
        {status}
      </span>
    );
  };

  // Handle dropdown toggle
  const toggleDropdown = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  // Handle action click
  const handleAction = (action: string, user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    console.log(`${action} clicked for`, user);
    // Add your action logic here
    alert(`${action} action for ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-gray text-gray-100">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Search + Filters */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Filter dropdowns - appear when clicked */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 border border-gray-800 rounded-lg">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Role</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                  <option>All Role</option>
                  <option>Creator</option>
                  <option>A&R</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Plan</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                  <option>All Plan</option>
                  <option>Ignite</option>
                  <option>Launch</option>
                  <option>Excel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Status</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-950/70">
                  <th className="text-left p-4 font-medium">USER</th>
                  <th className="text-left p-4 font-medium">ROLE</th>
                  <th className="text-left p-4 font-medium">PLAN</th>
                  <th className="text-left p-4 font-medium">STATUS</th>
                  <th className="text-left p-4 font-medium">STORAGE</th>
                  <th className="text-left p-4 font-medium">LAST ACTIVE</th>
                  <th className="text-left p-4 font-medium">VERIFIED</th>
                  <th className="text-left p-4 font-medium">FLAGS</th>
                  <th className="text-left p-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <div>{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4"><PlanBadge plan={user.plan} /></td>
                    <td className="p-4"><StatusBadge status={user.status} /></td>
                    <td className="p-4">{user.storage}</td>
                    <td className="p-4 text-gray-400">{user.lastActive}</td>
                    <td className="p-4">
                      {user.verified ? (
                        <CheckCircle2 className="text-emerald-400" size={18} />
                      ) : (
                        <XCircle className="text-red-400" size={18} />
                      )}
                    </td>
                    <td className="p-4">{user.flags}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <Eye size={18} />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={(e) => toggleDropdown(user.id, e)}
                            className="text-gray-400 hover:text-gray-200"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          
                          {/* Dropdown Menu */}
                          {openDropdownId === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
                              <div className="py-1">
                         
                        
                                <div className="border-t border-gray-800 my-1"></div>
                                <button
                                  onClick={(e) => handleAction('Verify', user, e)}
                                  className="w-full text-left px-4 py-2 text-sm text-emerald-400 hover:bg-gray-800 flex items-center gap-2"
                                >
                                  <CheckCircle2 size={14} /> Verify User
                                </button>
                                <button
                                  onClick={(e) => handleAction('Suspend', user, e)}
                                  className="w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-gray-800 flex items-center gap-2"
                                >
                                  <Ban size={14} /> Suspend User
                                </button>
                                <button
                                  onClick={(e) => handleAction('Ban', user, e)}
                                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
                                >
                                  <UserX size={14} /> Ban User
                                </button>
                                <div className="border-t border-gray-800 my-1"></div>
                                <button
                                  onClick={(e) => handleAction('Delete', user, e)}
                                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 flex items-center gap-2"
                                >
                                  <Trash2 size={14} /> Delete User
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-800 text-sm text-gray-400">
            <div>Showing 1 to {filteredUsers.length} of 12,543 users</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-800">Previous</button>
              <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-800">Next</button>
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {openDropdownId && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setOpenDropdownId(null)}
          />
        )}

        {/* User Detail Panel (side sheet / modal style) */}
        {selectedUser && (
          <div className="fixed pt-16 inset-0 bg-black/60 flex justify-end z-50">
            <div className="w-full max-w-2xl h-full bg-gray-950 border-l border-gray-800 overflow-y-auto">
              <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ← {selectedUser.name}
                  </button>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30">
                      <UserCheck size={16} className="inline mr-1.5" /> Approve Account
                    </button>
                    <button className="px-4 py-2 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-600/30">
                      Upgrade Plan
                    </button>
                    <button className="px-4 py-2 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-600/30">
                      <UserX size={16} className="inline mr-1.5" /> Suspend
                    </button>
                    <button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30">
                      <Ban size={16} className="inline mr-1.5" /> Ban User
                    </button>
                  </div>
                </div>

                {/* User Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedUser.name[0]}{selectedUser.name.split(' ')[1]?.[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                        {selectedUser.verified && <CheckCircle2 className="text-emerald-400" size={20} />}
                      </div>
                      <div className="text-gray-400 mt-1">{selectedUser.email}</div>
                      <div className="flex gap-3 mt-3">
                        <PlanBadge plan={selectedUser.plan} />
                        <StatusBadge status={selectedUser.status} />
                        <span className="px-2.5 py-1 bg-gray-800 rounded text-xs font-medium">
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-800">
                    <div>
                      <div className="text-xs text-gray-500">Join Date</div>
                      <div className="mt-1">Jan 15, 2025</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Last Active</div>
                      <div className="mt-1">{selectedUser.lastActive}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Storage Used</div>
                      <div className="mt-1">{selectedUser.storage} / 50 GB</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Flags</div>
                      <div className="mt-1">{selectedUser.flags}</div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-800 mb-6">
                  <div className="flex gap-6">
                    {['Overview', 'Submissions', 'Subscription', 'Reports', 'Activity'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab 
                            ? 'border-blue-500 text-blue-400' 
                            : 'border-transparent text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'Overview' && (
                    <div className="space-y-6">
                      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                        <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Location</span>
                            <span>Los Angeles, CA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Genre</span>
                            <span>Hip-Hop, R&B</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Account Status</span>
                            <span className="text-emerald-400">All systems operational. No restrictions.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Submissions' && (
                    <div className="text-gray-400">Submissions list will appear here...</div>
                  )}
                  {activeTab === 'Subscription' && (
                    <div className="text-gray-400">Subscription history and plan details...</div>
                  )}
                  {activeTab === 'Reports' && (
                    <div className="text-gray-400">Flagged content and reports...</div>
                  )}
                  {activeTab === 'Activity' && (
                    <div className="text-gray-400">Recent activity log...</div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}