import { ArrowRight, Play, X, CheckCircle, ClipboardCheck, ChartBar, Search, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      title: "Career Assessment",
      description: "Take our comprehensive assessment to discover your strengths and interests",
      icon: <ClipboardCheck className="text-[#1565c0]" size={24} />
    },
    {
      title: "Personalized Guidance",
      description: "Get tailored recommendations based on your unique profile",
      icon: <ChartBar className="text-[#1565c0]" size={24} />
    },
    {
      title: "Stream Selection",
      description: "Make informed decisions about your academic stream choice",
      icon: <Search className="text-[#1565c0]" size={24} />
    },
    {
      title: "Future Planning",
      description: "Explore potential career paths and educational opportunities",
      icon: <ArrowRight className="text-[#1565c0]" size={24} />
    }
  ];

  const steps = [
    {
      title: "Take Assessment",
      description: "Complete our comprehensive career assessment",
      icon: <ClipboardCheck className="text-white" size={16} />
    },
    {
      title: "Get Results",
      description: "Receive personalized stream recommendations",
      icon: <ChartBar className="text-white" size={16} />
    },
    {
      title: "Explore Options",
      description: "Discover detailed career and college paths",
      icon: <Search className="text-white" size={16} />
    }
  ];

  const testimonials = [
    {
      content: "This platform helped me choose the perfect stream for my career goals.",
      name: "Priya Singh",
      role: "Student, Class 10"
    },
    {
      content: "The career assessment gave me clear direction for my future.",
      name: "Rahul Kumar",
      role: "Student, Class 11"
    },
    {
      content: "Excellent resource for making informed academic decisions.",
      name: "Anita Patel",
      role: "Parent"
    }
  ];

  const faqs = [
    {
      question: "How does the app determine career recommendations?",
      answer: "Our app uses psychometric tests, academic performance, and personal interests to provide tailored career recommendations."
    },
    {
      question: "Is the app suitable for all educational boards?",
      answer: "Yes, we support students from CBSE, ICSE, and State Boards across India."
    },
    {
      question: "How often should I retake the assessments?",
      answer: "We recommend retaking every 6 months or when your interests significantly change."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-[#E6F7FF] shadow-sm">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-2xl font-bold text-[#1565c0]">
          Career Compass
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-[#424242] hover:text-[#1565c0] transition duration-300">Features</Link>
            <Link href="/how-it-works" className="text-[#424242] hover:text-[#1565c0] transition duration-300">How It Works</Link>
            <Link href="/contact" className="text-[#424242] hover:text-[#1565c0] transition duration-300">Contact</Link>
            <Link
              href="/signup"
              className="bg-[#1976d2] text-white px-6 py-2 rounded-lg hover:bg-[#1565c0] transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#E6F7FF] to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-[32px] font-bold text-[#1565c0] mb-6 font-['Inter']">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-[18px] text-[#424242] leading-relaxed mb-8 font-['Inter']">
              Empowering Indian 10th graders to explore, plan, and succeed in their future careers.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/success"
                className="bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300 inline-flex items-center"
              >
                Step Towards Success <ArrowRight className="ml-2" />
              </Link>
              <Link
                href="#demo"
                className="bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300 inline-flex items-center"
              >
                Watch Demo <Play className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-[#E9ECEF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12 font-['Inter']">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#F8F9FA] p-6 rounded-lg hover:shadow-lg transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-[18px] font-bold text-[#1565c0] mb-2">{feature.title}</h3>
                <p className="text-[16px] text-[#424242] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white border-t border-[#E9ECEF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12 font-['Inter']">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-[#e3f2fd] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#1565c0] font-bold">{index + 1}</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#1565c0] mb-2">{step.title}</h3>
                <p className="text-[16px] text-[#424242] leading-relaxed">{step.description}</p>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-[#e3f2fd] border-t border-[#E9ECEF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12 font-['Inter']">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 border border-[#E9ECEF] hover:border-[#1976d2] shadow-md hover:shadow-lg transition duration-300"
              >
                <p className="text-[16px] text-[#424242] leading-relaxed mb-6 font-['Inter']">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-bold text-[#1565c0]">{testimonial.name}</p>
                    <p className="text-[14px] text-[#424242]">{testimonial.role}</p>
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

      {/* FAQ Section */}
      <section className="py-20 bg-[#e3f2fd] border-t border-[#E9ECEF]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12 font-['Inter']">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-[#E9ECEF]">
                <button className="w-full px-6 py-4 text-left">
                  <span className="text-[16px] font-bold text-[#1565c0]">{faq.question}</span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[16px] text-[#424242] leading-relaxed font-['Inter']">{faq.answer}</p>
                  </div>
                )}
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

      {/* CTA Section */}
      <section className="py-20 bg-[#F8F9FA] border-t border-[#E9ECEF]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[24px] font-bold text-[#1565c0] mb-4 font-['Inter']">Ready to Start Your Journey?</h2>
          <p className="text-[16px] text-[#424242] mb-8 font-['Inter']">Join thousands of students who have found their perfect career path</p>
          <Link
            href="/signup"
            className="bg-[#1976d2] text-white text-[16px] font-semibold px-8 py-3 rounded-lg hover:bg-[#1565c0] transition duration-300 inline-flex items-center"
          >
            Get Started Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white border-t border-[#E9ECEF]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[24px] font-bold text-[#1565c0] text-center mb-12 font-['Inter']">
            Get in Touch
          </h2>
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

      <Footer />
    </div>
  )
} 