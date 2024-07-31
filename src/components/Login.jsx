"use client";
import React from "react";
import "../CSS/Login.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the authtoken and redirect
      localStorage.setItem("token", json.authtoken);
      router.push("/dashboard");
    } else {
      alert("invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="a">
      <div className="Container">
        <form className="form">
          <h1>
            Welcome to <span>Workflo</span>!
          </h1>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={credentials.email}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={onChange}
          />
          <button onClick={handleSubmit}>Submit</button>
          <p>
            Don't have an account?  
            <Link href="/Registration">Create a new account.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
