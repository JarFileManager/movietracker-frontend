import axios from "axios";
import type { ReviewResponse } from "../types/ReviewResponse";
import type { PagedResponse } from "../types/PagedResponse";
import { API_BASE_URL } from "../config";

const BASE_URL = `${API_BASE_URL}/api/v1/reviews`;

export async function addReview(
  apiMovieId: number,
  rating: number,
  comment: string,
  movieTitle: string,
): Promise<ReviewResponse> {
  const token = localStorage.getItem("token");

  const response = await axios.post<ReviewResponse>(
    BASE_URL,
    {
      apiMovieId,
      rating,
      comment,
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

export async function getMyReviews(
  page: number,
  size: number,
): Promise<PagedResponse<ReviewResponse>> {
  const token = localStorage.getItem("token");
  const response = await axios.get<PagedResponse<ReviewResponse>>(
    `${BASE_URL}/me?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteReview(reviewId: string): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.delete(`${BASE_URL}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateReview(
  reviewId: string,
  rating: number,
  comment: string,
  movieTitle: string,
  apiMovieId: number,
): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.put(
    `${BASE_URL}/${reviewId}`,
    {
      rating,
      comment,
      movieTitle,
      apiMovieId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}