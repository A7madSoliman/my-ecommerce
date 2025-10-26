import { useFormik } from "formik";
import { Mail, Lock, Phone, User, Key } from "lucide-react";

function Signup() {
  function sendDataToRegister(values: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) {
    console.log(values);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: sendDataToRegister,
  });

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
        Create Account
      </h2>
      <form className="space-y-5 >" onSubmit={formik.handleSubmit}>
        {/* Username */}
        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="name"
          >
            Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <User size={18} />
            </span>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Your Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Phone size={18} />
            </span>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="01xxxxxxxxx"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="rePassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Key size={18} />
            </span>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Re-enter Password"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
