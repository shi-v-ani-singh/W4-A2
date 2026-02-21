"use client";

import { useState } from "react";
import registerUser from "@/app/actions/register";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");


    setErrors({});

    const newErrors = {};
    if (!name) newErrors.name = "Full name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Email must contain @";
    }
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      alert("Account created successfully!");
      e.target.reset();
    } catch (err) {
      alert(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">
          Register Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Fill in the form to create your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col">
            <input name="name" placeholder="Full Name" className="border rounded-md p-2 pr-10 focus:ring-2 outline-none w-full transition" />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>


          <div className="flex flex-col">
            <input name="email" placeholder="Email" className="border rounded-md p-2 pr-10 focus:ring-2 outline-none w-full transition" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>


          <div className="flex flex-col relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border rounded-md p-2 pr-10 focus:ring-2 outline-none w-full transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="flex flex-col relative">
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="border rounded-md p-2 pr-10 focus:ring-2 outline-none w-full transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </button>
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>


          <button
            type="submit"
            disabled={loading}
            className="bg-linear-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md font-semibold hover:from-purple-500 hover:to-pink-500 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage