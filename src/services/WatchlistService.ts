import axios from "axios";

import type { WatchlistResponse } from "../types/WatchlistResponse";
import { API_BASE_URL } from "../config";
import type { PagedResponse } from "../types/PagedResponse";

const BASE_URL = `${API_BASE_URL}/api/v1/watchlist`;

export async function addToWatchlist(
  movieId: number,
  movieTitle: string,
): Promise<WatchlistResponse> {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}`,
    {
      apiMovieId: movieId,
      movieTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getMyWatchlist(page: number, size: number): Promise<PagedResponse<WatchlistResponse>> {
  const token = localStorage.getItem("token");
  const response = await axios.get<PagedResponse<WatchlistResponse>>(
    `${BASE_URL}/me?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function removeFromWatchlist(movieId: number): Promise<string> {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${BASE_URL}/remove/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
