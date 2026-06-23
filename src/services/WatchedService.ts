import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/watched";

export async function markMovieAsWatched(apiMovieId: number): Promise<void> {
  const token = localStorage.getItem("token");

  await axios.post(
    BASE_URL,
    {
      apiMovieId: apiMovieId,
      watched: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
