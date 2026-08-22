export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Generating flashcards"
      className="flex flex-col items-center justify-center gap-3 py-12"
    >
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-medium">Generating your flashcards...</p>
    </div>
  )
}