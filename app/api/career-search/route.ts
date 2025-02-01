import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Add interface at the top of the file
interface Career {
  salary: string;
  [key: string]: any;
}

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json()

    const prompt = `
      Provide detailed information about careers matching "${searchQuery}" in the following JSON format, with salaries specifically for the Indian job market. This query may come from voice input, so handle natural language queries appropriately:
      {
        "careers": [{
          "title": "Career Title",
          "description": "Brief description of the role",
          "matchScore": number between 0-100,
          "salary": "Salary range in INR formatted like '₹X,XX,XXX - ₹Y,XX,XXX per annum'",
          "growth": "Growth projection with context",
          "requirements": ["requirement1", "requirement2", ...],
          "skills": ["skill1", "skill2", ...],
          "category": "Main category"
        }]
      }
      Important notes:
      - Handle natural language variations in the query
      - Provide up to 3 most relevant careers
      - Ensure salary ranges are current for the Indian job market
      - Format salary in Indian notation (e.g., ₹8,00,000 - ₹25,00,000 per annum)
      - Include entry-level to experienced professional ranges
      - Ensure information is accurate and up-to-date for India
    `

    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: "You are a career counseling expert with deep knowledge of the Indian job market and salary trends. You can understand and process natural language queries about careers."
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
      
      // Validate salary format
      parsedResponse.careers = parsedResponse.careers.map((career: Career) => ({
        ...career,
        salary: validateAndFormatSalary(career.salary)
      }))
      
      return NextResponse.json(parsedResponse)
    } else {
      throw new Error('Received null response from OpenAI API')
    }
  } catch (error) {
    console.error('Career search error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch career information' },
      { status: 500 }
    )
  }
}

// Helper function to validate and format salary
function validateAndFormatSalary(salary: string): string {
  if (!salary.includes('₹')) {
    // If salary doesn't have the ₹ symbol, add it
    return salary.replace(/^(\d)/, '₹$1')
  }
  if (!salary.toLowerCase().includes('per annum')) {
    // If salary doesn't specify the period, add it
    return `${salary} per annum`
  }
  return salary
} 