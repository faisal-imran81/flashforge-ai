import { useState, useCallback, useEffect } from "react"
import { Flashcard, CardCount } from "@/lib/types"
import { generateFlashcards } from "@/lib/groq"

const STORAGE_KEY = "flashforge_deck"

interface UseFlashcardsReturn {
  cards: Flashcard[]
  isLoading: boolean
  error: string | null
  currentIndex: number
  knownCount: number
  generate: (notes: string, count: CardCount) => Promise<void>
  markKnown: (id: string) => void
  markUnknown: (id: string) => void
  goNext: () => void
  goPrev: () => void
  reset: () => void
}

export function useFlashcards(): UseFlashcardsReturn {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCards(parsed)
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Save to localStorage whenever cards change
  useEffect(() => {
    try {
      if (cards.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore storage errors
    }
  }, [cards])

  const knownCount = cards.filter((c) => c.known).length

  const generate = useCallback(async (notes: string, count: CardCount) => {
    setIsLoading(true)
    setError(null)
    setCards([])
    setCurrentIndex(0)

    const result = await generateFlashcards(notes, count)

    if (result.success && result.cards) {
      setCards(result.cards)
    } else {
      setError(result.error ?? "Something went wrong. Please try again.")
    }

    setIsLoading(false)
  }, [])

  const markKnown = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, known: true } : card))
    )
  }, [])

  const markUnknown = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, known: false } : card))
    )
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1)
  }, [])

  const reset = useCallback(() => {
    setCards([])
    setError(null)
    setCurrentIndex(0)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return {
    cards,
    isLoading,
    error,
    currentIndex,
    knownCount,
    generate,
    markKnown,
    markUnknown,
    goNext,
    goPrev,
    reset,
  }
}
