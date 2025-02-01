'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, CheckCircle, Play, Menu, X, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'
import { Footer } from './footer'

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-[#E6F7FF] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
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
            <span className="text-2xl font-bold text-[#1565c0]">Career Compass</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-[#424242] hover:text-[#1565c0] transition duration-300">Features</Link>
            <Link href="#how-it-works" className="text-[#424242] hover:text-[#1565c0] transition duration-300">How It Works</Link>
            <Link href="#testimonials" className="text-[#424242] hover:text-[#1565c0] transition duration-300">Testimonials</Link>
            <Link href="#faq" className="text-[#424242] hover:text-[#1565c0] transition duration-300">FAQ</Link>
            <Link href="#contact" className="text-[#424242] hover:text-[#1565c0] transition duration-300">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[#1565c0] hover:text-[#1976d2] transition duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-[#1976d2] text-white px-6 py-2 rounded-lg hover:bg-[#1565c0] transition duration-300"
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
            <Link href="#features" className="text-[#424242] hover:text-[#1565c0] font-medium transition duration-300">Features</Link>
            <Link href="#how-it-works" className="text-[#424242] hover:text-[#1565c0] font-medium transition duration-300">How It Works</Link>
            <Link href="#testimonials" className="text-[#424242] hover:text-[#1565c0] font-medium transition duration-300">Testimonials</Link>
            <Link href="#faq" className="text-[#424242] hover:text-[#1565c0] font-medium transition duration-300">FAQ</Link>
            <Link href="#contact" className="text-[#424242] hover:text-[#1565c0] font-medium transition duration-300">Contact</Link>
          </nav>
        )}
      </header>

      <main>
        <section className="container mx-auto my-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1565c0] mb-6">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-[#424242] mb-8 max-w-3xl mx-auto font-medium">
              Empowering Indian 10th graders to explore, plan, and succeed in their future careers.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/success"
                className="bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300 flex items-center"
              >
                Step Towards Success <ArrowRight className="ml-2" />
              </Link>
              <Link
                href="#demo"
                className="bg-white text-[#1976d2] text-[16px] font-semibold px-8 py-3 rounded-lg border border-[#1976d2] hover:bg-[#E6F7FF] transition duration-300 flex items-center"
              >
                Watch Demo <Play className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 border-t border-[#E9ECEF]">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1a237e]">Our Features</h2>
            </div>
            <div className="text-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#e3f2fd] p-3 rounded-full w-12 h-12 flex items-center justify-center">
                        <CheckCircle className="text-[#1565c0]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold leading-tight text-[#1a237e] mb-2">{feature.title}</h3>
                        <p className="text-base leading-normal text-[#37474f]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-xl font-semibold text-[#1a237e] mb-4">90% of students found their ideal career path</p>
                <Link
                  href="/features"
                  className="bg-[#1976d2] text-white px-6 py-2 rounded-lg hover:bg-[#1565c0] transition duration-300"
                >
                  Explore All Features
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white border-t border-[#E9ECEF]">
          <div className="container mx-auto px-4">
            <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-[#e3f2fd] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-[#1565c0] font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1565c0] mb-2">{step.title}</h3>
                  <p className="text-[16px] text-[#424242]">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/signup"
                className="bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300 inline-flex items-center"
              >
                Get Started Now <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-[#e3f2fd] border-t border-[#E9ECEF]">
          <div className="container mx-auto px-4">
            <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 border border-[#E9ECEF] hover:border-[#1976d2] shadow-md hover:shadow-lg transition duration-300"
                >
                  <p className="text-[16px] text-[#424242] mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-[#1976d2]"
                    />
                    <div>
                      <p className="font-semibold text-[#1565c0]">{testimonial.name}</p>
                      <p className="text-[14px] text-[#1976d2]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/testimonials"
                className="text-[#1976d2] hover:text-[#1565c0] hover:underline transition duration-300 inline-flex items-center"
              >
                Read More Success Stories <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-[#e3f2fd] border-t border-[#E9ECEF]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[24px] font-bold text-[#1565c0]">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <div className="bg-white rounded-lg border border-[#E9ECEF] hover:border-[#1976d2] shadow-sm hover:shadow-md transition duration-300">
                    <button
                      className="w-full flex justify-between items-center p-6 text-left"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <h3 className="text-[18px] font-semibold text-[#1565c0]">{faq.question}</h3>
                      <ChevronDown 
                        className={`text-[#1976d2] transform transition-transform duration-300 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-[16px] text-[#424242]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-[#1976d2] hover:text-[#1565c0] hover:underline transition duration-300 inline-flex items-center"
              >
                View All FAQs <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white border-t border-[#E9ECEF]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12">Get in Touch</h2>
            <div className="max-w-3xl mx-auto bg-[#F8F9FA] rounded-lg p-8">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition duration-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300"
                >
                  Send Message
                </button>
              </form>
              <div className="mt-8 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-[#1976d2]" size={20} />
                  <span className="text-[#424242]">123 Career Street, Mumbai, India 400001</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-[#1976d2]" size={20} />
                  <span className="text-[#424242]">+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-[#1976d2]" size={20} />
                  <span className="text-[#424242]">support@careerexplorer.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}