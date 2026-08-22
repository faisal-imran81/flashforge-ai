import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import EmptyState from "@/components/EmptyState"

describe("EmptyState", () => {
  it("renders heading", () => {
    render(<EmptyState />)
    expect(screen.getByRole("heading", { name: /no flashcards yet/i })).toBeDefined()
  })

  it("renders helper text", () => {
    render(<EmptyState />)
    expect(screen.getByText(/paste your notes above/i)).toBeDefined()
  })
})
