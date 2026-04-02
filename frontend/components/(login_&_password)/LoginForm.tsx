"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { login } from "@/lib/services/auth_service";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await login(username, password);
    
    if (response.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push("/employee-dashboard");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};
  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="form__group">
        <input
          type="text"
          placeholder="Username"
          className="form__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FaUser className="form__icons" />
      </div>
      <div className="form__group">
        <input
          type="password"
          placeholder="Password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <RiLockPasswordFill className="form__icons" />
      </div>

      <Button label="Login" type="submit" modifier="button--login" />
    </form>
  );
};

export default LoginForm;
