import axios from "axios";
import type { LoginRequest } from "../types/LoginRequest";
import type { AuthResponse } from "../types/AuthResponse";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/login`, request);

  return response.data;
}
