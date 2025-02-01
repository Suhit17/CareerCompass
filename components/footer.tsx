import Link from 'next/link'

export function Footer() {
  return (
    <footer className="h-[50px] bg-[#333333] text-white font-['Inter']">
      <div className="max-w-7xl mx-auto h-full px-4">
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center space-x-8 text-[14px]">
            <span>© 2024 Career Compass. All rights reserved.</span>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="hover:text-[#e0e0e0] hover:underline transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-[#e0e0e0] hover:underline transition duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 