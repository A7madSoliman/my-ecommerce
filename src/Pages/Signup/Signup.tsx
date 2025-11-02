import { useFormik } from "formik";
import { Mail, Lock, Phone, User, Key, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object({
    name: Yup.string().min(2, "Too Short!").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  async function sendDataToRegister(values: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) {
    console.log("Form values:", values);
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      // FIX: Check for success status
      if (data.message === "success") {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          position: "top", // FIX: Consistent positioning
          backdrop: false,
        });

        // FIX: Add delay to allow toast to be seen
        setTimeout(() => {
          navigate("/signin");
        }, 500);
      } else {
        // Handle unexpected API response
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message || "Something went wrong!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          position: "top",
        });
      }
    } catch (error: any) {
      console.log("Error details:", error);
      const errorMessage =
        error.response?.data?.message || "Network error occurred!";

      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        showConfirmButton: false, // FIX: Removed toast: true for consistency
        timer: 3000, // FIX: Increased timer for better readability
        timerProgressBar: true,
        position: "top", // FIX: Consistent positioning
      });
    } finally {
      setIsLoading(false);
    }
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
    validationSchema: RegisterSchema,
  });

  // Inline style for error message animation
  const errorMessageStyle: React.CSSProperties = {
    animation: "fadeInUp 0.3s ease-out forwards",
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
        CREATE ACCOUNT
      </h2>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        {/* Username */}
        <div className="relative">
          <label
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
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
              className={`pl-10 pr-4 py-3 w-full border rounded focus:outline-none focus:ring-2 transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Your Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div
              className="transform origin-top transition-all duration-300 ease-in-out"
              style={errorMessageStyle}
            >
              {/* FIX: Added dark mode text color */}
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {formik.errors.name}
              </div>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
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
              className={`pl-10 pr-4 py-3 w-full border rounded focus:outline-none focus:ring-2 transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="you@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div
              className="transform origin-top transition-all duration-300 ease-in-out"
              style={errorMessageStyle}
            >
              {/* FIX: Added dark mode text color */}
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {formik.errors.email}
              </div>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <label
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
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
              autoComplete="off"
              className={`pl-10 pr-4 py-3 w-full border rounded focus:outline-none focus:ring-2 transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="01xxxxxxxxx"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div
              className="transform origin-top transition-all duration-300 ease-in-out"
              style={errorMessageStyle}
            >
              {/* FIX: Added dark mode text color */}
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {formik.errors.phone}
              </div>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={`pl-10 pr-12 py-3 w-full border rounded focus:outline-none focus:ring-2 transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div
              className="transform origin-top transition-all duration-300 ease-in-out"
              style={errorMessageStyle}
            >
              {/* FIX: Added dark mode text color */}
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {formik.errors.password}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="rePassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
              <Key size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="rePassword"
              id="rePassword"
              className={`pl-10 pr-12 py-3 w-full border rounded focus:outline-none focus:ring-2 transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                formik.touched.rePassword && formik.errors.rePassword
                  ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Re-enter Password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div
              className="transform origin-top transition-all duration-300 ease-in-out"
              style={errorMessageStyle}
            >
              {/* FIX: Added dark mode text color */}
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {formik.errors.rePassword}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-3 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
        </button>
      </form>

      {/* Sign in redirect */}
      <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-gray-600">
        <p className="text-gray-600 dark:text-gray-400">
          Do you have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
          >
            SIGN IN
          </Link>
        </p>
      </div>

      {/* Global styles for animations - added as style tag */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
