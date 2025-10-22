import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 transition-all duration-300">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl sm:text-9xl font-black text-gray-200 dark:text-gray-800 transition-colors duration-300">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
              Lost in Space?
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-300">
            The page you're looking for seems to have drifted off into the
            digital cosmos. Let's get you back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 dark:focus:ring-blue-400 shadow-lg w-full sm:w-auto text-center"
          >
            <span className="relative z-10">🚀 Go Back Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 dark:focus:ring-gray-400 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              ↩️ Go Back
            </span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 opacity-30 dark:opacity-20 transition-opacity duration-300">
          <div className="flex justify-center space-x-8">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"
                style={{ animationDelay: `${star * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
