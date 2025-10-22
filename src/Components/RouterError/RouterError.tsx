import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function RouterError() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Oops!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          <i>{errorMessage}</i>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default RouterError;
