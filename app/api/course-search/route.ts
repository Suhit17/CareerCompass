import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface Course {
  title: string
  provider: string
  duration: string
  rating: number
  level: string
  category: string
  courseUrl: string
}

// Add URL validation helper function
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Add URL normalization helper function
function normalizeUrl(url: string): string {
  // List of valid course providers and their base URLs with search paths
  const providerUrls: { [key: string]: string } = {
    'coursera': 'https://www.coursera.org/search?query=',
    'edx': 'https://www.edx.org/search?q=',
    'udacity': 'https://www.udacity.com/course/search?search=',
    'linkedin learning': 'https://www.linkedin.com/learning/search?keywords='
  }

  try {
    // If it's already a valid URL, verify it's from a trusted provider
    if (isValidUrl(url)) {
      const urlObj = new URL(url)
      const domain = urlObj.hostname.toLowerCase()
      if (Object.values(providerUrls).some(baseUrl => domain.includes(new URL(baseUrl).hostname))) {
        return url
      }
    }

    // Extract provider and course name
    const provider = Object.keys(providerUrls).find(p => 
      url.toLowerCase().includes(p.toLowerCase())
    ) || 'coursera'

    // Special handling for LinkedIn Learning
    if (provider === 'linkedin learning') {
      const searchTerm = url
        .toLowerCase()
        .replace(/linkedin learning/i, '')
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '+')
      return `${providerUrls[provider]}${encodeURIComponent(searchTerm)}`
    }

    // For other providers
    const searchTerm = url
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '+')

    return `${providerUrls[provider]}${encodeURIComponent(searchTerm)}`
  } catch {
    // Fallback to Coursera homepage if URL parsing fails
    return 'https://www.coursera.org/courses'
  }
}

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json()

    const prompt = `
      Provide detailed information about online courses matching "${searchQuery}" in the following JSON format:
      {
        "courses": [{
          "title": "Course Title",
          "provider": "Platform name (e.g., Coursera, edX, Udacity)",
          "duration": "Course duration (e.g., 8 weeks)",
          "rating": number between 1-5 with one decimal place,
          "level": "Difficulty level (Beginner/Intermediate/Advanced)",
          "category": "Main category (Technical/Analytical/Creative/Communication)",
          "courseUrl": "Direct URL to the course (must be a valid URL)"
        }]
      }
      Important notes:
      - Provide up to 3 most relevant courses
      - Only include reputable course providers
      - Ensure course information is current and accurate
      - Include a mix of difficulty levels if applicable
      - Focus on practical, career-oriented courses
      - Always include valid, direct URLs to the courses
    `

    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: "You are an educational technology expert with deep knowledge of online learning platforms and courses."
      },
      { 
        role: "user", 
        content: prompt 
      }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content
    if (response) {
      const parsedResponse = JSON.parse(response)
      
      // Validate and normalize course URLs
      parsedResponse.courses = parsedResponse.courses.map((course: Course) => ({
        ...course,
        courseUrl: normalizeUrl(course.courseUrl)
      }))
      
      return NextResponse.json(parsedResponse)
    } else {
      throw new Error('Received null response from OpenAI API')
    }
  } catch (error) {
    console.error('Course search error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course information' },
      { status: 500 }
    )
  }
} 