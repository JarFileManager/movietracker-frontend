import axios from "axios";
import type { WatchedMovieResponse } from "../types/WatchedMovieResponse";

const BASE_URL = "http://localhost:8080/api/v1/watched";

export async function markMovieAsWatched(apiMovieId: number, movieTitle: string): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.post(
    BASE_URL,
    {
      apiMovieId: apiMovieId,
      movieTitle: movieTitle
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function getWatchedMovies(): Promise<WatchedMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<WatchedMovieResponse[]>(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function unwatchTheMovie(apiMovieId: number): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.delete(`${BASE_URL}/${apiMovieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
