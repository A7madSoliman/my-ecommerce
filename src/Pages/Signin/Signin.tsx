import { Mail, Lock, Phone, User, Key } from "lucide-react";

function Signin() {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
        Signin to Your Account
      </h2>
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="you@email.com"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Lock size={18} />
            </span>
            <input
              type="password"
              name="password"
              id="password"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Sign in{" "}
        </button>
      </form>
    </div>
  );
}

export default Signin;
