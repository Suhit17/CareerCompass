import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { collegeName, location } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that provides accurate college website URLs. Only return the URL, nothing else." 
        },
        { 
          role: "user", 
          content: `Please provide the official website URL for ${collegeName} located in ${location}, India. Return only the URL without any additional text or explanation.` 
        }
      ],
      temperature: 0.3,
    })

    const url = completion.choices[0]?.message?.content?.trim()

    // Validate if the response is a valid URL
    try {
      new URL(url || '')
      return NextResponse.json({ url })
    } catch {
      return NextResponse.json({ 
        error: 'Invalid URL received from API' 
      }, { status: 422 })
    }

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch college URL' 
    }, { status: 500 })
  }
} 