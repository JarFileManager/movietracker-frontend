import { useEffect, useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getRandomMovie } from "../services/MovieService";
import { markMovieAsWatched } from "../services/WatchedService";
import MovieOfDayModal from "../components/MovieOfDayModal";
import ReviewModal from "../components/ReviewModal";
import { addReview } from "../services/ReviewService";
import Navbar from "../components/Navbar";

function HomePage() {
  const username = localStorage.getItem("username");

  const [movie, setMovie] = useState<ApiMovieResponse | null>(null);

  const [showModal, setShowModal] = useState(
    localStorage.getItem("movieOfDaySeen") !== "true",
  );

  const [noCount, setNoCount] = useState(0);

  const [showReviewModal, setShowReviewModal] = useState(false);

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

  async function handleYes(movieId: number) {
    try {
      await markMovieAsWatched(movieId);

      alert("Movie marked as watched!");

      setShowModal(false);
      localStorage.setItem("movieOfDaySeen", "true");
      setShowReviewModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNo() {
    if (noCount >= 4) {
      alert("Looks like you haven't watched many of these 😂");

      setShowModal(false);
      localStorage.setItem("movieOfDaySeen", "true");

      return;
    }

    setNoCount((prev) => prev + 1);

    try {
      const randomMovie = await getRandomMovie();

      setMovie(randomMovie);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSkip() {
    setShowModal(false);
    localStorage.setItem("movieOfDaySeen", "true");
  }

  async function handleReviewSubmit(rating: number, comment: string) {
    if (movie === null) {
      return;
    }

    await addReview(movie.id, rating, comment);

    alert("Review saved!");

    setShowReviewModal(false);
  }

  function handleReviewSkip() {
    setShowReviewModal(false);
  }

  if (movie === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
     <Navbar/>
      <h1>Home Page</h1>

      <h2>Welcome, {username?.toUpperCase() ?? "Guest"}!</h2>

      <hr />

      {showModal && (
        <MovieOfDayModal
          movie={movie}
          onYes={handleYes}
          onNo={handleNo}
          onSkip={handleSkip}
        />
      )}

      {showReviewModal && movie && (
        <ReviewModal
          movieId={movie.id}
          onSubmit={handleReviewSubmit}
          onSkip={handleReviewSkip}
        />
      )}

      <br />
    </>
  );
}

export default HomePage;
