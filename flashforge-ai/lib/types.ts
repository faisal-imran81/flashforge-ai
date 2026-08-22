export interface Flashcard {
  id: string
  front: string
  back: string
  known: boolean
}

export interface GenerateResult {
  success: boolean
  cards?: Flashcard[]
  error?: string
}

export type CardCount = 5 | 10 | 15