import axios from "axios";
import type { LoginRequest } from "../types/LoginRequest";
import type { AuthResponse } from "../types/AuthResponse";
import type { SignupRequest } from "../types/SignupRequest";
import { API_BASE_URL } from "../config";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/login`, request);

  return response.data;
}

export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${BASE_URL}/signup`, request);

  return response.data;
}
