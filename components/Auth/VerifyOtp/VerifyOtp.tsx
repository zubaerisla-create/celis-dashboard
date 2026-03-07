// app/admin/verify-otp/page.tsx (Alternative version with single input)
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/logo.png"

export default function VerifyOtp() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-red-900/30 rounded-lg shadow-2xl shadow-red-950/20 overflow-hidden">
        {/* Header / Logo area */}
        <div className="flex items-center justify-center gap-2 pt-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Image height={40} width={40} src={logo} alt="Spartst Logo" />
          </div>
          <div>
            <h2 className="text-[#B91C1C] font-semibold text-lg">SPARTST</h2>
            <p className="text-gray-400 text-[10px] leading-tight">OTP Verification</p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8">
          {/* Email info */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">
              Enter the OTP sent to
            </p>
            <p className="text-red-400 font-medium mt-1">
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
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/30 transition-colors text-center text-lg tracking-widest"
              />
            </div>

       <Link href="/login/verify-email/verify-otp/new-password" >
       
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-medium py-3.5 rounded-md transition-colors duration-200 shadow-lg shadow-red-900/30"
            >
              Verify OTP
            </button>
       </Link>
          </form>

          {/* Resend OTP option */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button className="text-red-500/80 hover:text-red-400 transition-colors font-medium">
                Resend OTP
              </button>
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-4">
            <Link
              href="/login/verify-email"
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              ← Change Email
            </Link>
          </div>

          <p className="text-center text-xs text-gray-600 mt-8">
            The OTP is valid for 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
}