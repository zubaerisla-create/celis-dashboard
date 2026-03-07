// app/admin/new-password/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../../public/logo.png"

export default function NewPassword() {
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
            <p className="text-gray-400 text-[10px] leading-tight">Create New Password</p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8">
          {/* Instruction text */}
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your new password below
          </p>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/30 transition-colors"
              />
              {/* Password hint */}
              <p className="text-xs text-gray-500 mt-2">
                Minimum 8 characters with at least one number and one special character
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/30 transition-colors"
              />
            </div>

            {/* Password strength indicator (optional) */}
            <div className="space-y-2">
              <div className="flex gap-1 h-1">
                <div className="flex-1 bg-red-700/50 rounded-l-full"></div>
                <div className="flex-1 bg-gray-700"></div>
                <div className="flex-1 bg-gray-700"></div>
                <div className="flex-1 bg-gray-700 rounded-r-full"></div>
              </div>
              <p className="text-xs text-gray-500 text-right">Password strength: Weak</p>
            </div>

<Link href="/login">

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-medium py-3.5 rounded-md transition-colors duration-200 shadow-lg shadow-red-900/30"
            >
              Reset Password
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
            Make sure to use a strong password you haven't used before
          </p>
        </div>
      </div>
    </div>
  );
}