interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 py-10 px-4 text-center"
    >
      <div className="text-4xl" aria-hidden="true">⚠️</div>
      <p className="text-red-600 font-medium text-sm max-w-sm">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}