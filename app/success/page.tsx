'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, HelpCircle, Pause, Play } from 'lucide-react'
import Link from 'next/link'

interface Answers {
  [key: number]: number;
}

const motivationalQuotes = [
  "Believe you can and you're halfway there.",
  "Your future is created by what you do today, not tomorrow.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams."
]

const testQuestions = [
  { id: 1, question: "I enjoy solving complex problems.", type: "logical" },
  { id: 2, question: "I am comfortable speaking in front of groups.", type: "social" },
  { id: 3, question: "I like working with my hands to create things.", type: "practical" },
  { id: 4, question: "I enjoy expressing myself through art or writing.", type: "creative" },
  { id: 5, question: "I am good at analyzing data and statistics.", type: "analytical" },
  // Add more questions as needed
]

export default function PsychometricTest() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [isPaused, setIsPaused] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  const handleStartTest = () => {
    setCurrentStep('test')
  }

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value })
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentStep('completion')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleHelp = () => {
    setShowHelp(!showHelp)
  }

  const renderWelcome = () => (
    <div className="bg-gradient-to-b from-[#4A90E2] to-[#E8F5E9] p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#4F4F4F]">Welcome to Your Career Discovery Journey!</h1>
      <p className="text-lg mb-6 text-[#4F4F4F]">
        We're excited to help you uncover your potential and find the perfect career path. 
        This psychometric test will help us understand your strengths and interests.
      </p>
      <button
        onClick={handleStartTest}
        className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-8 py-3 rounded-full text-lg hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300"
      >
        Start Your Test
      </button>
      <p className="mt-6 text-sm text-[#4F4F4F]">
        Your privacy is important to us. All your responses will be kept confidential and secure.
      </p>
    </div>
  )

  const renderTest = () => (
    <div className="bg-gradient-to-b from-white to-[#F5F5F5] p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4F4F4F]">Question {currentQuestion + 1} of {testQuestions.length}</h2>
        <div className="flex items-center space-x-4">
          <button onClick={handlePauseResume} className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
          <button onClick={handleHelp} className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">
            <HelpCircle size={24} />
          </button>
        </div>
      </div>
      <div className="mb-6 bg-[#E8F5E9] rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
        ></div>
      </div>
      {showHelp && (
        <div className="bg-[#F5F5F5] p-4 rounded-lg mb-4 text-[#4F4F4F]">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p>Choose the option that best describes you. There are no right or wrong answers. 
          If you're unsure, go with your first instinct.</p>
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl mb-4 text-[#4F4F4F]">{testQuestions[currentQuestion].question}</h3>
        <div className="space-y-4">
          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                answers[currentQuestion] === index 
                  ? 'bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white' 
                  : 'bg-white hover:bg-[#E8F5E9] text-[#4F4F4F]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center ${
            currentQuestion === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#4A90E2] hover:text-[#FF7043]'
          } transition duration-300`}
        >
          <ArrowLeft size={20} className="mr-2" /> Previous
        </button>
        {currentQuestion < testQuestions.length - 1 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="flex items-center text-[#4A90E2] hover:text-[#FF7043] transition duration-300"
          >
            Next <ArrowRight size={20} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  )

  const renderCompletion = () => (
    <div className="bg-gradient-to-r from-[#FF7043] to-[#6FCF97] p-8 rounded-lg shadow-lg text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Great job! Your results are being analyzed.</h2>
      <p className="text-lg mb-6">
        We're excited to share your personalized career recommendations with you.
      </p>
      <Link
        href="/results"
        className="bg-white text-[#4A90E2] px-8 py-3 rounded-full text-lg hover:bg-[#E8F5E9] transition duration-300 inline-block"
      >
        View Your Results
      </Link>
      <p className="mt-4">
        <Link href="/dashboard" className="underline hover:text-[#FFD600] transition duration-300">
          Return to dashboard and view results later
        </Link>
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'test' && renderTest()}
        {currentStep === 'completion' && renderCompletion()}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-[#FFD600] to-[#6FCF97] rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-white">{quote}</p>
        </div>
        
        <div className="mt-8 text-center text-sm text-[#4F4F4F]">
          <p>Your privacy is our priority. All data is encrypted and stored securely.</p>
          <Link href="/privacy-policy" className="underline hover:text-[#4A90E2] transition duration-300">
            Learn more about our privacy policy
          </Link>
        </div>
      </div>
    </div>
  )
}