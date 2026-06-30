import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import type { WatchedMovieResponse } from "../types/WatchedMovieResponse";
import { getWatchedMovies, unwatchTheMovie } from "../services/WatchedService";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getMovie } from "../services/MovieService";
import MovieDetailsModal from "../components/MovieDetailsModal";

function WatchedPage() {
  const [movies, setMovies] = useState<WatchedMovieResponse[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ApiMovieResponse | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await getWatchedMovies();

        setMovies(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

    const handleUnwatch = async (apiMovieId: number) => {
      try {
        // Call the delete review service function here
        await unwatchTheMovie(apiMovieId);
  
        // Update the reviews state after deletion
          setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.apiMovieId !== apiMovieId)
        );
      } catch (error) {
        console.error("Error deleting review:", error);
      }
  }

  const handleViewDetails = async (apiMovieId: number) => {
    try {
      const movie = await getMovie(apiMovieId);

      setSelectedMovie(movie);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Navbar />

      <h1>My Watched Movies</h1>

      <hr />

      {movies.length === 0 ? (
        <p>You haven't watched any movies yet.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.movieTitle}</h3>

            <p>Added On: {new Date(movie.createdAt).toLocaleDateString()}</p>

            <button onClick={() => handleUnwatch(movie.apiMovieId)}>
              {" "}
              Didn't Watched? Click Here
            </button>
            <button onClick={() => handleViewDetails(movie.apiMovieId)}>
              {" "}
              View Details{" "}
            </button>

            <hr />
          </div>
        ))
      )}

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default WatchedPage;
