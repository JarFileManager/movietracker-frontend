import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/reviews";

export async function addReview(
  apiMovieId: number,
  rating: number,
  comment: string,
): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.post(
    BASE_URL,
    {
      apiMovieId,
      rating,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
