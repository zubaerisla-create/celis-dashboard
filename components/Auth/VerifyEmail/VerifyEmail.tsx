// app/admin/verify-email/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import logo from "../../../public/logo.png"
import LogoContainer from '@/components/ReUsableComponent/LogoContainer/LogoContainer';

export default function VerifyEmail() {
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
            <Mail size={14} className="text-[#E54FA9]" />
            <p className="text-gray-400 text-xs">Email Verification</p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8 relative z-10">
          {/* Instruction text with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 flex items-center justify-center border border-[#E54FA9]/30">
              <Mail size={32} className="text-[#E54FA9]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Verify Your Email</h2>
            <p className="text-sm text-gray-400">
              Enter your email address to receive a verification link
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@spartst.com"
                  defaultValue="admin@spartst.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                />
              </div>
            </div>

            <Link href="/login/verify-email/verify-otp">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E54FA9] to-[#831CDF] hover:from-[#D63F99] hover:to-[#730CCF] text-white font-medium py-3.5 rounded-md transition-all duration-200 shadow-lg shadow-[#831CDF]/30 active:scale-[0.98]"
              >
                Send Verification Link
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

          {/* Info note */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
              <Shield size={12} className="text-[#E54FA9]" />
              We'll send a verification link to your email address
              <Shield size={12} className="text-[#831CDF]" />
            </p>
            
            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="px-2 py-1 bg-gradient-to-r from-[#E54FA9]/10 to-[#831CDF]/10 rounded-md border border-[#E54FA9]/20">
                <span className="text-[10px] bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-medium">
                  SECURE VERIFICATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}