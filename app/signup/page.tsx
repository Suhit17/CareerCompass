'use client'
import { useState } from 'react'
import { ArrowLeft, HelpCircle, Eye, EyeOff, Check } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState('English')
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
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#E3F2FD] py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white hover:text-[#FFD600] transition duration-300 mb-4">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Join Career Explorer</h1>
          <p className="text-xl">Discover your ideal career path and unlock your potential.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showSuccess ? (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-white to-[#F5F5F5] rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-[#4F4F4F] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-[#4A90E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-[#4F4F4F] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#4A90E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[#4F4F4F] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#4A90E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              <p className="mt-2 text-sm text-[#4F4F4F]">
                Password must be at least 8 characters long and include a number and a special character.
              </p>
            </div>
            <div className="mb-6">
              <label htmlFor="language" className="block text-sm font-medium text-[#4F4F4F] mb-2">
                Preferred Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-[#4A90E2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#4A90E2]"
                  required
                />
                <span className="ml-2 text-sm text-[#4F4F4F]">
                  I agree to the <Link href="/terms" className="text-[#4A90E2] hover:underline">Terms of Service</Link> and{' '}
                  <Link href="/privacy" className="text-[#4A90E2] hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading || !agreeToTerms}
              className={`w-full bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300 ${
                isLoading || !agreeToTerms ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-[#4A90E2] hover:underline">
                Already have an account? Log in
              </Link>
            </div>
          </motion.form>
        ) : (
          <motion.div
            className="bg-gradient-to-b from-[#6FCF97] to-white rounded-lg shadow-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Check className="w-16 h-16 text-[#6FCF97] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#4F4F4F] mb-2">Welcome to Career Explorer!</h2>
            <p className="text-[#4F4F4F] mb-4">Your account has been created successfully.</p>
            <p className="text-[#4F4F4F] mb-4">Please check your email to confirm your account.</p>
            <Link
              href="/success"
              className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-[#3A7BD5] hover:to-[#5ECE7B] transition duration-300 inline-block"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300 flex items-center"
          >
            <HelpCircle className="mr-2" /> Need Help?
          </button>
          <div className="flex items-center">
            <img src="/google-logo.png" alt="Google" className="w-6 h-6 mr-2" />
            <img src="/facebook-logo.png" alt="Facebook" className="w-6 h-6" />
          </div>
        </div>

        {showHelp && (
          <motion.div
            className="mt-4 bg-white rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-[#4F4F4F] mb-2">Need Assistance?</h3>
            <p className="text-[#4F4F4F] mb-2">
              If you're having trouble signing up, please contact our support team at support@careerexplorer.com or call us at +1 (800) 123-4567.
            </p>
            <p className="text-[#4F4F4F]">
              We're here to help you get started on your career exploration journey!
            </p>
          </motion.div>
        )}
      </main>

      <footer className="bg-[#4F4F4F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2023 Career Explorer. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-[#FFD600] transition duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FFD600] transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}