// app/admin/new-password/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Lock, KeyRound, ArrowLeft, Shield, Check, X } from 'lucide-react';
import logo from "../../../public/logo.png"
import LogoContainer from '@/components/ReUsableComponent/LogoContainer/LogoContainer';

export default function NewPassword() {
  // Password requirements check (for UI demonstration)
  const password = "Demo@123"; // This would be dynamic in a real implementation
  const requirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains a number", met: /[0-9]/.test(password) },
    { text: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
    { text: "Contains uppercase & lowercase", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-[#E54FA9]/20 rounded-lg shadow-2xl shadow-[#831CDF]/20 overflow-hidden relative">
        
        {/* Decorative gradient orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#831CDF]/20 to-[#E54FA9]/20 rounded-full blur-3xl" />

        {/* Header / Logo area */}
        <div className="flex flex-col items-center pt-8 relative z-10">
          <div className="mb-2">
            <LogoContainer/>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <KeyRound size={14} className="text-[#E54FA9]" />
            <p className="text-gray-400 text-xs">Create New Password</p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8 relative z-10">
          {/* Instruction with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 flex items-center justify-center border border-[#E54FA9]/30">
              <Lock size={32} className="text-[#E54FA9]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Set New Password</h2>
            <p className="text-sm text-gray-400">
              Enter your new password below
            </p>
          </div>

          <form className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  defaultValue="Demo@123"
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter new password"
                  defaultValue="Demo@123"
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                />
              </div>
            </div>

            {/* Password strength indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Password strength</span>
                <span className="text-xs bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-medium">
                  Strong
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                <div className="flex-1 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] rounded-l-full"></div>
                <div className="flex-1 bg-gradient-to-r from-[#E54FA9] to-[#831CDF]"></div>
                <div className="flex-1 bg-gradient-to-r from-[#E54FA9] to-[#831CDF]"></div>
                <div className="flex-1 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] rounded-r-full"></div>
              </div>
            </div>

            {/* Password requirements checklist */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 space-y-2">
              <h4 className="text-xs font-medium text-gray-300 mb-2">Password requirements:</h4>
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <X size={14} className="text-gray-600" />
                  )}
                  <span className={`text-xs ${req.met ? 'text-gray-300' : 'text-gray-500'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/login">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E54FA9] to-[#831CDF] hover:from-[#D63F99] hover:to-[#730CCF] text-white font-medium py-3.5 rounded-md transition-all duration-200 shadow-lg shadow-[#831CDF]/30 active:scale-[0.98]"
              >
                Reset Password
              </button>
            </Link>
          </form>

          {/* Back to login link */}
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#E54FA9] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

          {/* Security note */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-center gap-2">
              <Shield size={14} className="text-[#E54FA9]" />
              <p className="text-xs text-gray-500 text-center">
                Make sure to use a strong password you haven't used before
              </p>
              <Shield size={14} className="text-[#831CDF]" />
            </div>
            
            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="px-2 py-1 bg-gradient-to-r from-[#E54FA9]/10 to-[#831CDF]/10 rounded-md border border-[#E54FA9]/20">
                <span className="text-[10px] bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-medium">
                  SECURE PASSWORD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}