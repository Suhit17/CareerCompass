import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

interface College {
  name: string
  location: string
  requirements: string
  programs: string[]
  courses: string[]
  rating: number
  website: string
  offerings: string[]
}

// Rate limiting configuration
const RATE_LIMIT = 10 // requests
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const requestCounts = new Map<string, { count: number; timestamp: number }>()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function validateInput(stream: string, location: string, budget: string): string | null {
  if (!stream?.trim()) return 'Academic stream is required'
  if (!location?.trim()) return 'Location is required'
  if (!budget?.trim()) return 'Budget is required'
  
  // Validate budget format (assuming format like "₹2,00,000 - ₹5,00,000")
  const budgetPattern = /^₹[\d,]+ - ₹[\d,]+$/
  if (!budgetPattern.test(budget)) return 'Invalid budget format'
  
  return null
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRequests = requestCounts.get(ip)

  if (!userRequests) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (userRequests.count >= RATE_LIMIT) {
    return false
  }

  userRequests.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const { stream, location, budget, prompt } = await request.json()

    // Validate input
    const validationError = validateInput(stream, location, budget)
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not defined')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are College Navigator, a specialized counselor for Indian education. 
          For each college recommendation, provide comprehensive details about:
          
          1. Academic Excellence:
          - NAAC/NBA accreditation status and rating
          - Faculty qualifications and research output
          - Academic infrastructure and facilities
          
          2. Financial Considerations:
          - Detailed fee structure within specified budget
          - Available scholarships and financial aid
          - Payment plans and education loan tie-ups
          
          3. Campus & Opportunities:
          - Location accessibility and surrounding amenities
          - Placement statistics with company details
          - Industry partnerships and internship programs
          - Research facilities and opportunities
          
          Return response in JSON format:
          {
            "colleges": [{
              "name": "Full college name with establishment year",
              "location": "Complete address with nearby landmarks",
              "requirements": "Detailed admission criteria including academics, entrance exams, and selection process",
              "programs": ["Program name with specialization tracks"],
              "courses": ["Detailed course names with duration"],
              "rating": "NAAC/NBA rating (1-5)",
              "website": "Official website URL",
              "offerings": [
                "Detailed campus facilities",
                "Latest placement statistics",
                "Available scholarships",
                "Industry collaborations"
              ]
            }],
            "suggestions": "Personalized guidance based on user criteria"
          }`
        },
        {
          role: "user",
          content: `Find colleges for ${stream} in ${location} with budget ${budget}. 
          Focus on:
          1. Programs matching ${stream} with specialization options
          2. Total costs within ${budget} including tuition and other fees
          3. Available financial aid and scholarship opportunities
          4. Placement records specific to ${stream} programs
          5. Industry connections and internship programs
          6. Research facilities and faculty expertise`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    })

    const responseText = completion.choices[0].message.content || ''
    const parsedData = JSON.parse(responseText)
    const colleges = parseCollegeData(responseText)

    return NextResponse.json({
      colleges,
      suggestions: colleges.length === 0 
        ? 'Consider:\n1. Expanding your search to nearby locations\n2. Exploring similar programs\n3. Checking colleges with flexible payment plans\n4. Looking at colleges in the next budget range'
        : ''
    })
  } catch (error) {
    console.error('Error in college search:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { 
        error: 'Failed to fetch college recommendations',
        details: errorMessage,
        colleges: [],
        suggestions: 'Please refine your search criteria or contact our support team for personalized assistance.'
      },
      { status: 500 }
    )
  }
}

function parseCollegeData(responseText: string): College[] {
  try {
    const parsedData = JSON.parse(responseText)
    if (!parsedData.colleges || !Array.isArray(parsedData.colleges)) {
      return []
    }

    return parsedData.colleges.map((college: any) => ({
      name: college.name || '',
      location: college.location || '',
      requirements: college.requirements || '',
      programs: Array.isArray(college.programs) ? college.programs : [],
      courses: Array.isArray(college.courses) ? college.courses : [],
      rating: Number(college.rating) || 0,
      website: college.website || '',
      offerings: Array.isArray(college.offerings) ? college.offerings : []
    }))
  } catch (error) {
    console.error('Error parsing college data:', error)
    return []
  }
} 