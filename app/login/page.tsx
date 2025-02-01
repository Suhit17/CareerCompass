'use client'

import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Footer } from '@/components/footer'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // After successful login, redirect to success page
      router.push('/success')
    } catch (err) {
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#E6F7FF] py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#007BFF]">Career Compass</span>
        </Link>
        <Link
          href="/signup"
          className="text-[#007BFF] hover:text-[#0056B3] transition duration-300"
        >
          Create Account
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center w-full py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-[24px] font-bold text-[#212121] mb-2">Welcome Back!</h1>
              <p className="text-[16px] text-[#424242]">Sign in to continue your career exploration journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-[14px] font-medium text-[#424242] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[48px] px-4 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent text-[16px]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-[14px] font-medium text-[#424242] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[48px] px-4 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent text-[16px]"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#616161]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[14px] text-[#007BFF] hover:text-[#0056B3] transition duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-[#DC3545] text-[14px] text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#007BFF] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#0056B3] transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-[16px] text-[#424242]">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-[#007BFF] hover:text-[#0056B3] transition duration-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 