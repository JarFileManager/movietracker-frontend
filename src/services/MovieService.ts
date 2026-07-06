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

export async function searchMovies(query: string): Promise<ApiMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse[]>(`${BASE_URL}/search`, {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getMovie(movieId: number): Promise<ApiMovieResponse> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse>(`${BASE_URL}/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTrendingMovies(): Promise<ApiMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse[]>(`${BASE_URL}/trending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTopRatedMovies(): Promise<ApiMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse[]>(`${BASE_URL}/top-rated`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getNowPlayingMovies(): Promise<ApiMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse[]>(
    `${BASE_URL}/now-playing`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getTrendingTvShows(): Promise<ApiMovieResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiMovieResponse[]>(
    `${BASE_URL}/trending-tv`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
