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
  isShuffled: boolean
  generate: (notes: string, count: CardCount) => Promise<void>
  markKnown: (id: string) => void
  markUnknown: (id: string) => void
  goNext: () => void
  goPrev: () => void
  reset: () => void
  toggleShuffle: () => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function useFlashcards(): UseFlashcardsReturn {
  const [originalCards, setOriginalCards] = useState<Flashcard[]>([])
  const [cards, setCards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOriginalCards(parsed)
          setCards(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      if (originalCards.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(originalCards))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore
    }
  }, [originalCards])

  const knownCount = cards.filter((c) => c.known).length

  const generate = useCallback(async (notes: string, count: CardCount) => {
    setIsLoading(true)
    setError(null)
    setCards([])
    setOriginalCards([])
    setCurrentIndex(0)
    setIsShuffled(false)

    const result = await generateFlashcards(notes, count)

    if (result.success && result.cards) {
      setOriginalCards(result.cards)
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
    setOriginalCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, known: true } : card))
    )
  }, [])

  const markUnknown = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, known: false } : card))
    )
    setOriginalCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, known: false } : card))
    )
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1)
  }, [])

  const toggleShuffle = useCallback(() => {
    setIsShuffled((prev) => {
      const next = !prev
      setCards(next ? shuffleArray(originalCards) : [...originalCards])
      setCurrentIndex(0)
      return next
    })
  }, [originalCards])

  const reset = useCallback(() => {
    setCards([])
    setOriginalCards([])
    setError(null)
    setCurrentIndex(0)
    setIsShuffled(false)
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
    isShuffled,
    generate,
    markKnown,
    markUnknown,
    goNext,
    goPrev,
    reset,
    toggleShuffle,
  }
}
