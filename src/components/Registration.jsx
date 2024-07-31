"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../CSS/Login.css";
import { useRouter } from "next/navigation";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Registration = () => {
  const [passType, setPassType] = useState("password");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(credentials);
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch (error) {
            throw new Error("Invalid JSON response from server");
          }
        } else {
          errorData = await response.text();
        }
        throw new Error(errorData.message || "An error occurred");
      }
  
      let data;
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (error) {
          throw new Error("Failed to parse JSON response");
        }
      } else {
        data = await response.text();
      }
  
      console.log(data);
      // Handle successful response, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error("Error:", error);
      // Display error to the user in a user-friendly way
    }
  };
  const login = (e)=>{
    e.preventDefault();
    router.push('/');
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setPassType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div>
      <div className="Container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>
            Welcome to <span>Workflo</span>!
          </h1>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={credentials.name}
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={onChange}
          />
          <div className="password-container">
            <input
              type={passType}
              name="password"
              placeholder="Password"
              className="password-input"
              value={credentials.password}
              onChange={onChange}
            />
            <span onClick={togglePassword} className="password-icon">
              {passType === "password" ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          <button onClick={login}>Submit</button>
          <p>
            Already have an account?
            <Link href="/">Log In.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
