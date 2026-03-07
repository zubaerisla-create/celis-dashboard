// app/admin/verify-email/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/logo.png"

export default function VerifyEmail() {
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
            <p className="text-gray-400 text-[10px] leading-tight">Email Verification</p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8">
          {/* Instruction text */}
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your email address to receive a verification link
          </p>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@spartst.com"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/30 transition-colors"
              />
            </div>

         <Link href="/login/verify-email/verify-otp">
         
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-medium py-3.5 rounded-md transition-colors duration-200 shadow-lg shadow-red-900/30"
            >
              Send Verification Link
            </button>
         </Link>
          </form>

          {/* Back to login link */}
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              ← Back to Login
            </Link>
          </div>

          <p className="text-center text-xs text-gray-600 mt-8">
            We'll send a verification link to your email address
          </p>
        </div>
      </div>
    </div>
  );
}