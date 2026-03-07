// app/admin/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Check, X, Plus, Edit, Trash2, Save, AlertTriangle, Users, Shield, DollarSign, Bell, Send, Menu } from 'lucide-react';

type Tab = 'roles' | 'permissions' | 'pricing' | 'announcements';

type Plan = {
  name: string;
  price: number;
  storage: string;
  active: boolean;
  features?: string[];
};

const plans = [
  { name: 'Ignite', price: 9.99, storage: '10 GB', active: true, features: ['Advanced features', 'Priority support', 'Analytics'] },
  { name: 'Launch', price: 29.99, storage: '30 GB', active: true, features: ['Advanced features', 'Priority support', 'Analytics'] },
  { name: 'Excel', price: 49.99, storage: '60 GB', active: true, features: ['Advanced features', 'Priority support', 'Analytics'] },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('roles');
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [addingPlan, setAddingPlan] = useState<boolean>(false);
  const [deletingPlan, setDeletingPlan] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'roles', label: 'Admin Roles', icon: <Users size={18} /> },
    { id: 'permissions', label: 'Permissions', icon: <Shield size={18} /> },
    { id: 'pricing', label: 'Plan Pricing', icon: <DollarSign size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Bell size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-gray-400 text-xs">Manage platform configuration</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gray-800 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-50 w-64 md:w-64 bg-gray-900 border-r border-gray-800 
            flex flex-col transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Desktop Header */}
          <div className="hidden md:block p-4 lg:p-6 border-b border-gray-800">
            <h1 className="text-xl lg:text-2xl font-bold">Settings</h1>
            <p className="text-gray-400 text-xs lg:text-sm mt-1">Manage platform configuration</p>
          </div>

          {/* Mobile Sidebar Header */}
          <div className="md:hidden p-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-800 rounded"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <nav className="flex-1 p-2 lg:p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'pricing' && <DollarSign size={14} className="text-amber-400" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-950">
          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold">Admin Role Management</h2>
                <p className="text-gray-400 text-sm lg:text-base mt-1">Manage admin accounts and their access levels</p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {[
                  {
                    title: 'Super Admin',
                    users: 3,
                    color: 'bg-red-600',
                    capabilities: [
                      'Full user management',
                      'Content moderation',
                      'Financial data access',
                      'System settings',
                    ],
                  },
                  {
                    title: 'Moderator',
                    users: 8,
                    color: 'bg-blue-600',
                    capabilities: ['Content & user moderation', 'Brief management'],
                  },
                  {
                    title: 'Finance',
                    users: 4,
                    color: 'bg-emerald-600',
                    capabilities: [
                      'Transaction & billing access',
                      'Financial data access',
                      'Analytics management',
                    ],
                  },
                ].map(role => (
                  <div
                    key={role.title}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 lg:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-base lg:text-lg font-semibold">{role.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.color} w-fit`}>
                        {role.users} users
                      </span>
                    </div>

                    <div className="text-xs lg:text-sm text-gray-400 mb-3">Capabilities:</div>
                    <ul className="space-y-2 text-xs lg:text-sm">
                      {role.capabilities.map(cap => (
                        <li key={cap} className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400 flex-shrink-0" />
                          <span className="text-gray-300">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button className="w-full sm:w-auto mt-4 lg:mt-6 px-4 lg:px-6 py-2.5 lg:py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium text-sm">
                + Add New Role
              </button>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold">Permission Matrix</h2>
                <p className="text-gray-400 text-sm lg:text-base mt-1">Configure role-based access controls</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
                <div className="min-w-[640px]">
                  <table className="w-full text-xs lg:text-sm">
                    <thead>
                      <tr className="bg-gray-950 border-b border-gray-800">
                        <th className="text-left p-3 lg:p-5 font-medium">PERMISSION</th>
                        <th className="text-center p-3 lg:p-5 font-medium">SUPER ADMIN</th>
                        <th className="text-center p-3 lg:p-5 font-medium">MODERATOR</th>
                        <th className="text-center p-3 lg:p-5 font-medium">FINANCE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'User Management',
                        'Content Moderation',
                        'Financial Data',
                        'Brief Management',
                        'Analytics',
                        'Settings',
                      ].map(perm => (
                        <tr key={perm} className="border-b border-gray-800">
                          <td className="p-3 lg:p-5 font-medium whitespace-nowrap">{perm}</td>
                          <td className="text-center p-3 lg:p-5">
                            <Check className="inline text-emerald-400" size={18} />
                          </td>
                          <td className="text-center p-3 lg:p-5">
                            {['User Management', 'Content Moderation', 'Brief Management'].includes(perm) ? (
                              <Check className="inline text-emerald-400" size={18} />
                            ) : (
                              <X className="inline text-red-400" size={18} />
                            )}
                          </td>
                          <td className="text-center p-3 lg:p-5">
                            {['Financial Data', 'Analytics'].includes(perm) ? (
                              <Check className="inline text-emerald-400" size={18} />
                            ) : (
                              <X className="inline text-red-400" size={18} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button className="w-full sm:w-auto mt-4 lg:mt-6 px-6 lg:px-8 py-2.5 lg:py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold">Plan Pricing</h2>
                  <p className="text-gray-400 text-sm lg:text-base mt-1">Update subscription plan pricing and features</p>
                </div>
                <button
                  onClick={() => setAddingPlan(true)}
                  className="flex items-center justify-center gap-2 px-4 lg:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm w-full sm:w-auto"
                >
                  <Plus size={18} />
                  Add Plan
                </button>
              </div>

              <div className="space-y-4 lg:space-y-5">
                {plans.map(plan => (
                  <div
                    key={plan.name}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4 lg:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg lg:text-xl font-semibold">{plan.name}</h3>
                        <span className="px-2 lg:px-3 py-1 bg-emerald-600/30 text-emerald-400 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPlan(plan)}
                          className="p-1.5 lg:p-2 hover:bg-gray-800 rounded-lg"
                        >
                          <Edit size={16} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => setDeletingPlan(plan.name)}
                          className="p-1.5 lg:p-2 hover:bg-gray-800 rounded-lg"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-xs lg:text-sm">
                      <div>
                        <div className="text-gray-500">Price</div>
                        <div className="font-medium mt-1">${plan.price}/mo</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Storage</div>
                        <div className="font-medium mt-1">{plan.storage}</div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="text-gray-500">Features</div>
                        <ul className="mt-1 space-y-1 text-gray-300">
                          {plan.features?.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full sm:w-auto mt-4 lg:mt-6 px-6 lg:px-8 py-2.5 lg:py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold">System Announcements</h2>
                <p className="text-gray-400 text-sm lg:text-base mt-1">Create platform-wide announcements for users</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5 lg:mb-2">Announcement Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter announcement title..."
                  />
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5 lg:mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Write your announcement message here..."
                  />
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5 lg:mb-2">Type</label>
                  <select className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm">
                    <option>Info</option>
                    <option>Warning</option>
                    <option>Maintenance</option>
                    <option>Promotion</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button className="px-4 lg:px-6 py-2.5 lg:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm order-2 sm:order-1">
                    Cancel
                  </button>
                  <button className="px-4 lg:px-6 py-2.5 lg:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm order-1 sm:order-2">
                    <Send size={16} />
                    Publish Announcement
                  </button>
                </div>
              </div>

              <button className="w-full sm:w-auto mt-4 px-6 lg:px-8 py-2.5 lg:py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Add Plan Modal */}
      {addingPlan && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Add New Plan</h3>

              <div className="space-y-4 lg:space-y-5">
                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium, Pro, etc."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="29.99"
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Billing Cycle</label>
                    <select className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                      <option>monthly</option>
                      <option>yearly</option>
                      <option>quarterly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Storage</label>
                  <input
                    type="text"
                    placeholder="e.g., 100 GB, Unlimited"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Features (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Advanced features, Priority support, Analytics"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs lg:text-sm">Active (visible to users)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 lg:mt-8">
                <button
                  onClick={() => setAddingPlan(false)}
                  className="px-4 lg:px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button className="px-4 lg:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm order-1 sm:order-2">
                  <Save size={18} />
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Edit Plan</h3>

              <div className="space-y-4 lg:space-y-5">
                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Plan Name</label>
                  <input
                    type="text"
                    defaultValue={editingPlan.name}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={editingPlan.price}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Billing Cycle</label>
                    <select className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                      <option selected>monthly</option>
                      <option>yearly</option>
                      <option>quarterly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Storage</label>
                  <input
                    type="text"
                    defaultValue={editingPlan.storage}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs lg:text-sm text-gray-400 mb-1.5">Features (comma separated)</label>
                  <input
                    type="text"
                    defaultValue={editingPlan.features?.join(', ')}
                    placeholder="Advanced features, Priority support, Analytics"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 lg:px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={editingPlan.active} className="w-4 h-4 lg:w-5 lg:h-5 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs lg:text-sm">Active (visible to users)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 lg:mt-8">
                <button
                  onClick={() => setEditingPlan(null)}
                  className="px-4 lg:px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button className="px-4 lg:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm order-1 sm:order-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingPlan && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-4 lg:p-6">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle size={20} className="lg:w-6 lg:h-6" />
              <h3 className="text-lg lg:text-xl font-bold">Delete Plan</h3>
            </div>
            <p className="text-gray-400 text-sm lg:text-base mb-6">
              Are you sure you want to delete the "{deletingPlan}" plan?<br />
              This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setDeletingPlan(null)}
                className="px-4 lg:px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-sm order-2 sm:order-1"
              >
                Cancel
              </button>
              <button className="px-4 lg:px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex items-center justify-center gap-2 text-sm order-1 sm:order-2">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}