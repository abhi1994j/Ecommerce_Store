// ErrorFallback.jsx
export default function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);

  return (
    <div
      role="alert"
      className="h-screen flex justify-center items-center flex-col space-y-6 animate__animated animate__fadeIn"
    >
      {/* Icon with animation */}
      <div className="text-6xl text-red-500 animate__animated animate__shakeX">
        ⚠️
      </div>

      {/* Error message with smooth fade-in */}
      <p className="text-2xl font-semibold text-gray-800">
        Something went wrong!
      </p>

      {/* Display the error message */}
      <pre className="text-red-500 text-sm font-mono bg-gray-100 p-4 rounded-md shadow-lg">
        {error.message}
      </pre>

      {/* Retry button with hover effects */}
      <button
        onClick={resetErrorBoundary}
        className="bg-slate-600 text-white font-semibold text-sm px-5 py-3 rounded-lg transition transform duration-300 hover:bg-slate-700 hover:scale-105 hover:shadow-xl"
      >
        Try Again
      </button>
    </div>
  );
}
