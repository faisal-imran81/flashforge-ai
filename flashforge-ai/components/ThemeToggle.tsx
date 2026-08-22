"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 50,
        padding: "0.625rem",
        borderRadius: "9999px",
        border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
        background: isDark ? "#1f2937" : "#ffffff",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        fontSize: "1.125rem",
        lineHeight: 1,
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  )
}
