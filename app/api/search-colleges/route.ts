import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
})

export async function POST(request: Request) {
  try {
    const { stream, location, budget } = await request.json()

    // Validate input
    if (!stream || !location || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `Find colleges for a student interested in ${stream} in ${location} with a budget of ${budget}. 
    Provide 3 realistic college suggestions with their requirements and offerings. Return the response in the following JSON format:
    {
      "colleges": [
        {
          "name": "College Name",
          "location": "Location",
          "requirements": "Admission requirements",
          "offerings": ["offering1", "offering2", "offering3"]
        }
      ]
    }`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const responseContent = completion.choices[0].message.content
    let parsedResponse
    
    try {
      parsedResponse = JSON.parse(responseContent || '{"colleges": []}')
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      parsedResponse = { colleges: [] }
    }

    return NextResponse.json({
      colleges: parsedResponse.colleges,
      message: `Here are some college suggestions based on your criteria: ${stream} in ${location} with a budget of ${budget}.`
    })

  } catch (error) {
    console.error('Search colleges error:', error)
    return NextResponse.json(
      { error: 'Failed to search colleges' },
      { status: 500 }
    )
  }
} 