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
        className="w-full"
        style={{ perspective: "1000px" }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={
            flipped
              ? `Answer: ${card.back}`
              : `Question: ${card.front}. Press Enter or Space to flip.`
          }
          onClick={handleFlip}
          onKeyDown={handleKeyDown}
          className="relative w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-2xl"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "220px",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-indigo-100 bg-white dark:bg-gray-800 dark:border-indigo-900 shadow-md flex flex-col items-center justify-center p-6 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Question
            </p>
            <p className="text-gray-800 dark:text-gray-100 text-base font-medium leading-relaxed">
              {card.front}
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Click or press Enter to reveal
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-green-100 bg-green-50 dark:bg-gray-800 dark:border-green-900 shadow-md flex flex-col items-center justify-center p-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3">
              Answer
            </p>
            <p className="text-gray-800 dark:text-gray-100 text-base font-medium leading-relaxed">
              {card.back}
            </p>
          </div>
        </div>
      </div>

      {flipped && (
        <div
          className="flex gap-3 w-full"
          style={{ animation: "fadeIn 0.3s ease" }}
        >
          <button
            onClick={() => onMarkUnknown(card.id)}
            className="flex-1 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-colors"
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  )
}
