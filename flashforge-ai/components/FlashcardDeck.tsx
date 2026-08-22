"use client"

import { useEffect } from "react"
import { Flashcard } from "@/lib/types"
import FlashcardItem from "./FlashcardItem"

interface FlashcardDeckProps {
  cards: Flashcard[]
  currentIndex: number
  onMarkKnown: (id: string) => void
  onMarkUnknown: (id: string) => void
  onNext: () => void
  onPrev: () => void
  onReset: () => void
}

export default function FlashcardDeck({
  cards,
  currentIndex,
  onMarkKnown,
  onMarkUnknown,
  onNext,
  onPrev,
  onReset,
}: FlashcardDeckProps) {
  const card = cards[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === cards.length - 1

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase()
      if (tag === "textarea" || tag === "input") return

      switch (e.key) {
        case "ArrowRight":
          if (!isLast) onNext()
          break
        case "ArrowLeft":
          if (!isFirst) onPrev()
          break
        case "k":
        case "K":
          if (card) onMarkKnown(card.id)
          break
        case "u":
        case "U":
          if (card) onMarkUnknown(card.id)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [card, isFirst, isLast, onNext, onPrev, onMarkKnown, onMarkUnknown])

  if (!card) return null

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p
        className="text-sm text-gray-500 dark:text-gray-400 font-medium"
        aria-live="polite"
      >
        Card {currentIndex + 1} of {cards.length}
      </p>

      <FlashcardItem
        card={card}
        onMarkKnown={onMarkKnown}
        onMarkUnknown={onMarkUnknown}
      />

      <div className="flex gap-3 items-center">
        <button
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous card"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={onReset}
          aria-label="Start over"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
        >
          Start Over
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          aria-label="Next card"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500 mt-1">
        <span>← → Navigate</span>
        <span>K = Got It</span>
        <span>U = Still Learning</span>
      </div>
    </div>
  )
}
