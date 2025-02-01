'use client'

import { useState } from 'react'
import { ArrowLeft, Search, Loader2, Menu, Home, Briefcase, Book, GraduationCap, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/footer'

interface College {
  name: string
  location: string
  requirements: string
  offerings: string[]
  rating: number
  courses: string[]
  website: string
  programs: string[]
}

export default function FindColleges() {
  const [stream, setStream] = useState('')
  const [location, setLocation] = useState('')
  const [budget, setBudget] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [colleges, setColleges] = useState<College[]>([])
  const [aiMessage, setAiMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (!stream || !location || !budget) {
        setError('Please fill in all fields')
        return
      }

      const budgetPattern = /^₹[\d,]+ - ₹[\d,]+$/
      if (!budgetPattern.test(budget)) {
        setError('Please enter budget in format: ₹2,00,000 - ₹5,00,000')
        return
      }

      const chatGPTResponse = await fetch('/api/chatgpt-college-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stream,
          location,
          budget,
          prompt: `Find colleges in ${location} that offer ${stream} programs within a budget of ${budget}.`
        }),
      })

      const chatGPTData = await chatGPTResponse.json()

      if (!chatGPTResponse.ok) {
        if (chatGPTResponse.status === 429) {
          throw new Error('Too many requests. Please try again later.')
        }
        throw new Error(chatGPTData.error || 'Failed to fetch college recommendations')
      }

      const collegeResults = chatGPTData.colleges.map((college: any) => ({
        name: college.name,
        location: college.location,
        requirements: college.requirements,
        programs: college.programs || [],
        courses: college.courses || [],
        rating: college.rating || 0,
        website: college.website || '',
        offerings: college.offerings || []
      }))

      setColleges(collegeResults)
      
      if (collegeResults.length === 0 && chatGPTData.suggestions) {
        setAiMessage(chatGPTData.suggestions)
      } else {
        setAiMessage('')
      }

    } catch (error) {
      console.error('Error searching colleges:', error)
      setError(error instanceof Error ? error.message : 'Failed to search colleges')
      setColleges([])
      setAiMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCollegeClick = async (collegeName: string) => {
    try {
      const response = await fetch('/api/get-college-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collegeName,
          location: location
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch college URL')
      }

      const data = await response.json()
      
      if (data.url) {
        window.open(data.url, '_blank')
      } else {
        alert('College website not found')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Unable to access college website at this time')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#e3f2fd] fixed h-full transition-all duration-300 z-20`}>
        <div className="p-4 border-b border-[#1565c0]/10">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <Link 
                href="/"
                className="font-inter text-[24px] font-bold text-[#1565c0] hover:text-[#1976d2] transition duration-300"
              >
                Career Compass
              </Link>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-[#1565c0] hover:text-[#1976d2] transition duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/results" 
                className="flex items-center text-[#1565c0] hover:bg-white/60 py-2 px-3 rounded-lg transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-3" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/explore-careers" 
                className="flex items-center text-[#1565c0] hover:bg-white/60 py-2 px-3 rounded-lg transition-all duration-300"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                {isSidebarOpen && <span>Explore Careers</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/skill-development" 
                className="flex items-center text-[#1565c0] hover:bg-white/60 py-2 px-3 rounded-lg transition-all duration-300"
              >
                <Book className="w-5 h-5 mr-3" />
                {isSidebarOpen && <span>Skill Development</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/find-colleges" 
                className="flex items-center text-[#1565c0] bg-white py-2 px-3 rounded-lg font-semibold"
              >
                <GraduationCap className="w-5 h-5 mr-3" />
                {isSidebarOpen && <span>Find Colleges</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-16'} flex-1 flex flex-col transition-all duration-300`}>
        <header className="bg-[#1565c0] py-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link href="/results" className="flex items-center text-white hover:text-[#e0e0e0] transition duration-300">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>Back to Results</span>
                </Link>
              </div>
              <h1 className="text-[24px] font-bold">Find Colleges</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-[#e3f2fd] p-6 mb-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="form-group">
                <label className="block text-[14px] font-semibold text-[#424242] mb-2">
                  Academic Stream
                </label>
                <input
                  type="text"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full h-[48px] px-4 text-[16px] border border-[#e3f2fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div className="form-group">
                <label className="block text-[14px] font-semibold text-[#424242] mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-[48px] px-4 text-[16px] border border-[#e3f2fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Mumbai"
                />
              </div>
              <div className="form-group">
                <label className="block text-[14px] font-semibold text-[#424242] mb-2">
                  Budget Range
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-[48px] px-4 text-[16px] border border-[#e3f2fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., ₹2,00,000 - ₹5,00,000"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSearch}
                className="bg-[#1565c0] text-white px-6 py-2 rounded-lg hover:bg-[#0d47a1] transition-colors duration-200"
              >
                Search Colleges
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {aiMessage && (
            <div className="bg-blue-50 border border-[#007BFF] rounded-lg p-4 mb-8">
              <p className="text-[16px] text-[#007BFF] whitespace-pre-line">{aiMessage}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-[#1565c0] animate-spin" />
              <span className="ml-3 text-[#1565c0]">Searching colleges...</span>
            </div>
          ) : colleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-[#e3f2fd] p-6 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-[18px] font-bold text-[#1565c0] mb-4">{college.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[14px] text-[#424242]">
                      <MapPin className="w-5 h-5 mr-2 text-[#1565c0]" />
                      <span>{college.location}</span>
                    </div>
                    <div className="flex items-center text-[14px] text-[#424242]">
                      <GraduationCap className="w-5 h-5 mr-2 text-[#1565c0]" />
                      <span>{college.programs?.join(", ") || college.courses?.join(", ") || "No programs listed"}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCollegeClick(college.name)}
                    className="w-full bg-[#1565c0] text-white rounded-[6px] py-2 hover:bg-[#0d47a1] transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && !error && (
              <div className="text-center py-8 bg-white rounded-lg shadow-lg">
                <p className="text-gray-600">No colleges found. Try adjusting your search criteria.</p>
              </div>
            )
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
} 