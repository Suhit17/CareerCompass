'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Define the questions array
const questions = [
  "I enjoy solving complex problems.",
  "I like working with numbers and data.",
  "I prefer creative and artistic activities.",
  "I am good at leading group projects.",
  "I enjoy helping others learn new things.",
  // Add more questions as needed
]

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<{[key: number]: number}>({})
  const totalQuestions = questions.length

  const handleOptionSelect = (index: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: index
    }))
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA]">
      {/* Compact Header */}
      <header className="bg-[#1976d2] py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-sm hover:text-[#E6F7FF] transition duration-300">
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Back
          </Link>
          <span className="text-white text-sm">Assessment</span>
        </div>
      </header>

      {/* Compact Progress Bar */}
      <div className="bg-white py-1 px-4 border-b border-[#E0E0E0]">
        <div className="max-w-2xl mx-auto flex justify-between items-center text-xs">
          <span className="text-[#1565c0]">Question {currentQuestion} of {totalQuestions}</span>
          <span className="text-[#424242]">{Math.round((currentQuestion / totalQuestions) * 100)}% Complete</span>
        </div>
        <div className="max-w-2xl mx-auto h-1 bg-[#E9ECEF] rounded-full mt-1">
          <motion.div
            className="h-full bg-[#007BFF] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-2">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg p-2 shadow-sm border border-[#E0E0E0]">
            <h2 className="text-sm font-semibold text-[#212121] mb-1">Question {currentQuestion}</h2>
            <p className="text-xs text-[#424242] mb-2">{questions[currentQuestion - 1]}</p>

            {/* Options */}
            <div className="space-y-0.5">
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left py-1.5 px-2 rounded border ${
                    answers[currentQuestion] === index 
                      ? 'border-[#007BFF] bg-[#E3F2FD]' 
                      : 'border-[#E0E0E0] hover:border-[#007BFF] hover:bg-[#F8F9FA]'
                  } text-xs text-[#424242] transition duration-200`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-1">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
              disabled={currentQuestion === 1}
              className="px-2 py-1 text-xs text-[#007BFF] border border-[#007BFF] rounded hover:bg-[#F8F9FA] disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Previous
            </button>
            {currentQuestion === totalQuestions ? (
              <Link
                href="/results"
                className="px-2 py-1 text-xs bg-[#007BFF] text-white rounded hover:bg-[#0056B3] transition duration-300"
              >
                View Results
              </Link>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions, prev + 1))}
                className="px-2 py-1 text-xs bg-[#007BFF] text-white rounded hover:bg-[#0056B3] transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="bg-white py-1 text-center text-xs text-[#6C757D] border-t border-[#E0E0E0]">
        <span>© 2024 Career Explorer</span>
      </footer>
    </div>
  )
} 