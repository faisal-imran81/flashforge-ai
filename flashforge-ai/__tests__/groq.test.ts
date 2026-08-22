import { describe, it, expect, vi, beforeEach } from "vitest"
import { generateFlashcards } from "@/lib/groq"

describe("generateFlashcards", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns success with cards on valid response", async () => {
    const mockCards = [
      { front: "Q1", back: "A1", id: "card-0", known: false },
      { front: "Q2", back: "A2", id: "card-1", known: false },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, cards: mockCards }),
    }) as unknown as typeof fetch

    const result = await generateFlashcards("Some notes", 5)
    expect(result.success).toBe(true)
    expect(result.cards?.length).toBe(2)
  })

  it("returns error on failed response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: "AI failed" }),
    }) as unknown as typeof fetch

    const result = await generateFlashcards("Some notes", 5)
    expect(result.success).toBe(false)
    expect(result.error).toBe("AI failed")
  })

  it("returns network error when fetch throws", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network down"))

    const result = await generateFlashcards("Some notes", 5)
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/network error/i)
  })
})
