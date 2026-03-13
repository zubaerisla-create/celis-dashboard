// app/admin/verify-otp/page.tsx (Alternative version with single input)
import Image from 'next/image';
import Link from 'next/link';
import { KeyRound, Mail, ArrowLeft, Clock, Shield } from 'lucide-react';
import logo from "../../../public/logo.png"
import LogoContainer from '@/components/ReUsableComponent/LogoContainer/LogoContainer';

export default function VerifyOtp() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-[#E54FA9]/20 rounded-lg shadow-2xl shadow-[#831CDF]/20 overflow-hidden relative">
        
        {/* Decorative gradient orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#831CDF]/20 to-[#E54FA9]/20 rounded-full blur-3xl" />

        {/* Header / Logo area */}
        <div className="flex flex-col items-center pt-8 relative z-10">
        <LogoContainer/>
          <div>
          
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mt-1">
              <KeyRound size={12} className="text-[#E54FA9]" />
              OTP Verification
            </p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8 relative z-10">
          {/* Email info with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 flex items-center justify-center border border-[#E54FA9]/30">
              <Mail size={32} className="text-[#E54FA9]" />
            </div>
            <p className="text-gray-400 text-sm">
              Enter the OTP sent to
            </p>
            <p className="bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-semibold text-lg mt-1">
              admin@spartst.com
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Verification Code
              </label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all text-center text-lg tracking-widest"
                />
              </div>
            </div>

            <Link href="/login/verify-email/verify-otp/new-password">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E54FA9] to-[#831CDF] hover:from-[#D63F99] hover:to-[#730CCF] text-white font-medium py-3.5 rounded-md transition-all duration-200 shadow-lg shadow-[#831CDF]/30 active:scale-[0.98]"
              >
                Verify OTP
              </button>
            </Link>
          </form>

          {/* Resend OTP option */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button className="bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent hover:from-[#D63F99] hover:to-[#730CCF] font-medium transition-all">
                Resend OTP
              </button>
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-4">
            <Link
              href="/login/verify-email"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#E54FA9] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Change Email
            </Link>
          </div>

          {/* Timer info */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#E54FA9]" />
                <span className="text-xs text-gray-500">Valid for 10 minutes</span>
              </div>
              <div className="w-1 h-1 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] rounded-full" />
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-[#831CDF]" />
                <span className="text-xs text-gray-500">Secure</span>
              </div>
            </div>
            
            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="px-2 py-1 bg-gradient-to-r from-[#E54FA9]/10 to-[#831CDF]/10 rounded-md border border-[#E54FA9]/20">
                <span className="text-[10px] bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent font-medium">
                  OTP VERIFICATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}