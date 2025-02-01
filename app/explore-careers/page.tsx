'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Briefcase, TrendingUp, Star, Clock, Menu, Home, Book, GraduationCap, X } from 'lucide-react'
import { Footer } from '@/components/footer'

interface Career {
  title: string
  description: string
  matchScore: number
  salary: string
  growth: string
  requirements: string[]
  skills: string[]
  category: string
}

interface CareerDetails extends Career {
  averageSalary: string;
  educationRequired: string[];
  keySkills: string[];
  jobOutlook: string;
  workEnvironment: string;
  certifications: string[];
}

export default function ExploreCareerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [careers, setCareers] = useState<Career[]>([])
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCareer, setSelectedCareer] = useState<CareerDetails | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Modify the useEffect for API call
  useEffect(() => {
    const fetchCareers = async () => {
      if (debouncedSearchQuery.trim().length >= 2) {
        setIsLoading(true)
        setError(null)
        try {
          const response = await fetch('/api/career-search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchQuery: debouncedSearchQuery }),
          })

          if (!response.ok) {
            throw new Error('Failed to fetch careers')
          }

          const data = await response.json()
          if (data.error) {
            throw new Error(data.error)
          }

          setCareers(data.careers || defaultCareers)
        } catch (error) {
          console.error('Error fetching careers:', error)
          setError('Failed to fetch careers. Please try again.')
          setCareers(defaultCareers)
        }
      } else {
        setCareers(defaultCareers)
      }
      setIsLoading(false)
    }

    fetchCareers()
  }, [debouncedSearchQuery])

  // Filter careers based on selected categories
  const filteredCareers = careers

  // Add this function to handle Learn More click
  const handleLearnMore = (career: Career) => {
    // In a real app, you would fetch this data from an API
    const careerDetails: CareerDetails = {
      ...career,
      averageSalary: career.salary,
      educationRequired: career.requirements,
      keySkills: career.skills,
      jobOutlook: career.growth,
      workEnvironment: "Typically office-based with opportunities for remote work. Collaborative environment with cross-functional teams.",
      certifications: [
        "Professional certifications vary by specialization",
        "Industry-specific credentials",
        "Optional advanced certifications for career growth"
      ]
    }
    setSelectedCareer(careerDetails)
    setShowModal(true)
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
                className="flex items-center text-[#1565c0] bg-white py-2 px-3 rounded-lg font-semibold"
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
                className="flex items-center text-[#1565c0] hover:bg-white/60 py-2 px-3 rounded-lg transition-all duration-300"
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
              <h1 className="text-[24px] font-bold">Explore Careers</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search and Results Section */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e3f2fd] mb-6">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1565c0]" />
                  <input
                    type="text"
                    placeholder="Search careers..."
                    className="w-full h-[48px] pl-10 pr-4 text-[16px] border border-[#e3f2fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent placeholder:text-[#b0b0b0]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1565c0]"></div>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              {/* Career Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!isLoading && filteredCareers.length === 0 ? (
                  <div className="col-span-full text-center text-[16px] text-[#616161] py-8">
                    No careers found. Try adjusting your search terms.
                  </div>
                ) : (
                  filteredCareers.map((career, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-sm border border-[#e3f2fd] p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-[18px] font-bold text-[#1565c0]">{career.title}</h3>
                        <span className="bg-[#e3f2fd] text-[#1565c0] px-3 py-1 rounded-full text-sm font-medium">
                          {career.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[#424242] mb-4">{career.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-[14px] text-[#424242]">
                          <Briefcase className="w-5 h-5 mr-2 text-[#1565c0]" />
                          <span className="line-clamp-1">{career.salary}</span>
                        </div>
                        <div className="flex items-center text-[14px] text-[#424242]">
                          <TrendingUp className="w-5 h-5 mr-2 text-[#2e7d32]" />
                          <span className="line-clamp-1">{career.growth}</span>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <button
                          onClick={() => handleLearnMore(career)}
                          className="w-full bg-[#1565c0] text-white rounded-[6px] py-2 hover:bg-[#0d47a1] transition-colors duration-200"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Add the Modal */}
      {showModal && selectedCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#1565c0]">{selectedCareer.title}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-[#424242] mb-2">Description</h3>
                  <p className="text-[#616161]">{selectedCareer.description}</p>
                </div>

                {/* Salary and Growth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f8f9fa] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Average Salary</h3>
                    <p className="text-[#616161]">{selectedCareer.averageSalary}</p>
                  </div>
                  <div className="bg-[#f8f9fa] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Job Outlook</h3>
                    <p className="text-[#616161]">{selectedCareer.jobOutlook}</p>
                  </div>
                </div>

                {/* Education and Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Education Required</h3>
                    <ul className="list-disc list-inside text-[#616161]">
                      {selectedCareer.educationRequired.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.keySkills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-[#e3f2fd] text-[#1565c0] px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Work Environment */}
                <div>
                  <h3 className="text-lg font-semibold text-[#424242] mb-2">Work Environment</h3>
                  <p className="text-[#616161]">{selectedCareer.workEnvironment}</p>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold text-[#424242] mb-2">Recommended Certifications</h3>
                  <ul className="list-disc list-inside text-[#616161]">
                    {selectedCareer.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-[#1565c0] text-white px-6 py-2 rounded-lg hover:bg-[#0d47a1] transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Define default careers outside the component
const defaultCareers: Career[] = [
  {
    title: "Software Developer",
    description: "Design, develop, and maintain software applications and systems.",
    matchScore: 95,
    salary: "₹8,00,000 - ₹25,00,000 per annum",
    growth: "22% (Much faster than average)",
    requirements: ["B.Tech in Computer Science", "Programming Skills", "Problem Solving"],
    skills: ["JavaScript", "Python", "System Design", "Algorithms"],
    category: "Technology"
  },
  {
    title: "Data Analyst",
    description: "Analyze complex data sets to identify trends and patterns.",
    matchScore: 90,
    salary: "₹6,00,000 - ₹18,00,000 per annum",
    growth: "18% (Faster than average)",
    requirements: ["Bachelor's in Statistics/Mathematics", "Data Analysis Skills"],
    skills: ["SQL", "Python", "Data Visualization", "Statistical Analysis"],
    category: "Technology"
  },
  {
    title: "Project Manager",
    description: "Lead and oversee projects from inception to completion.",
    matchScore: 85,
    salary: "₹12,00,000 - ₹35,00,000 per annum",
    growth: "15% (Faster than average)",
    requirements: ["Bachelor's Degree", "PMP Certification", "Leadership Experience"],
    skills: ["Leadership", "Communication", "Risk Management", "Agile"],
    category: "Business"
  },
  // Add more career options based on the user's results
] 