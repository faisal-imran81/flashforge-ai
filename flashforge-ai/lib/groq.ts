import { GenerateResult, CardCount } from "./types"

export async function generateFlashcards(
  notes: string,
  count: CardCount
): Promise<GenerateResult> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, count }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error ?? "Something went wrong." }
    }

    return data
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    }
  }
}