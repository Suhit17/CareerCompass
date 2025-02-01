'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, HelpCircle, Pause, Play, Clock, Users, Star, Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Footer } from '@/components/footer'

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

const skillCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 1200,
    rating: 4.5,
    reviews: 150
  },
  // Add more courses as needed
]

const handleCourseSelect = (courseId: number) => {
  // Handle course selection logic here
  console.log(`Selected course: ${courseId}`)
}

export default function PsychometricTest() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [isPaused, setIsPaused] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [quote, setQuote] = useState('')
  const [stream, setStream] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSearch = () => {
    setIsLoading(true)
    // Simulate search functionality
    setTimeout(() => {
      setIsLoading(false)
      // Handle search results
    }, 1000)
  }

  const renderWelcome = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E0E0E0] text-center">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <LogoIcon />
        <span className="text-2xl font-bold text-[#1565c0]">Career Compass</span>
      </div>
      <h1 className="text-[24px] font-bold text-[#1565c0] mb-4">
        Welcome to Your Career Discovery Journey!
      </h1>
      <p className="text-[16px] text-[#424242] mb-8">
        Let's explore career paths that match your interests and abilities.
      </p>
      <button
        onClick={handleStartTest}
        className="bg-[#007BFF] text-white px-8 py-3 rounded-lg text-[16px] font-semibold hover:bg-[#0056B3] transition duration-300"
      >
        Start the Psychometric Test
      </button>
    </div>
  )

  const renderTest = () => (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 w-[80%] mx-auto mt-[16px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#1565c0] font-semibold">Question {currentQuestion + 1} of {testQuestions.length}</span>
              <span className="text-[#424242]">{Math.round((currentQuestion + 1) / testQuestions.length * 100)}% Complete</span>
            </div>
            <div className="h-[8px] bg-[#E9ECEF] rounded-full">
              <motion.div
                className="h-full bg-[#007BFF] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-[#E9ECEF] p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1565c0]">Question {currentQuestion + 1}</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handlePauseResume} 
                    className="text-[#1565c0] hover:text-[#1976d2] transition duration-300"
                  >
                    {isPaused ? <Play size={24} /> : <Pause size={24} />}
                  </button>
                </div>
              </div>

              <p className="text-lg text-[#424242] mb-8">{testQuestions[currentQuestion].question}</p>

              <div className="space-y-4">
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border transition duration-300
                      ${answers[currentQuestion] === index 
                        ? 'bg-[#007BFF] text-white border-[#007BFF]' 
                        : 'bg-white text-[#424242] border-[#E9ECEF] hover:bg-[#E6F7FF] hover:border-[#007BFF]'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 text-[#007BFF] border border-[#007BFF] rounded-lg hover:bg-[#E6F7FF] disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleAnswer(answers[currentQuestion])}
                  disabled={answers[currentQuestion] === undefined}
                  className="px-6 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056B3] disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                >
                  {currentQuestion === testQuestions.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#424242] text-sm">
                Your responses are secure and confidential. 
                <Link 
                  href="/privacy-policy" 
                  className="text-[#1565c0] hover:text-[#1976d2] hover:underline transition duration-300 ml-1"
                >
                  Learn more about our privacy policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )

  const renderCompletion = () => (
    <div className="max-w-[800px] mx-auto bg-white p-[32px] rounded-lg shadow-sm border border-gray-200 text-center mb-[48px]">
      <h2 className="text-[24px] leading-[32px] font-bold mb-6 text-[#1565c0]">
        Great job! Your results are being analyzed.
      </h2>
      <p className="text-[16px] text-[#424242] mb-6">
        We're excited to share your personalized career recommendations with you.
      </p>
      <Link
        href="/results"
        className="inline-block min-w-[200px] bg-[#007BFF] text-white text-[16px] px-8 py-3 rounded-lg font-semibold hover:bg-[#0d47a1] transition-all duration-300 mt-[32px] shadow-sm hover:shadow-md"
      >
        View Your Results
      </Link>
      <p className="mt-[24px]">
        <Link 
          href="/dashboard" 
          className="text-[16px] text-[#424242] hover:text-[#1565c0] hover:underline transition duration-300"
        >
          Return to dashboard and view results later
        </Link>
      </p>
    </div>
  )

  const renderQuote = () => (
    <>
      <div className="max-w-[800px] mx-auto h-[1px] bg-[#e3f2fd] mb-[48px]" />
      <div className="max-w-[800px] mx-auto bg-white p-[32px] rounded-lg shadow-sm border border-gray-200 text-center mb-[48px]">
        <p className="text-[20px] leading-[28px] font-semibold text-[#1565c0]">
          {quote}
        </p>
      </div>
      <div className="max-w-[800px] mx-auto h-[1px] bg-[#e3f2fd] mb-[48px]" />
    </>
  )

  const renderSkillSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCourses.map((course, index) => (
        <div 
          key={index}
          className="bg-white border border-[#E9ECEF] rounded-lg overflow-hidden shadow-sm"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[#1565c0] text-xl font-semibold">{course.title}</h3>
              <span className="text-[#424242] text-sm px-3 py-1 bg-[#F8F9FA] rounded-full">
                {course.level}
              </span>
            </div>
            
            <p className="text-[#424242] text-base mb-4">{course.description}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[#424242] text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </span>
              <span className="text-[#424242] text-sm flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {course.enrolled} enrolled
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-[#28A745] mr-1" />
                <span className="text-[#28A745] font-semibold">{course.rating}</span>
                <span className="text-[#424242] text-sm ml-1">({course.reviews} reviews)</span>
              </div>
              <button 
                onClick={() => handleCourseSelect(course.id)}
                className="bg-[#007BFF] text-white px-4 py-2 rounded-lg hover:bg-[#0056B3] transition duration-300 text-sm font-semibold"
              >
                View Course
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderCollegeSearch = () => (
    <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="form-group">
          <label className="block text-[14px] font-semibold text-[#1565c0] mb-2">
            Academic Stream
          </label>
          <input
            type="text"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="w-full h-[48px] px-4 text-[16px] border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all duration-200"
            placeholder="e.g., Computer Science"
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="mt-[24px] min-w-[150px] text-[16px] px-[24px] py-[12px] bg-[#007BFF] text-white rounded-lg hover:bg-[#0056B3] transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2" />
            Searching...
          </span>
        ) : (
          <span className="flex items-center">
            <Search className="mr-2" />
            Search Colleges
          </span>
        )}
      </button>
    </div>
  )

  const renderEmptyState = () => (
    <div className="text-center py-12 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF]">
      <Search className="w-12 h-12 text-[#424242] mx-auto mb-4" />
      <p className="text-[16px] text-[#424242] mb-2">No colleges found</p>
      <p className="text-[14px] text-[#424242]">
        Try adjusting your search criteria or explore different academic streams
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#E6F7FF] py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center space-x-3 text-[#1565c0] hover:text-[#1976d2] transition duration-300"
            >
              <LogoIcon />
              <span className="text-2xl font-bold">Career Compass</span>
            </Link>
            <Link 
              href="/" 
              className="text-[#1565c0] hover:text-[#1976d2] transition duration-300 flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {currentStep === 'welcome' && renderWelcome()}
          {currentStep === 'test' && renderTest()}
          {currentStep === 'completion' && (
            <>
              {renderCompletion()}
              {renderQuote()}
            </>
          )}
          
          <div className="mt-8 text-center bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-[14px] text-[#424242] mb-2">
              Your privacy is our priority. All data is encrypted and stored securely.
            </p>
            <Link 
              href="/privacy-policy" 
              className="text-[14px] text-[#424242] hover:text-[#007BFF] hover:underline transition duration-300"
            >
              Learn more about our privacy policy
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}