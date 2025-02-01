'use client'
import { useState } from 'react'
import { ArrowLeft, HelpCircle, Eye, EyeOff, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Footer } from '@/components/footer'

// Add the LogoIcon component
function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <circle cx="16" cy="16" r="14" stroke="#1565c0" strokeWidth="2" fill="#E6F7FF" />
      <path
        d="M16 8V24M16 8L22 14M16 8L10 14"
        stroke="#1565c0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#E6F7FF] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <LogoIcon />
            <span className="text-2xl font-bold text-[#1565c0]">Career Compass</span>
          </Link>
          <Link href="/login" className="text-[#1565c0] hover:text-[#1976d2] transition duration-300">
            Sign In
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-center text-[#1565c0] mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[16px] font-medium text-[#424242] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent placeholder:text-[16px] placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[16px] font-medium text-[#424242] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent placeholder:text-[16px] placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[16px] font-medium text-[#424242] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-3 text-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent placeholder:text-[16px] placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#CED4DA] hover:text-[#007BFF] transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && password.length < 8 && (
                  <p className="mt-2 text-[14px] text-[#DC3545]">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007BFF] text-white text-[16px] font-semibold px-6 py-3 rounded-lg hover:bg-[#0056B3] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-[16px] text-[#424242]">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-[#1565c0] hover:underline transition duration-300 font-medium"
            >
              Sign in
            </Link>
          </p>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white p-8 rounded-lg"
            >
              <Check className="w-16 h-16 text-[#1565c0] mx-auto mb-6" />
              <h2 className="text-[24px] font-bold mb-4 text-[#1565c0]">Welcome to Career Compass!</h2>
              <p className="text-[16px] text-[#424242] mb-4">Your account has been created successfully.</p>
              <p className="text-[16px] text-[#424242] mb-5">Please check your email to confirm your account.</p>
              <Link
                href="/success"
                className="bg-[#1565c0] text-white px-[24px] py-[12px] rounded-[6px] text-[16px] font-semibold hover:bg-[#1976d2] transition duration-300 inline-block min-w-[150px]"
              >
                Go to Test Page
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}