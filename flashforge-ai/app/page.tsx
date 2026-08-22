"use client"

import { useFlashcards } from "@/hooks/useFlashcards"
import InputPanel from "@/components/InputPanel"
import FlashcardDeck from "@/components/FlashcardDeck"
import ProgressBar from "@/components/ProgressBar"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorMessage from "@/components/ErrorMessage"
import EmptyState from "@/components/EmptyState"

export default function Home() {
  const {
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
  } = useFlashcards()

  const hasCards = cards.length > 0

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 gap-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">
          FlashForge AI
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Paste your notes. Get flashcards. Study smarter.
        </p>
      </header>

      <InputPanel onGenerate={generate} isLoading={isLoading} />

      <section
        aria-label="Flashcard study area"
        className="w-full flex flex-col items-center gap-6"
      >
        {isLoading && <LoadingSpinner />}

        {!isLoading && error && (
          <ErrorMessage message={error} onRetry={reset} />
        )}

        {!isLoading && !error && !hasCards && <EmptyState />}

        {!isLoading && !error && hasCards && (
          <>
            <ProgressBar known={knownCount} total={cards.length} />
            <FlashcardDeck
              cards={cards}
              currentIndex={currentIndex}
              onMarkKnown={markKnown}
              onMarkUnknown={markUnknown}
              onNext={goNext}
              onPrev={goPrev}
              onReset={reset}
            />
          </>
        )}
      </section>

      <footer className="text-xs text-gray-400 mt-auto">
        Built with Next.js + Groq AI · FlashForge AI
      </footer>
    </main>
  )
}