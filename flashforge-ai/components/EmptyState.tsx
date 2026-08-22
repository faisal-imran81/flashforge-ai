export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4">
      <div className="text-5xl" aria-hidden="true">📚</div>
      <h2 className="text-lg font-semibold text-gray-700">No flashcards yet</h2>
      <p className="text-sm text-gray-500 max-w-sm">
        Paste your notes above and click Generate to create your study flashcards.
      </p>
    </div>
  )
}