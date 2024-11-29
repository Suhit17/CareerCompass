'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, HelpCircle, ArrowRight, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function GetStarted() {
  const [showHelp, setShowHelp] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(25)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const startTest = () => {
    // Animation logic for starting the test
    console.log("Starting test...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white hover:text-[#FFD600] transition duration-300 mb-4">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Let&apos;s Get You Started!</h1>
          <p className="text-xl">Discover your ideal academic path with our personalized assessment.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Your Journey Begins Here</h2>
          <ol className="list-decimal list-inside text-[#4F4F4F] mb-6">
            <li>Take our comprehensive assessment (about 15 minutes)</li>
            <li>Receive personalized stream recommendations</li>
            <li>Explore potential careers and educational paths</li>
          </ol>
          <div className="bg-[#F5F5F5] rounded-full h-4 mb-6">
            <motion.div
              className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-[#4F4F4F] mb-6">
            This assessment helps us understand your unique skills, interests, and preferences. 
            Your responses will guide us in recommending the most suitable academic streams and career paths for you.
          </p>
          <motion.button
            onClick={startTest}
            className="w-full bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-6 py-4 rounded-full text-lg font-semibold hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Test <ArrowRight className="ml-2" />
          </motion.button>
        </section>

        <section className="bg-gradient-to-r from-[#FFD600] to-[#E3F2FD] p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-[#4F4F4F] mb-2">You're on the right track!</h2>
          <p className="text-lg text-[#4F4F4F]">
            Taking this step shows your commitment to your future. Remember, every great journey begins with a single step.
          </p>
        </section>

        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center text-[#4F4F4F] mb-4 sm:mb-0">
            <Clock className="mr-2" />
            <span>Estimated time: 15 minutes</span>
          </div>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="bg-white text-[#4A90E2] border border-[#4A90E2] px-4 py-2 rounded-full hover:bg-[#E3F2FD] transition duration-300 flex items-center"
          >
            <HelpCircle className="mr-2" /> Need Help?
          </button>
        </div>

        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-[#4A90E2] mb-2">Help & Guidance</h3>
            <p className="text-[#4F4F4F] mb-4">
              If you have any questions or need assistance, our support team is here to help. 
              You can reach out to us via email at support@careerexplorer.com or call us at +1 (800) 123-4567.
            </p>
            <p className="text-[#4F4F4F]">
              Remember, there are no right or wrong answers in this assessment. Be honest and choose the options that best reflect your preferences and interests.
            </p>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <Link
            href="/explore-features"
            className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300"
          >
            Explore App Features
          </Link>
          <Link
            href="/success-stories"
            className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300"
          >
            Read Success Stories
          </Link>
        </div>
      </main>

      <footer className="bg-[#4F4F4F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center mb-4 md:mb-0">
              <Shield className="mr-2" /> Your data is safe and secure with us.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-[#FFD600] transition duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#FFD600] transition duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}