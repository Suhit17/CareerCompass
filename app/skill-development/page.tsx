'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Home, Briefcase, Book, GraduationCap, Menu, Clock } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/footer'

interface Course {
  title: string
  provider: string
  duration: string
  rating: number
  level: string
  category: string
  courseUrl: string
}

export default function SkillDevelopment() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch courses when search query changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (debouncedSearchQuery.trim().length >= 2) {
        setIsLoading(true)
        setError(null)
        try {
          const response = await fetch('/api/course-search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchQuery: debouncedSearchQuery }),
          })

          if (!response.ok) {
            throw new Error('Failed to fetch courses')
          }

          const data = await response.json()
          if (data.error) {
            throw new Error(data.error)
          }

          setCourses(data.courses || defaultCourses)
        } catch (error) {
          console.error('Error fetching courses:', error)
          setError('Failed to fetch courses. Please try again.')
          setCourses(defaultCourses)
        }
      } else {
        setCourses(defaultCourses)
      }
      setIsLoading(false)
    }

    fetchCourses()
  }, [debouncedSearchQuery])

  // Filter courses based on selected category
  const filteredCourses = courses.filter(course => 
    selectedFilter === 'All' || course.category === selectedFilter
  )

  const filters = ["All", "Technical", "Analytical", "Creative", "Communication"]

  const handleCourseClick = (courseUrl: string) => {
    if (courseUrl) {
      window.open(courseUrl, '_blank')
    }
  }

  // Add isValidUrl helper function
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#e3f2fd] fixed h-full transition-all duration-300 z-20`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <Link 
                href="/"
                className="font-inter text-[20px] font-bold text-[#1565c0] hover:text-[#1976d2] transition duration-300"
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
                className="flex items-center text-[#1565c0] bg-white py-2 px-3 rounded-lg font-semibold"
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
              <h1 className="text-[24px] font-bold">Skill Development</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e3f2fd] mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1565c0]" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full h-[48px] pl-10 pr-4 text-[16px] border border-[#e3f2fd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent placeholder:text-[#b0b0b0]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm border border-[#e3f2fd] p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[18px] font-bold text-[#1565c0]">{course.title}</h3>
                  <span className="bg-[#e3f2fd] text-[#1565c0] px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-[14px] text-[#424242]">
                    <Book className="w-5 h-5 mr-2 text-[#1565c0]" />
                    <span className="line-clamp-1">{course.provider}</span>
                  </div>
                  <div className="flex items-center text-[14px] text-[#424242]">
                    <Clock className="w-5 h-5 mr-2 text-[#2e7d32]" />
                    <span className="line-clamp-1">{course.duration}</span>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => handleCourseClick(course.courseUrl)}
                    className="w-full h-[40px] bg-[#1565c0] text-white rounded-[6px] hover:bg-[#0d47a1] transition-colors duration-200"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

// Define default courses outside the component
const defaultCourses: Course[] = [
  {
    title: "Excel Skills for Business",
    provider: "Coursera",
    duration: "6 weeks",
    rating: 4.8,
    level: "Beginner",
    category: "Business",
    courseUrl: "https://www.coursera.org/learn/excel-skills-for-business"
  },
  {
    title: "Excel Essential Training",
    provider: "Udemy",
    duration: "26 hours",
    rating: 4.6,
    level: "Beginner to Advanced",
    category: "Business",
    courseUrl: "https://www.udemy.com/course/excel-essential-training"
  },
  {
    title: "Analyzing and Visualizing Data with Excel",
    provider: "edX",
    duration: "6 weeks",
    rating: 4.7,
    level: "Intermediate",
    category: "Analytics",
    courseUrl: "https://www.edx.org/learn/excel"
  }
] 