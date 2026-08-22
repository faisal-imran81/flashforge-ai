"use client"

import { useFlashcards } from "@/hooks/useFlashcards"
import InputPanel from "@/components/InputPanel"
import FlashcardDeck from "@/components/FlashcardDeck"
import ProgressBar from "@/components/ProgressBar"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorMessage from "@/components/ErrorMessage"
import EmptyState from "@/components/EmptyState"
import ThemeToggle from "@/components/ThemeToggle"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === "dark"
  const hasCards = cards.length > 0

  const mainStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 1rem",
    gap: "2.5rem",
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "background-color 0.3s, color 0.3s",
  }

  return (
    <main style={mainStyle}>
      <ThemeToggle />

      <header style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            color: isDark ? "#818cf8" : "#4338ca",
            letterSpacing: "-0.025em",
          }}
        >
          FlashForge AI
        </h1>
        <p
          style={{
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
          }}
        >
          Paste your notes. Get flashcards. Study smarter.
        </p>
      </header>

      <InputPanel onGenerate={generate} isLoading={isLoading} />

      <section
        aria-label="Flashcard study area"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
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

      <footer
        style={{
          fontSize: "0.75rem",
          color: isDark ? "#6b7280" : "#9ca3af",
          marginTop: "auto",
        }}
      >
        Built with Next.js + Groq AI · FlashForge AI
      </footer>
    </main>
  )
}
