'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, RefreshCw, HelpCircle, ChevronRight, Home, ClipboardCheck, Briefcase, Book, GraduationCap, Menu, TrendingUp, X } from 'lucide-react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Footer } from '@/components/footer'

// Mock data for the charts
const skillsData = [
  { name: 'Analytical', value: 80 },
  { name: 'Creative', value: 65 },
  { name: 'Technical', value: 75 },
  { name: 'Communication', value: 70 },
]

const interestsData = [
  { name: 'Technology', value: 35 },
  { name: 'Science', value: 25 },
  { name: 'Business', value: 20 },
  { name: 'Healthcare', value: 20 },
]

const COLORS = ['#1565c0', '#28a745', '#fd7e14', '#dc3545']

// Add LogoIcon component
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

// Add this interface at the top of the file
interface CareerDetails {
  title: string;
  description: string;
  averageSalary: string;
  growth: string;
  educationRequired: string[];
  keySkills: string[];
  jobOutlook: string;
  workEnvironment: string;
  certifications: string[];
}

export default function ViewResults() {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCareer, setSelectedCareer] = useState<CareerDetails | null>(null);
  const [showModal, setShowModal] = useState(false);

  const recommendedStream = "Science and Technology"
  const alternativeStreams = ["Engineering", "Computer Science", "Data Science"]
  const careerOpportunities = ["Software Developer", "Data Analyst", "Biomedical Engineer", "Research Scientist"]

  const nextSteps = [
    { step: 1, title: 'Explore Careers', link: '/explore-careers' },
    { step: 2, title: 'Skill Development', link: '/skill-development' },
    { step: 3, title: 'Find Colleges', link: '/find-colleges' }
  ]

  const interests = [
    { category: "Technology", percentage: 35 },
    { category: "Science", percentage: 25 },
    { category: "Business", percentage: 20 },
    { category: "Healthcare", percentage: 20 }
  ];

  // Add this function to handle Learn More click
  const handleLearnMore = (career: any) => {
    // In a real app, you would fetch this data from an API
    const careerDetails: CareerDetails = {
      title: career.title,
      description: career.description,
      averageSalary: "₹8,00,000 - ₹25,00,000 per annum",
      growth: "22% (Much faster than average)",
      educationRequired: [
        "Bachelor's degree in Computer Science or related field",
        "Master's degree preferred for advanced positions",
        "Relevant certifications"
      ],
      keySkills: [
        "Problem Solving",
        "Programming Languages",
        "Database Management",
        "System Design",
        "Agile Development"
      ],
      jobOutlook: "Excellent growth prospects with increasing demand for technology professionals",
      workEnvironment: "Typically office-based with opportunities for remote work. Collaborative environment with cross-functional teams.",
      certifications: [
        "AWS Certified Developer",
        "Microsoft Certified: Azure Developer",
        "Google Cloud Professional Developer",
        "Oracle Certified Professional"
      ]
    };
    setSelectedCareer(careerDetails);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-[#e0e0e0] fixed h-full transition-all duration-300 z-20`}>
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
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-lg hover:bg-[#e3f2fd]">
              <Menu className="w-5 h-5 text-[#1565c0]" />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#E3F2FD] text-[#4F4F4F] transition-colors duration-200"
              >
                <Home size={20} />
                {isSidebarOpen && <span>Home</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/results"
                className="flex items-center space-x-3 p-2 rounded-lg bg-[#e3f2fd] text-[#1565c0] font-semibold"
              >
                <ClipboardCheck size={20} />
                {isSidebarOpen && <span>Test Results</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/explore-careers"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#E3F2FD] text-[#4F4F4F] transition-colors duration-200"
              >
                <Briefcase size={20} />
                {isSidebarOpen && <span>Explore Careers</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/skill-development"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#E3F2FD] text-[#4F4F4F] transition-colors duration-200"
              >
                <Book size={20} />
                {isSidebarOpen && <span>Skill Development</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/find-colleges"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#E3F2FD] text-[#4F4F4F] transition-colors duration-200"
              >
                <GraduationCap size={20} />
                {isSidebarOpen && <span>Find Colleges</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-16'} flex-1 flex flex-col transition-all duration-300`}>
        <header className="bg-[#1976d2] py-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <LogoIcon />
                  <span className="text-2xl font-bold text-white">Career Compass</span>
                </Link>
              </div>
              <h1 className="text-[24px] font-bold">Your Career Assessment Results</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Recommended Stream Section */}
          <section className="bg-[#e3f2fd] rounded-lg shadow-lg p-[32px] mb-[20px]">
            <h2 className="text-[20px] font-bold mb-4 text-[#1565c0]">Top Recommended Stream</h2>
            <div className="text-[20px] font-semibold mb-4 text-[#1565c0]">{recommendedStream}</div>
            <p className="text-[16px] mb-4 text-[#424242]">
              This recommendation is based on your interests, skills, and academic preferences.
            </p>
            <div className="flex flex-wrap gap-2">
              {alternativeStreams.map((stream, index) => (
                <span key={index} className="bg-[#1565c0] text-white px-4 py-1 rounded-full text-[14px] font-medium">
                  {stream}
                </span>
              ))}
            </div>
          </section>

          {/* Interest Distribution Section */}
          <section className="bg-white rounded-lg shadow-lg p-[20px] mb-[20px]">
            <h2 className="text-[24px] font-bold mb-6 text-center">Your Interest Distribution</h2>
            <div className="flex justify-between items-center">
              {/* Bar Chart Container */}
              <div className="w-[45%] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={skillsData} 
                    margin={{ left: -15, bottom: 20 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                      tick={{fontSize: 12}}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#007BFF">
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Pie Chart Container */}
              <div className="w-[45%] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ right: -15 }}>
                    <Pie
                      data={interestsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#007BFF"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {interestsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Career Opportunities Section */}
          <section className="mb-[20px]">
            <h2 className="text-[24px] font-bold mb-6 text-[#1565c0]">Recommended Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
              {careerOpportunities.map((career, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg p-[20px] hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-[18px] font-bold text-[#1565c0] mb-4">{career}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#e3f2fd] text-[#1565c0] px-3 py-1 rounded-full text-[14px] font-bold">
                      High Match
                    </span>
                    <span className="bg-[#f5f5f5] text-[#424242] px-3 py-1 rounded-full text-[14px] font-bold">
                      In Demand
                    </span>
                  </div>
                  <button
                    onClick={() => handleLearnMore(career)}
                    className="w-full bg-[#1565c0] text-white rounded-[6px] py-2 hover:bg-[#0d47a1] transition-colors duration-200"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps Section */}
          <section className="mb-[20px]">
            <h2 className="text-[24px] font-bold mb-6">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
              {nextSteps.map((step, index) => (
                <Link 
                  key={index}
                  href={step.link}
                  className="bg-white w-[200px] h-[200px] rounded-lg shadow-lg p-[20px] flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-[18px] font-bold text-[#424242] mb-2">
                    Step {step.step}
                  </div>
                  <div className="text-[16px] text-[#616161]">
                    {step.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
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
                  <div>
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Average Salary</h3>
                    <p className="text-[#616161]">{selectedCareer.averageSalary}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#424242] mb-2">Growth Rate</h3>
                    <p className="text-[#616161]">{selectedCareer.growth}</p>
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

                {/* Job Outlook */}
                <div>
                  <h3 className="text-lg font-semibold text-[#424242] mb-2">Job Outlook</h3>
                  <p className="text-[#616161]">{selectedCareer.jobOutlook}</p>
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