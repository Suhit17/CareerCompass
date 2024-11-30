'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, RefreshCw, HelpCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Mock data for the charts
const skillsData = [
  { name: 'Analytical', value: 80 },
  { name: 'Creative', value: 65 },
  { name: 'Technical', value: 75 },
  { name: 'Communication', value: 70 },
]

const interestsData = [
  { name: 'Science', value: 85 },
  { name: 'Technology', value: 80 },
  { name: 'Arts', value: 60 },
  { name: 'Business', value: 70 },
]

const COLORS = ['#4A90E2', '#6FCF97', '#FFD600', '#FF7043']

export default function ViewResults() {
  const [showShareOptions, setShowShareOptions] = useState(false)

  const recommendedStream = "Science and Technology"
  const alternativeStreams = ["Engineering", "Computer Science", "Data Science"]
  const careerOpportunities = ["Software Developer", "Data Analyst", "Biomedical Engineer", "Research Scientist"]

  const nextSteps = [
    { step: 1, title: "Explore Careers", link: "/explore-careers" },
    { step: 2, title: "Find Colleges", link: "/find-colleges" },
    { step: 3, title: "Skill Development", link: "/skill-development" },
  ]

  const interests = [
    { category: "Technology", percentage: 35 },
    { category: "Science", percentage: 25 },
    { category: "Business", percentage: 20 },
    { category: "Healthcare", percentage: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center text-white hover:text-[#FFD600] transition duration-300 mb-4">
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Great Job! Here Are Your Results</h1>
          <p className="text-xl">Let's explore your perfect academic path together.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Your Top Recommended Stream</h2>
          <div className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white p-6 rounded-lg mb-4">
            <h3 className="text-3xl font-bold mb-2">{recommendedStream}</h3>
            <p>This stream aligns perfectly with your analytical skills and strong interest in science and technology.</p>
          </div>
          <p className="text-[#4F4F4F] mb-4">
            Based on your test results, you show a strong aptitude for logical thinking and problem-solving, 
            which are crucial skills in the fields of science and technology. Your high interest in these 
            areas also suggests you'll find this stream engaging and fulfilling.
          </p>
          <h3 className="text-xl font-semibold text-[#4A90E2] mb-2">Alternative Streams to Consider:</h3>
          <ul className="list-disc list-inside text-[#4F4F4F] mb-4">
            {alternativeStreams.map((stream, index) => (
              <li key={index}>{stream}</li>
            ))}
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Your Skills</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4A90E2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Your Interests</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={interests}
                  dataKey="percentage"
                  nameKey="category"
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  labelLine={{ strokeWidth: 2, stroke: '#4F4F4F' }}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    category,
                    percentage
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.4;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#4F4F4F"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        fontSize="14"
                        fontWeight="500"
                      >
                        {`${category} ${percentage}%`}
                      </text>
                    );
                  }}
                >
                  {interests.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    padding: '8px',
                    border: '1px solid #ccc'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: '30px',
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Potential Career Opportunities</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {careerOpportunities.map((career, index) => (
              <div key={index} className="bg-gradient-to-r from-[#6FCF97] to-[#FFD600] p-4 rounded-lg text-white text-center">
                {career}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#FFD600] to-[#E3F2FD] p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-[#4F4F4F] mb-2">Motivational Quote</h2>
          <p className="text-lg italic text-[#4F4F4F]">
            "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#4A90E2] mb-4">Your Next Steps</h2>
          <div className="space-y-4">
            {nextSteps.map((step) => (
              <Link 
                key={step.step} 
                href={step.link}
                className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg hover:bg-[#E3F2FD] transition duration-300"
              >
                <span className="font-semibold text-[#4F4F4F]">Step {step.step}: {step.title}</span>
                <ChevronRight className="text-[#4A90E2]" />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => {/* Implement download functionality */}}
            className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-6 py-3 rounded-full hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300 flex items-center"
          >
            <Download className="mr-2" /> Download Results
          </button>
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white px-6 py-3 rounded-full hover:from-[#3A7BD5] hover:to-[#5ECE7B] transition duration-300 flex items-center"
          >
            <Share2 className="mr-2" /> Share Results
          </button>
          <Link
            href="/retake-test"
            className="bg-white text-[#4A90E2] border border-[#4A90E2] px-6 py-3 rounded-full hover:bg-[#E3F2FD] transition duration-300 flex items-center"
          >
            <RefreshCw className="mr-2" /> Retake Test
          </Link>
        </div>

        {showShareOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">Share Your Results</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded">Share on Facebook</button>
                <button className="w-full bg-blue-400 text-white px-4 py-2 rounded">Share on Twitter</button>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded">Share via WhatsApp</button>
                <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => setShowShareOptions(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#4F4F4F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              Your results are private and secure. We value your trust and privacy.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-[#FFD600] transition duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#FFD600] transition duration-300">Terms of Service</Link>
              <Link href="/faq" className="flex items-center hover:text-[#FFD600] transition duration-300">
                <HelpCircle className="mr-1" /> Need Help?
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}