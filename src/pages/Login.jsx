import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const { onChange } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    loginUser(email, password)
      .then((user) => {
        if (user) {
          onChange(user);
          navigate("/home");
        } else {
          if (email !== "" && password !== "") {
            setEmailError("Incorrect email address");
            setPasswordError("Incorrect password");
          } else if (email === "" && password !== "") {
            setEmailError("Please enter your email");
            setPasswordError("Incorrect password");
          } else if (email !== "" && password === "") {
            setEmailError("Incorrect email address");
            setPasswordError("Please enter your password");
          } else {
            setEmailError("Please enter your email");
            setPasswordError("Please enter your password");
          }
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Log in</h1>
      <input
        id="email"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && (
        <div className="text-red-500 text-center">{emailError}</div>
      )}
      <input
        id="password"
        className="bg-gray-200 rounded px-3 py-2 mb-3 w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && (
        <div className="text-red-500 text-center">{passwordError}</div>
      )}
      <button
        className="bg-gray-200 rounded px-5 py-3 mb-3 text-lg font-bold"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
}
