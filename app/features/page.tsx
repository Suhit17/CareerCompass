'use client'

import { useState } from 'react'
import { Search, ArrowLeft, ChevronDown, Star, Users, Brain, Book, Briefcase, Award } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/footer'

const features = [
  {
    id: 1,
    title: 'Psychometric Tests',
    description: 'Discover your strengths and interests with our comprehensive assessments.',
    icon: Brain,
    category: 'Assessments',
    users: 10000,
    testimonial: 'This test changed my career path!',
    demo: '/demos/psychometric-test'
  },
  {
    id: 2,
    title: 'Career Recommendations',
    description: 'Get personalized career suggestions based on your test results.',
    icon: Star,
    category: 'Recommendations',
    users: 8500,
    testimonial: 'I found my dream job thanks to these recommendations!',
    demo: '/demos/career-recommendations'
  },
  {
    id: 3,
    title: 'Industry Insights',
    description: 'Stay updated with the latest trends and opportunities in various industries.',
    icon: Briefcase,
    category: 'Resources',
    users: 7200,
    testimonial: 'The industry insights helped me prepare for my interviews.',
    demo: '/demos/industry-insights'
  },
  {
    id: 4,
    title: 'Skill Development Courses',
    description: 'Enhance your skills with our curated online courses.',
    icon: Book,
    category: 'Resources',
    users: 6800,
    testimonial: 'These courses filled the gaps in my skill set.',
    demo: '/demos/skill-courses'
  },
  {
    id: 5,
    title: 'Expert Counseling',
    description: 'Get guidance from experienced career counselors.',
    icon: Users,
    category: 'Resources',
    users: 5500,
    testimonial: 'The counselor helped me overcome my career dilemmas.',
    demo: '/demos/expert-counseling'
  },
  {
    id: 6,
    title: 'Achievement Tracking',
    description: 'Monitor your progress and celebrate your career milestones.',
    icon: Award,
    category: 'Assessments',
    users: 4900,
    testimonial: 'Tracking my achievements boosted my confidence!',
    demo: '/demos/achievement-tracking'
  },
]

const faqs = [
  {
    question: 'How often should I retake the psychometric tests?',
    answer: 'We recommend retaking the tests every 6-12 months or when you experience significant changes in your interests or circumstances.'
  },
  {
    question: 'Are the career recommendations guaranteed to be the best fit for me?',
    answer: 'Our recommendations are based on your test results and current market trends. They&apos;re excellent starting points, but we encourage you to explore and consider your personal preferences as well.'
  },
  {
    question: 'How up-to-date are the industry insights?',
    answer: 'We update our industry insights weekly to ensure you have access to the most current information and trends.'
  },
]

export default function FeaturesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredFeatures = features.filter(feature => 
    (selectedCategory === 'All' || feature.category === selectedCategory) &&
    (feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     feature.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#e3f2fd] font-sans">
      <header className="bg-[#1976d2] py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-white hover:text-[#FF7043] transition duration-300 mb-4">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore Our Features</h1>
          <p className="text-xl mb-8">Discover the tools that will shape your career journey</p>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pr-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF7043]"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2] to-[#FFD600] opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/path-to-your-pattern-image.png')] opacity-10"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <h2 className="text-2xl font-bold text-[#4F4F4F] mb-4 sm:mb-0">Feature Categories</h2>
          <div className="flex space-x-4">
            {['All', 'Assessments', 'Recommendations', 'Resources'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-white text-[#4F4F4F] hover:bg-[#E3F2FD]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gradient-to-b from-white to-[#F5F5F5] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <feature.icon className="w-12 h-12 text-[#4A90E2] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#4F4F4F]">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#6FCF97]">{feature.category}</span>
                  <span className="text-sm text-[#4A90E2]">{feature.users.toLocaleString()} users</span>
                </div>
                <blockquote className="italic text-sm text-gray-500 mb-4">"{feature.testimonial}"</blockquote>
                <div className="flex justify-between items-center">
                  <Link
                    href={feature.demo}
                    className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300"
                  >
                    Try Demo
                  </Link>
                  <Link
                    href={`/features/${feature.id}`}
                    className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-4 py-2 rounded-full hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-[#4F4F4F]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-[#4F4F4F]">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-[#F5F5F5]">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#4F4F4F]">Ready to Explore?</h2>
          <p className="text-gray-600 mb-6">Start your journey with Career Compass today!</p>
          <Link
            href="/signup"
            className="bg-[#f57c00] hover:bg-[#e65100] text-white px-8 py-3 rounded-full text-lg hover:from-[#3A7BD5] hover:to-[#5ECE7B] transition duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}