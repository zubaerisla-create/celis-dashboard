'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Menu, X, Home, Users, Settings, FileText, BarChart3, LogOut,
  Shield, CreditCard, DollarSign, RefreshCw, AlertCircle, Activity,
  Database, PieChart, HeadphonesIcon, UserCog, FileCheck, Lock,
  TrendingUp, Bell, Star, Clock, Wallet, ShieldAlert, Image as ImageIcon,
  MessageSquare, HelpCircle, ChevronRight, Search, User, ChevronDown
} from 'lucide-react';

import logo from "../../public/logo.png"
import LogoContainer from '@/components/ReUsableComponent/LogoContainer/LogoContainer';

const sidebarItems = [
  { 
    name: 'Dashboard Overview', 
    href: '/dashboard', 
    icon: Home,
    description: 'Analytics & metrics'
  },
  { 
    name: 'User Management', 
    href: '/dashboard/user-management', 
    icon: Users,
    description: 'Manage users & roles'
  },
  { 
    name: 'Content Moderation', 
    href: '/dashboard/content-moderation', 
    icon: Shield,
    description: 'Review & approve content'
  },
  { 
    name: 'Briefs Management', 
    href: '/dashboard/briefs-management', 
    icon: FileText,
    description: 'Creative briefs'
  },
  { 
    name: 'Submissions', 
    href: '/dashboard/submissions', 
    icon: FileCheck,
    description: 'View all submissions'
  },
  { 
    name: 'Licensing & Transactions', 
    href: '/dashboard/licensing-transactions', 
    icon: CreditCard,
    description: 'Manage licenses'
  },
  { 
    name: 'Subscriptions', 
    href: '/dashboard/subscriptions', 
    icon: TrendingUp,
    description: 'Plans & billing'
  },
  { 
    name: 'Payout Requests', 
    href: '/dashboard/payout-requests', 
    icon: DollarSign,
    description: 'Creator payouts'
  },
  { 
    name: 'Refund Management', 
    href: '/dashboard/refund-management', 
    icon: RefreshCw,
    description: 'Process refunds'
  },
  { 
    name: 'User Reports', 
    href: '/dashboard/user-reports', 
    icon: AlertCircle,
    description: 'Reports & flags'
  },
  { 
    name: 'Activity Log', 
    href: '/dashboard/activity-log', 
    icon: Activity,
    description: 'User activities'
  },
  { 
    name: 'Storage', 
    href: '/dashboard/storage', 
    icon: Database,
    description: 'File management'
  },
  { 
    name: 'Analytics & Reports', 
    href: '/dashboard/analytics-reports', 
    icon: PieChart,
    description: 'Deep insights'
  },
  { 
    name: 'Contact & Support', 
    href: '/dashboard/contact-support', 
    icon: HeadphonesIcon,
    description: 'Customer support'
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    description: 'System configuration'
  },
];

// Group items for better organization
const sidebarGroups = [
  {
    title: 'MAIN',
    items: sidebarItems.slice(0, 4)
  },
  {
    title: 'FINANCIAL',
    items: sidebarItems.slice(4, 9)
  },
  {
    title: 'MONITORING',
    items: sidebarItems.slice(9, 13)
  },
  {
    title: 'SYSTEM',
    items: sidebarItems.slice(13, 15)
  }
];

// Notification data from the image
const notifications = [
  {
    id: 1,
    title: 'New Content Flagged',
    description: 'Beat Pack Vol. 3 has been flagged for inappropriate content',
    time: '5 minutes ago',
    type: 'alert'
  },
  {
    id: 2,
    title: 'Brief Pending Approval',
    description: 'Urban Beats Collection is waiting for your approval',
    time: '1 hour ago',
    type: 'pending'
  },
  {
    id: 3,
    title: 'High Value Transaction',
    description: 'A $500 license purchase requires verification',
    time: '2 hours ago',
    type: 'transaction'
  },
  {
    id: 4,
    title: 'System Update',
    description: 'Platform maintenance scheduled for tonight at 2 AM',
    time: '3 hours ago',
    type: 'system'
  },
  {
    id: 5,
    title: 'Content Approved',
    description: 'Summer Mix 2024 has been successfully approved',
    time: '5 hours ago',
    type: 'success'
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['MAIN', 'FINANCIAL', 'MONITORING', 'SYSTEM']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const clearAll = () => {
    setUnreadCount(0);
    // You can also clear notifications from state if needed
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] text-white rounded-xl shadow-lg hover:shadow-[#831CDF]/30 transition-all duration-300 hover:scale-105"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area with Admin Dashboard text below */}
        <div className="relative pt-6 pb-4 px-4 flex flex-col items-center border-b border-gray-800/50">
          <div className="mb-2">
            <LogoContainer/>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <Shield size={14} className="text-[#E54FA9]" />
              <span className="text-xs font-medium bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent">
                ADMIN DASHBOARD
              </span>
              <Shield size={14} className="text-[#831CDF]" />
            </div>
            <p className="text-[10px] text-gray-500">v2.0 • Secure Access</p>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/50 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="h-[calc(100vh-9rem)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-gray-700">
          <nav className="py-4 px-3">
            {sidebarGroups.map((group) => (
              <div key={group.title} className="mb-4">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-4 py-1.5 mb-0.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                >
                  <span>{group.title}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 ${
                      expandedGroups.includes(group.title) ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Group Items */}
                <div className={`space-y-0.5 transition-all duration-200 ${
                  expandedGroups.includes(group.title) ? 'block' : 'hidden'
                }`}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#E54FA9] to-[#831CDF] text-white shadow-lg shadow-[#831CDF]/20'
                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                        }`}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                        )}

                        {/* Icon */}
                        <Icon size={18} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />

                        {/* Text */}
                        <span className="text-sm font-medium truncate">{item.name}</span>

                        {/* Badge for new items */}
                        {item.name === 'Payout Requests' && (
                          <span className="ml-auto px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-[#E54FA9] to-[#831CDF] text-white rounded-full animate-pulse">
                            3
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer note */}
          <div className="px-4 py-3 mt-2">
            <div className="text-[10px] text-gray-600 text-center border-t border-gray-800/50 pt-3">
              <p>© 2024 SPARTST</p>
              <p className="mt-0.5">All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50">
        {/* Header */}
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50 relative z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            {/* Mobile Menu Toggle (hidden on desktop) */}
            <div className="lg:hidden w-8"></div>

            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative"></div>
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-3">
              {/* Notifications Icon */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2.5 bg-gray-800/50 hover:bg-gradient-to-r hover:from-[#E54FA9] hover:to-[#831CDF] rounded-lg border border-gray-700/50 transition-all"
                >
                  <Bell size={20} className="text-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-gray-800 rounded-lg border border-gray-700 shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">
                          Notifications (<span className="text-[#E54FA9]">{unreadCount}</span>)
                        </h3>
                        <div className="flex gap-3">
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs text-gray-400 hover:text-[#E54FA9] transition-colors"
                          >
                            Mark all read
                          </button>
                          <span className="text-gray-600">|</span>
                          <button 
                            onClick={clearAll}
                            className="text-xs text-gray-400 hover:text-[#E54FA9] transition-colors"
                          >
                            Clear all
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-700/50 hover:bg-gradient-to-r hover:from-[#E54FA9]/10 hover:to-[#831CDF]/10 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                              ${notification.type === 'alert' ? 'bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 text-[#E54FA9]' :
                                notification.type === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                notification.type === 'transaction' ? 'bg-green-500/20 text-green-500' :
                                notification.type === 'system' ? 'bg-blue-500/20 text-blue-500' :
                                'bg-emerald-500/20 text-emerald-500'
                              }`}
                            >
                              {notification.type === 'alert' && <AlertCircle size={16} />}
                              {notification.type === 'pending' && <Clock size={16} />}
                              {notification.type === 'transaction' && <DollarSign size={16} />}
                              {notification.type === 'system' && <RefreshCw size={16} />}
                              {notification.type === 'success' && <FileCheck size={16} />}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium group-hover:text-[#E54FA9] transition-colors">
                                {notification.title}
                              </h4>
                              <p className="text-gray-400 text-xs mt-0.5">{notification.description}</p>
                              <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 bg-gray-800/50 hover:bg-gradient-to-r hover:from-[#E54FA9] hover:to-[#831CDF] rounded-lg px-3 py-2 border border-gray-700/50 transition-all group"
                >
                  <div className="w-7 h-7 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] rounded-md flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-300 text-sm hidden lg:block group-hover:text-white transition-colors">View Profile</span>
                  <ChevronDown size={16} className="text-gray-500 hidden lg:block group-hover:text-white transition-colors" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg border border-gray-700 shadow-xl z-50 overflow-hidden">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-[#E54FA9] hover:to-[#831CDF] transition-all"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User size={16} />
                      <span>View Profile</span>
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-[#E54FA9] hover:to-[#831CDF] transition-all border-t border-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Content wrapper with subtle background */}
          <div className="max-w-9xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}