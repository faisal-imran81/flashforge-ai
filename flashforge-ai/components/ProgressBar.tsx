interface ProgressBarProps {
  known: number
  total: number
}

export default function ProgressBar({ known, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((known / total) * 100)

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div
        className="flex justify-between text-sm text-gray-600 mb-1 font-medium"
        aria-label={`${known} of ${total} cards marked as known`}
      >
        <span>{known} known</span>
        <span>{total - known} remaining</span>
      </div>
      <div
        className="w-full bg-gray-200 rounded-full h-2.5"
        role="progressbar"
        aria-valuenow={known}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Study progress"
      >
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {known === total && total > 0 && (
        <p className="text-center text-green-600 font-semibold text-sm mt-2">
          🎉 You know all {total} cards!
        </p>
      )}
    </div>
  )
}