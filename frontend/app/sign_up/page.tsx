"use client";

import React, { useState } from "react";
import { signUpApi, SignUpData } from "@/api/signUp_api";

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState<SignUpData>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await signUpApi(form);
      setMessage(`✅ User ${data.username} created successfully!`);
      setForm({ firstname: "", lastname: "", username: "", password: "" });
    } catch (error: any) {
      setMessage(`❌ ${error.message || "Something went wrong!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-md dark:bg-neutral-900 dark:border-neutral-700"
      >
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight">
          Sign Up
        </h2>

        {/* Firstname */}
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          required
        />

        {/* Lastname */}
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          required
        />

        {/* Username */}
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          required
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            tabIndex={-1}
          >
            {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Status message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
