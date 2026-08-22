"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function LoadingSpinner() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === "dark"

  const shimmerBase: React.CSSProperties = {
    borderRadius: "0.75rem",
    background: isDark
      ? "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)"
      : "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Generating flashcards"
      style={{
        width: "100%",
        maxWidth: "36rem",
        margin: "0 auto",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Card Skeleton */}
      <div
        style={{
          ...shimmerBase,
          height: "220px",
          width: "100%",
        }}
      />

      {/* Button Row Skeleton */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <div style={{ ...shimmerBase, height: "42px", flex: 1 }} />
        <div style={{ ...shimmerBase, height: "42px", flex: 1 }} />
        <div style={{ ...shimmerBase, height: "42px", flex: 1 }} />
      </div>

      {/* Progress Bar Skeleton */}
      <div style={{ ...shimmerBase, height: "10px", width: "100%" }} />

      <p
        style={{
          textAlign: "center",
          fontSize: "0.875rem",
          color: isDark ? "#6b7280" : "#9ca3af",
          marginTop: "0.5rem",
        }}
      >
        Generating your flashcards...
      </p>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
