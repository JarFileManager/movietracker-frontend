import { useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { searchMovies } from "../services/MovieService";
import { markMovieAsWatched } from "../services/WatchedService";
import ReviewModal from "../components/ReviewModal";
import { addReview } from "../services/ReviewService";
import Navbar from "../components/Navbar";

function SearchPage() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState<ApiMovieResponse[]>([]);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string | null>(null);
  const [watchedClicked, setWatchedClicked] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  async function handleSearch() {
    try {
      const response = await searchMovies(query);

      setMovies(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleWatched(movieId: number, movieTitle: string) {
    try {
      await markMovieAsWatched(movieId, movieTitle);

      alert("Movie marked as watched!");
      setWatchedClicked(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleReviewSubmit(rating: number, comment: string) {
    if (selectedMovieId === null || selectedMovieTitle === null) {
      return;
    }

    await addReview(selectedMovieId, rating, comment, selectedMovieTitle);

    alert("Review saved!");

    setShowReviewModal(false);
    setReviewSubmitted(true);
  }

  function handleReviewSkip() {
    setShowReviewModal(false);
  }

  return (
    <>
      <Navbar/>
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
          {watchedClicked === false && (
            <button onClick={() => handleWatched(movie.id, movie.title)}>
              Mark Watched
            </button>
          )}
          {reviewSubmitted === false && (
            <button
              onClick={() => {
                setSelectedMovieId(movie.id);
                setSelectedMovieTitle(movie.title);
                setShowReviewModal(true);
              }}
            >
              Review Movie
            </button>
          )}
          {showReviewModal && selectedMovieId !== null && (
            <ReviewModal
              movieId={selectedMovieId}
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
