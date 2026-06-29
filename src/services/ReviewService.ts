import axios from "axios";
import type { ReviewResponse } from "../types/ReviewResponse";

const BASE_URL = "http://localhost:8080/api/v1/reviews";

export async function addReview(
  apiMovieId: number,
  rating: number,
  comment: string,
  movieTitle: string
): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.post(
    BASE_URL,
    {
      apiMovieId,
      rating,
      comment,
      movieTitle
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}


export async function getMyReviews(): Promise<ReviewResponse[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get<ReviewResponse[]>(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
