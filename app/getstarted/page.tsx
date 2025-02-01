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
    <div className="min-h-screen bg-[#E6F7FF]">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white hover:text-[#FFD600] transition duration-300 mb-4">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Let's Get You Started!</h1>
          <p className="text-xl">Discover your ideal academic path with our personalized assessment.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-[20px] font-bold text-[#007BFF] mb-4">Your Journey Begins Here</h2>
          <ol className="list-decimal list-inside text-[#4F4F4F] mb-6 text-[16px]">
            <li>Take our comprehensive assessment (about 15 minutes)</li>
            <li>Receive personalized stream recommendations</li>
            <li>Explore potential careers and educational paths</li>
          </ol>
          <div className="bg-[#F5F5F5] rounded-full h-4 mb-6">
            <motion.div
              className="bg-[#007BFF] h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-[16px] text-[#4F4F4F] mb-6">
            This assessment helps us understand your unique skills, interests, and preferences. 
            Your responses will guide us in recommending the most suitable academic streams and career paths for you.
          </p>
          <motion.button
            onClick={startTest}
            className="w-full bg-[#007BFF] text-white text-[16px] font-semibold px-6 py-4 rounded-lg hover:bg-[#0056B3] transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Test <ArrowRight className="ml-2" />
          </motion.button>
        </section>

        <section className="bg-white p-6 rounded-lg mb-8 border border-[#E9ECEF]">
          <h2 className="text-[20px] font-bold text-[#4F4F4F] mb-2">You're on the right track!</h2>
          <p className="text-[16px] text-[#6C757D]">
            Taking this step shows your commitment to your future. Remember, every great journey begins with a single step.
          </p>
        </section>

        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center text-[#6C757D] mb-4 sm:mb-0">
            <Clock className="mr-2" />
            <span className="text-[16px]">Estimated time: 15 minutes</span>
          </div>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="bg-white text-[#007BFF] text-[16px] font-semibold border border-[#007BFF] px-4 py-2 rounded-lg hover:bg-[#E6F7FF] transition duration-300 flex items-center"
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
            <h3 className="text-[20px] font-bold text-[#007BFF] mb-2">Help & Guidance</h3>
            <p className="text-[16px] text-[#6C757D] mb-4">
              If you have any questions or need assistance, our support team is here to help. 
              You can reach out to us via email at support@careerexplorer.com or call us at +1 (800) 123-4567.
            </p>
            <p className="text-[16px] text-[#6C757D]">
              Remember, there are no right or wrong answers in this assessment. Be honest and choose the options that best reflect your preferences and interests.
            </p>
          </motion.div>
        )}

        <div className="bg-[#F8F9FA] p-6 rounded-lg mt-8">
          <p className="text-[#6C757D] text-sm text-center">
            Your privacy is important to us. All assessment data is encrypted and stored securely. 
            Read our <Link href="/privacy" className="text-[#007BFF] hover:text-[#0056B3] transition duration-300">Privacy Policy</Link> to learn more.
          </p>
        </div>
      </main>
    </div>
  )
}