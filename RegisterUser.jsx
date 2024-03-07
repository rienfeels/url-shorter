import React, { useState } from "react";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        alert("User registered successfully");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegisterUser}>Register</button>
    </div>
  );
};

export default RegisterUser;
