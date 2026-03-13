// app/admin/login/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/logo.png"
import { Shield } from 'lucide-react';
import LogoContainer from '@/components/ReUsableComponent/LogoContainer/LogoContainer';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-[#E54FA9]/20 rounded-lg shadow-2xl shadow-[#831CDF]/20 overflow-hidden relative">
        
        {/* Decorative gradient orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#831CDF]/20 to-[#E54FA9]/20 rounded-full blur-3xl" />

        {/* Header  Logo area */}
        <div className="flex items-center justify-center gap-3 pt-8 relative z-10">
          <LogoContainer/>
          <div>
         
            <p className="text-gray-400 text-xs flex items-center gap-1">
              <Shield size={12} className="text-[#E54FA9]" />
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Admin Access</h1>
            <p className="text-sm text-gray-400">Secure portal for administrators</p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue="admin@spartst.com"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                placeholder="admin@spartst.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/login/verify-email"
                className="text-sm bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent hover:from-[#D63F99] hover:to-[#730CCF] transition-all"
              >
                Forgot Password?
              </Link>
            </div>

            <Link href="/dashboard">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E54FA9] to-[#831CDF] hover:from-[#D63F99] hover:to-[#730CCF] text-white font-medium py-3.5 rounded-md transition-all duration-200 shadow-lg shadow-[#831CDF]/30 active:scale-[0.98]"
              >
                Sign In
              </button>
            </Link>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
              <div className="w-1 h-1 bg-[#E54FA9] rounded-full" />
              <span>Secure 256-bit encryption</span>
              <div className="w-1 h-1 bg-[#831CDF] rounded-full" />
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-xs text-gray-600">
              Authorized access only. All activities are logged and monitored.
            </p>
            
            {/* Admin Badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="px-2 py-1 bg-gradient-to-r from-[#E54FA9]/10 to-[#831CDF]/10 rounded-md border border-[#E54FA9]/20">
                <span className="text-[10px] bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-medium">
                  ADMIN PORTAL v2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}