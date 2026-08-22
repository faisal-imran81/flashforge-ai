import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import ErrorMessage from "@/components/ErrorMessage"

describe("ErrorMessage", () => {
  it("renders error message correctly", () => {
    render(<ErrorMessage message="Something went wrong." onRetry={() => {}} />)
    expect(screen.getByText("Something went wrong.")).toBeDefined()
  })

  it("renders try again button", () => {
    render(<ErrorMessage message="Error" onRetry={() => {}} />)
    expect(screen.getByRole("button", { name: /try again/i })).toBeDefined()
  })

  it("calls onRetry when button is clicked", () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)
    fireEvent.click(screen.getByRole("button", { name: /try again/i }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("has role alert for screen readers", () => {
    render(<ErrorMessage message="Error" onRetry={() => {}} />)
    expect(screen.getByRole("alert")).toBeDefined()
  })
})
