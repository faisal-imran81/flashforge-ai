import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import InputPanel from "@/components/InputPanel"

describe("InputPanel", () => {
  it("renders textarea and generate button", () => {
    render(<InputPanel onGenerate={() => {}} isLoading={false} />)
    expect(screen.getByRole("textbox")).toBeDefined()
    expect(screen.getByRole("button", { name: /generate flashcards/i })).toBeDefined()
  })

  it("generate button is disabled when textarea is empty", () => {
    render(<InputPanel onGenerate={() => {}} isLoading={false} />)
    const button = screen.getByRole("button", { name: /generate flashcards/i })
    expect(button.hasAttribute("disabled")).toBe(true)
  })

  it("generate button enables when text is entered", () => {
    render(<InputPanel onGenerate={() => {}} isLoading={false} />)
    const textarea = screen.getByRole("textbox")
    fireEvent.change(textarea, { target: { value: "Some notes here" } })
    const button = screen.getByRole("button", { name: /generate flashcards/i })
    expect(button.hasAttribute("disabled")).toBe(false)
  })

  it("calls onGenerate with correct args when submitted", () => {
    const onGenerate = vi.fn()
    render(<InputPanel onGenerate={onGenerate} isLoading={false} />)
    const textarea = screen.getByRole("textbox")
    fireEvent.change(textarea, { target: { value: "My notes" } })
    fireEvent.click(screen.getByRole("button", { name: /generate flashcards/i }))
    expect(onGenerate).toHaveBeenCalledWith("My notes", 10)
  })

  it("shows generating text when loading", () => {
    render(<InputPanel onGenerate={() => {}} isLoading={true} />)
    expect(screen.getByText(/generating/i)).toBeDefined()
  })

  it("does not call onGenerate when loading", () => {
    const onGenerate = vi.fn()
    render(<InputPanel onGenerate={onGenerate} isLoading={true} />)
    const textarea = screen.getByRole("textbox")
    fireEvent.change(textarea, { target: { value: "Some notes" } })
    fireEvent.click(screen.getByRole("button", { name: /generating/i }))
    expect(onGenerate).not.toHaveBeenCalled()
  })
})
