import { useState } from "react";
import { login } from "../services/AuthService";
import type { LoginRequest } from "../types/LoginRequest";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {
    const request: LoginRequest = {
      email: email,

      password: password,
    };

    try {
      const response = await login(request);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Login Page</h1>

      <div>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <br />

      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default LoginPage;
