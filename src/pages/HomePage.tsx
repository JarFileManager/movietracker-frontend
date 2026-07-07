import { useEffect, useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getRandomMovie } from "../services/MovieService";
import { markMovieAsWatched } from "../services/WatchedService";
import MovieOfDayModal from "../components/MovieOfDayModal";
import { addReview } from "../services/ReviewService";
import Navbar from "../components/Navbar";
import MovieSection from "../components/MovieSection";
import {getTrendingMovies, getTopRatedMovies, getNowPlayingMovies, getTrendingTvShows} from "../services/MovieService";
import ReviewDialog from "../components/ReviewDialog";
import { Snackbar, Alert} from "@mui/material";

function HomePage() {
  const username = localStorage.getItem("username");

  const [movie, setMovie] = useState<ApiMovieResponse | null>(null);

  const [showModal, setShowModal] = useState(
    localStorage.getItem("movieOfDaySeen") !== "true",
  );

  const [noCount, setNoCount] = useState(0);

  const [showReviewModal, setShowReviewModal] = useState(false);

  //New States
  const [trendingMovies, setTrendingMovies] = useState<ApiMovieResponse[]>([]);

  const [topRatedMovies, setTopRatedMovies] = useState<ApiMovieResponse[]>([]);

  const [nowPlayingMovies, setNowPlayingMovies] = useState<ApiMovieResponse[]>([]);

  const [trendingTvShows, setTrendingTvShows] = useState<ApiMovieResponse[]>([]);

  const [snackbarOpen,setSnackbarOpen]= useState(false);

  const [snackbarMessage,setSnackbarMessage]= useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await getRandomMovie();

        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchHomeSections() {
      try {
        const [trending, topRated, nowPlaying, tv] = await Promise.all([
          getTrendingMovies(),

          getTopRatedMovies(),

          getNowPlayingMovies(),

          getTrendingTvShows(),
        ]);

        setTrendingMovies(trending);
        setTopRatedMovies(topRated);
        setNowPlayingMovies(nowPlaying);
        setTrendingTvShows(tv);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
    fetchHomeSections();
  }, []);

  async function handleYes(movieId: number, movieTitle: string) {
    try {
      await markMovieAsWatched(movieId, movieTitle);

      setSnackbarMessage("Movie marked as watched!");

      setSnackbarOpen(true);

      setShowModal(false);
      localStorage.setItem("movieOfDaySeen", "true");
      setShowReviewModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNo() {
    if (noCount >= 4) {
      setSnackbarMessage("Looks like you haven't watched many of these 😂");

      setSnackbarOpen(true);

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

    await addReview(movie.id, rating, comment, movie.title);

    setSnackbarMessage("Review saved!");

    setSnackbarOpen(true);

    

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
      <Navbar />
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

      <MovieSection title="🔥 Trending Movies" movies={trendingMovies} />

      <MovieSection title="🍿 Now Playing" movies={nowPlayingMovies} />

      <MovieSection title="⭐ Top Rated Movies" movies={topRatedMovies} />

      <MovieSection title="📺 Trending TV" movies={trendingTvShows} />

      <ReviewDialog
        open={showReviewModal}
        title="Review Movie"
        onSubmit={handleReviewSubmit}
        onSkip={handleReviewSkip}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <br />
    </>
  );
}

export default HomePage;
