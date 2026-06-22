import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getRandomMovie } from "../services/MovieService";
import MovieCard from "../components/MovieCard";

function HomePage() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [movie, setMovie] = useState<ApiMovieResponse | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await getRandomMovie();

        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  if (movie === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Home Page</h1>
      <h2>Welcome, {username?.toUpperCase() ?? "Guest"}!</h2>
      <hr />

      <h2>Random Movie</h2>

      <MovieCard movie={movie} />

      <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default HomePage;
