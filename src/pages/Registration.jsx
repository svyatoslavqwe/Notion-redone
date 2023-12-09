import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../api";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function validateForm() {
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: "email", message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      errors.push({
        field: "password",
        message: "The password must contain at least 8 characters",
      });
    }

    if (!/[A-Z]/.test(password)) {
      errors.push({
        field: "password",
        message: "The password must contain at least one capital letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      errors.push({
        field: "password",
        message: "The password must contain at least one lowercase letter",
      });
    }

    if (!/\d/.test(password)) {
      errors.push({
        field: "password",
        message: "The password must contain at least one number",
      });
    }

    if (password !== repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Password mismatch",
      });
    }

    return errors;
  }

  async function handleRegistration() {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      const userData = {
        email,
        password,
        createdAt: Date.now(),
      };

      try {
        await createUser(userData);
        navigate("/login");
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Sign up</h1>
      <input
        id="email"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errors.map((error, index) => {
        if (error.field === "email") {
          return (
            <div key={index} className="text-red-500 text-center">
              <p>{error.message}</p>
            </div>
          );
        }
        return null;
      })}

      <input
        id="password"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.map((error, index) => {
        if (error.field === "password") {
          return (
            <div key={index} className="text-red-500 text-center">
              <p>{error.message}</p>
            </div>
          );
        }
        return null;
      })}

      <input
        id="repeatPassword"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      {errors.map((error, index) => {
        if (error.field === "repeatPassword") {
          return (
            <div key={index} className="text-red-500 text-center">
              <p>{error.message}</p>
            </div>
          );
        }
        return null;
      })}

      <button
        className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold"
        onClick={handleRegistration}
      >
        Sign up
      </button>

      <Link to="/login" className="text-black underline">
        Already have an account? Log in
      </Link>
    </div>
  );
}
