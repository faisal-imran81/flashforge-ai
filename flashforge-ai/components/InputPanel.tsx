"use client"

import { useState } from "react"
import { CardCount } from "@/lib/types"

interface InputPanelProps {
  onGenerate: (notes: string, count: CardCount) => void
  isLoading: boolean
}

const CARD_COUNTS: CardCount[] = [5, 10, 15]

export default function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
  const [notes, setNotes] = useState("")
  const [count, setCount] = useState<CardCount>(10)

  const isEmpty = notes.trim().length === 0

  const handleSubmit = () => {
    if (isEmpty || isLoading) return
    onGenerate(notes.trim(), count)
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="notes-input"
          className="text-sm font-medium text-gray-700"
        >
          Your Notes
        </label>
        <textarea
          id="notes-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your lecture notes, textbook content, or type a topic..."
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition"
          aria-describedby="notes-hint"
        />
        <p id="notes-hint" className="text-xs text-gray-400">
          The more detail you add, the better your flashcards will be.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="card-count"
          className="text-sm font-medium text-gray-700"
        >
          Number of Cards
        </label>
        <div className="flex gap-2" role="group" aria-label="Select number of flashcards">
          {CARD_COUNTS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              aria-pressed={count === n}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                count === n
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isEmpty || isLoading}
        aria-disabled={isEmpty || isLoading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        {isLoading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  )
}