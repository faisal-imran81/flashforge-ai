import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProgressBar from "@/components/ProgressBar"

describe("ProgressBar", () => {
  it("renders known and remaining counts", () => {
    render(<ProgressBar known={3} total={10} />)
    expect(screen.getByText("3 known")).toBeDefined()
    expect(screen.getByText("7 remaining")).toBeDefined()
  })

  it("shows completion message when all cards known", () => {
    render(<ProgressBar known={5} total={5} />)
    expect(screen.getByText(/you know all 5 cards/i)).toBeDefined()
  })

  it("does not show completion message when not done", () => {
    render(<ProgressBar known={2} total={5} />)
    expect(screen.queryByText(/you know all/i)).toBeNull()
  })

  it("renders progressbar role", () => {
    render(<ProgressBar known={3} total={10} />)
    expect(screen.getByRole("progressbar")).toBeDefined()
  })

  it("handles zero total gracefully", () => {
    render(<ProgressBar known={0} total={0} />)
    expect(screen.getByRole("progressbar")).toBeDefined()
  })
})
