'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, CheckCircle, Play, Menu, X, ArrowRight, Search, MapPin, Phone, Mail } from 'lucide-react'

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const features = [
    { title: 'Personalized Recommendations', description: 'Get career suggestions tailored to your skills and interests.' },
    { title: 'Skill Assessments', description: 'Discover your strengths with our interactive tests.' },
    { title: 'Expert Guidance', description: 'Access advice from experienced career counselors.' },
    { title: 'Industry Insights', description: 'Learn about various career paths and job markets.' },
  ]

  const howItWorks = [
    { title: 'Sign Up', description: 'Create your account and complete your profile.' },
    { title: 'Take Assessments', description: 'Complete our comprehensive skill and interest tests.' },
    { title: 'Explore Recommendations', description: 'Review personalized career and education paths.' },
    { title: 'Get Guidance', description: 'Consult with experts and access resources for your journey.' },
  ]

  const testimonials = [
    {
      name: 'Priya S.',
      role: 'Student',
      content: 'This app helped me discover my passion for biotechnology. I\'m now confidently pursuing my dream career!',
      image: '/placeholder.svg',
    },
    {
      name: 'Rahul M.',
      role: 'Parent',
      content: 'As a parent, I found this app incredibly helpful in guiding my child towards a suitable career path.',
      image: '/placeholder.svg',
    },
  ]

  const faqs = [
    {
      question: 'How does the app determine career recommendations?',
      answer: 'Our app uses a combination of psychometric tests, academic performance analysis, and personal interests to provide tailored career recommendations.',
    },
    {
      question: 'Is the app suitable for students from all educational boards?',
      answer: 'Yes, our app is designed to cater to students from various educational boards across India, including CBSE, ICSE, and State Boards.',
    },
    {
      question: 'How often should I retake the assessments?',
      answer: 'We recommend retaking the assessments every 6 months or when you feel your interests or skills have significantly changed.',
    },
    {
      question: 'Can parents access their child\'s results?',
      answer: 'Yes, with the student\'s permission, parents can view their child\'s assessment results and recommendations.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white">
      <header className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg" alt="Career Explorer Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-white">Career Explorer</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-white hover:text-[#FFD600] transition duration-300">Features</Link>
            <Link href="#how-it-works" className="text-white hover:text-[#FFD600] transition duration-300">How It Works</Link>
            <Link href="#testimonials" className="text-white hover:text-[#FFD600] transition duration-300">Testimonials</Link>
            <Link href="#faq" className="text-white hover:text-[#FFD600] transition duration-300">FAQ</Link>
            <Link href="#contact" className="text-white hover:text-[#FFD600] transition duration-300">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option>English</option>
              <option>हिन्दी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
            </select>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-4 py-2 rounded-full hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300"
            >
              Sign Up
            </Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white px-4 py-2 flex flex-col space-y-2">
            <Link href="#features" className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">Features</Link>
            <Link href="#how-it-works" className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">How It Works</Link>
            <Link href="#testimonials" className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">Testimonials</Link>
            <Link href="#faq" className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">FAQ</Link>
            <Link href="#contact" className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300">Contact</Link>
          </nav>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#4F4F4F]">Discover Your Perfect Career Path</h1>
          <p className="text-xl md:text-2xl mb-8 text-[#4F4F4F]">
            Empowering Indian 10th graders to explore, plan, and succeed in their future careers.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/success"
              className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-8 py-3 rounded-full text-lg hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300 flex items-center"
            >
              Step Towards Success <ArrowRight className="ml-2" />
            </Link>
            <Link
              href="#demo"
              className="bg-white text-[#4A90E2] px-8 py-3 rounded-full text-lg border border-[#4A90E2] hover:bg-[#E3F2FD] transition duration-300 flex items-center"
            >
              Watch Demo <Play className="ml-2" size={18} />
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 bg-gradient-to-b from-white to-[#FFF9C4]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#4F4F4F]">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#6FCF97] to-[#4A90E2] p-3 rounded-full">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-[#4F4F4F]">{feature.title}</h3>
                      <p className="text-[#4F4F4F]">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-xl font-semibold text-[#4F4F4F] mb-4">90% of students found their ideal career path</p>
              <Link
                href="/features"
                className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white px-6 py-2 rounded-full hover:from-[#3A7BD5] hover:to-[#5ECE7B] transition duration-300"
              >
                Explore All Features
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-gradient-to-b from-[#FFF9C4] to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#4F4F4F]">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#4F4F4F]">{step.title}</h3>
                    <p className="text-[#4F4F4F]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/get-started"
                className="bg-gradient-to-r from-[#FF7043] to-[#FFD600] text-white px-8 py-3 rounded-full text-lg hover:from-[#FF5722] hover:to-[#FFC107] transition duration-300"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-[#FFE0B2]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#4F4F4F]">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-b from-[#F5F5F5] to-white p-6 rounded-lg shadow-md">
                  <p className="text-lg mb-4 text-[#4F4F4F]">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-[#4F4F4F]">{testimonial.name}</p>
                      <p className="text-[#4A90E2]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/testimonials"
                className="text-[#4A90E2] hover:text-[#FF7043] transition duration-300"
              >
                Read More Success Stories
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-gradient-to-b from-[#FFE0B2] to-[#E3F2FD]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#4F4F4F]">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <button
                    className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-[#4A90E2]">{faq.question}</h3>
                    <ChevronDown className={`transform transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-2 p-4 bg-[#F5F5F5] rounded-lg">
                      <p className="text-[#4F4F4F]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-[#4A90E2] "
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-gradient-to-r from-[#4A90E2] to-[#6FCF97]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Get in Touch</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-[#DDDDDD] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-[#DDDDDD] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-[#DDDDDD] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FFD600] to-[#FF7043] text-white px-6 py-3 rounded-md hover:from-[#FFC107] hover:to-[#FF5722] transition duration-300"
                >
                  Send Message
                </button>
              </form>
              <div className="mt-8 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-[#4A90E2]" />
                  <span>123 Career Street, Mumbai, India 400001</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-[#4A90E2]" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-[#4A90E2]" />
                  <span>support@careerexplorer.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-[#4F4F4F] to-[#4A90E2] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/placeholder.svg" alt="Career Explorer Logo" width={40} height={40} />
              <p>&copy; 2023 Career Explorer. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-[#FFD600] transition duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#FFD600] transition duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}