import { useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { searchMovies } from "../services/MovieService";
import { markMovieAsWatched } from "../services/WatchedService";
import ReviewModal from "../components/ReviewModal";
import { Link } from "react-router-dom";
import { addReview } from "../services/ReviewService";

function SearchPage() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState<ApiMovieResponse[]>([]);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<ApiMovieResponse | null>(null);

  async function handleSearch() {
    try {
      const response = await searchMovies(query);

      setMovies(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleWatched(movieId: number) {
    try {
      await markMovieAsWatched(movieId);

      alert("Movie marked as watched!");
    } catch (error) {
      console.error(error);
    }
  }

 async function handleReviewSubmit(rating: number, comment: string) {
      if (selectedMovie === null) {
        return;
      }
  
      await addReview(selectedMovie.id, rating, comment);
  
      alert("Review saved!");
  
      setShowReviewModal(false);
    }
  
    function handleReviewSkip() {
      setShowReviewModal(false);
    }

  return (
    <>
      <Link to="/home">Back To Home</Link>

      <hr />
      <h1>Search Movies</h1>

      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <hr />

      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>

          <img src={movie.posterUrl} width="150" />

          <p>{movie.overview}</p>

          <button onClick={() => handleWatched(movie.id)}>Mark Watched</button>
          <button onClick={() => {
            setSelectedMovie(movie);
            setShowReviewModal(true);
          }}>
            Review Movie
          </button>

          {showReviewModal && selectedMovie && (
        <ReviewModal
          movieId={selectedMovie.id}
          onSubmit={handleReviewSubmit}
          onSkip={handleReviewSkip}
        />
      )}

          <hr />
        </div>
      ))}
    </>
  );
}

export default SearchPage;
