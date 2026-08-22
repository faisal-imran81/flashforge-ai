import Groq from "groq-sdk"
import { Flashcard, GenerateResult, CardCount } from "./types"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateFlashcards(
  notes: string,
  count: CardCount
): Promise<GenerateResult> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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

    if (
      !parsed.cards ||
      !Array.isArray(parsed.cards) ||
      parsed.cards.length === 0
    ) {
      return {
        success: false,
        error: "No cards were generated. Try adding more detailed notes.",
      }
    }

    const cards: Flashcard[] = parsed.cards.map(
      (card: { front: string; back: string }, index: number) => ({
        id: `card-${index}-${Date.now()}`,
        front: card.front,
        back: card.back,
        known: false,
      })
    )

    return { success: true, cards }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: "AI returned an unexpected format. Please try again.",
      }
    }

    const message = error instanceof Error ? error.message : "Unknown error"

    if (message.includes("429")) {
      return {
        success: false,
        error: "Too many requests. Please wait a moment and try again.",
      }
    }

    if (message.includes("503") || message.includes("unavailable")) {
      return {
        success: false,
        error: "AI service is temporarily unavailable. Please try again shortly.",
      }
    }

    return {
      success: false,
      error: "Failed to generate flashcards. Please try again.",
    }
  }
}