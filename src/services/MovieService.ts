import axios from "axios";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";

const BASE_URL = "http://localhost:8080/api/v1/movies";

export async function getRandomMovie(): Promise<ApiMovieResponse> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse>(`${BASE_URL}/random`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
