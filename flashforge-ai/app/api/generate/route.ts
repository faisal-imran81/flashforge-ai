import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { Flashcard, CardCount } from "@/lib/types"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { notes, count } = await req.json()

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Notes cannot be empty." },
        { status: 400 }
      )
    }

    const completion = await groq.chat.completions.create({
      model: "groq/compound",
      messages: [
        {
          role: "user",
          content: `You are a study assistant. Given the notes below, generate exactly ${count} flashcards.

Respond ONLY with valid JSON in this exact format, no markdown, no explanation, no code blocks:
{
  "cards": [
    { "front": "question or term", "back": "answer or definition" }
  ]
}

Notes:
${notes}`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    const raw = completion.choices[0]?.message?.content ?? ""
    const cleaned = raw.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    if (!parsed.cards || !Array.isArray(parsed.cards) || parsed.cards.length === 0) {
      return NextResponse.json(
        { success: false, error: "No cards were generated. Try more detailed notes." },
        { status: 422 }
      )
    }

    const cards: Flashcard[] = parsed.cards.map(
      (card: { front: string; back: string }, index: number) => ({
        id: `card-${index}-${Date.now()}`,
        front: card.front,
        back: card.back,
        known: false,
      })
    )

    return NextResponse.json({ success: true, cards })
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "AI returned unexpected format. Please try again." },
        { status: 422 }
      )
    }

    console.error("Groq API Error:", error)
    const message = error instanceof Error ? error.message : "Unknown error"

    if (message.includes("429")) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a moment." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Failed to generate flashcards. Please try again." },
      { status: 500 }
    )
  }
}