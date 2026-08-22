"use client"

import { useState, useEffect } from "react"
import { Flashcard } from "@/lib/types"

interface FlashcardItemProps {
  card: Flashcard
  onMarkKnown: (id: string) => void
  onMarkUnknown: (id: string) => void
}

export default function FlashcardItem({
  card,
  onMarkKnown,
  onMarkUnknown,
}: FlashcardItemProps) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [card.id])

  const handleFlip = () => setFlipped((prev) => !prev)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleFlip()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-4">
      <div
        role="button"
        tabIndex={0}
        aria-label={flipped ? `Back: ${card.back}` : `Front: ${card.front}. Press Enter to flip.`}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        className="w-full min-h-48 cursor-pointer rounded-2xl border-2 border-indigo-100 bg-white shadow-md flex items-center justify-center p-6 text-center transition-all duration-200 hover:shadow-lg hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 select-none"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            {flipped ? "Answer" : "Question"}
          </p>
          <p className="text-gray-800 text-base font-medium leading-relaxed">
            {flipped ? card.back : card.front}
          </p>
          {!flipped && (
            <p className="text-xs text-gray-400 mt-4">Click or press Enter to reveal</p>
          )}
        </div>
      </div>

      {flipped && (
        <div className="flex gap-3 w-full">
          <button
            onClick={() => onMarkUnknown(card.id)}
            className="flex-1 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-colors"
          >
            Still Learning
          </button>
          <button
            onClick={() => onMarkKnown(card.id)}
            className="flex-1 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
          >
            Got It ✓
          </button>
        </div>
      )}
    </div>
  )
}