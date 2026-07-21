import { useEffect, useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getRandomMovie } from "../services/MovieService";
import { markMovieAsWatched, getWatchedMovies } from "../services/WatchedService";
import MovieOfDayModal from "../components/MovieOfDayModal";
import { addReview, getMyReviews, updateReview } from "../services/ReviewService";
import Navbar from "../components/Navbar";
import MovieSection from "../components/MovieSection";
import {getTrendingMovies, getTopRatedMovies, getNowPlayingMovies, getTrendingTvShows} from "../services/MovieService";
import ReviewDialog from "../components/ReviewDialog";
import { Snackbar, Alert, CircularProgress, Box, Typography, Container} from "@mui/material";
import MovieDetailsModal from "../components/MovieDetailsModal";
import type { ReviewResponse } from "../types/ReviewResponse";

import { addToWatchlist, getMyWatchlist, removeFromWatchlist } from "../services/WatchlistService";

function HomePage() {
  const username = localStorage.getItem("username");

  const [movie, setMovie] = useState<ApiMovieResponse | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<ApiMovieResponse | null>(null);

  const [watchedMovieIds, setWatchedMovieIds] = useState<Set<number>>(new Set());

  const [reviewedMovieIds, setReviewedMovieIds] = useState<Set<number>>(new Set());
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

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

  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(null);

  const [watchlistMovieIds, setWatchlistMovieIds] = useState<Set<number>>(new Set());

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
        const [trending, topRated, nowPlaying, tv, watched, reviewResponse, watchlistResponse] =
          await Promise.all([
            getTrendingMovies(),
            getTopRatedMovies(),
            getNowPlayingMovies(),
            getTrendingTvShows(),
            getWatchedMovies(),
            getMyReviews(0, 1000),
            getMyWatchlist()
          ]);

        setTrendingMovies(trending);
        setTopRatedMovies(topRated);
        setNowPlayingMovies(nowPlaying);
        setTrendingTvShows(tv);
        setWatchedMovieIds(new Set(watched.map((movie) => movie.apiMovieId)));
        setReviewedMovieIds(new Set(reviewResponse.content.map((review) => review.apiMovieId)));
        setReviews(reviewResponse.content);

        setWatchlistMovieIds(new Set(watchlistResponse.map((movie) => movie.apiMovieId)));

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

  async function handleMarkWatched() {
  if (selectedMovie == null) {
    return;
  }

  try {
    await markMovieAsWatched(
      selectedMovie.id,
      selectedMovie.title,
    );

    setWatchedMovieIds((prev) => {
      const updated = new Set(prev);

      updated.add(selectedMovie.id);

      return updated;
    });

    setSnackbarMessage("Movie marked as watched!");

    setSnackbarOpen(true);
  } catch (error) {
    console.error(error);
  }
}

  async function handleAddToWatchlist() {
    if (selectedMovie == null) {
      return;
    }

    try {
      await addToWatchlist(
        selectedMovie.id,
        selectedMovie.title,
      );

      setWatchlistMovieIds((prev) => {
        const updated = new Set(prev);

        updated.add(selectedMovie.id);

        return updated;
      });

      setSnackbarMessage("Added to watchlist!");

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveFromWatchlist() {
    if (selectedMovie == null) {
      return;
    }

    try {
      await removeFromWatchlist(selectedMovie.id);

      setWatchlistMovieIds((prev) => {
        const updated = new Set(prev);

        updated.delete(selectedMovie.id);

        return updated;
      });

      setSnackbarMessage("Removed from watchlist!");

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleReviewClick() {
  if (selectedMovie == null) {
    return;
  }

  const existingReview = reviews.find(
    (review) => review.apiMovieId === selectedMovie.id,
  );

  setSelectedReview(existingReview ?? null);

  setShowReviewModal(true);
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
    const reviewMovie = selectedMovie ?? movie;

    if (reviewMovie == null) {
      return;
    }

    try {
      if (selectedReview == null) {
        await addReview(reviewMovie.id, rating, comment, reviewMovie.title);

        const newReview: ReviewResponse = {
          id: "12345", //This is placeholder, the actual ID will be generated by the backend.
          apiMovieId: reviewMovie.id,
          movieTitle: reviewMovie.title,
          rating,
          comment,
          createdAt: new Date().toISOString(),
        };

        setReviews((prev) => [...prev, newReview]);

        setReviewedMovieIds((prev) => {
          const updated = new Set(prev);

          updated.add(reviewMovie.id);

          return updated;
        });
      } else {
        await updateReview(
          selectedReview.id,
          rating,
          comment,
          selectedReview.movieTitle,
          selectedReview.apiMovieId,
        );

        setReviews((prev) =>
          prev.map((review) =>
            review.id === selectedReview.id
              ? {
                  ...review,
                  rating,
                  comment,
                }
              : review,
          ),
        );
      }

      setSnackbarMessage("Review saved!");

      setSnackbarOpen(true);

      setSelectedReview(null);

      setSelectedMovie(null);

      setShowReviewModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleReviewSkip() {
    setSelectedReview(null);
    setShowReviewModal(false);
  }

const [loadingMessage] = useState(() => {
  const loadingMessages = [
    "🎬 Spinning up magic...",
    "🍿 Buttering the popcorn...",
    "🎥 Finding today's masterpiece...",
    "🦸 Calling Christopher Nolan...",
    "📺 Asking IMDb politely...",
    "🤖 Convincing AI this isn't Netflix...",
    "💩 Wait I have diarrhea...",
    "🐢 TMDB is running on Internet Explorer...",
    "🚀 Launching movies into orbit...",
    "🍕 Ordering pizza before the movie starts...",
    "🌵 Taking out the thorns from my behind.."
  ];

  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
});


  if (movie === null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CircularProgress size={55} />

        <Typography variant="h6">{loadingMessage}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box
          sx={{
            mt: 4,
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            👋 Good Evening, {username}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Ready for today's movie?
          </Typography>
        </Box>
      </Container>

      <hr />

      {showModal && (
        <MovieOfDayModal
          movie={movie}
          onYes={handleYes}
          onNo={handleNo}
          onSkip={handleSkip}
        />
      )}

      <MovieSection
        title="🔥 Trending Movies"
        movies={trendingMovies}
        onMovieClick={setSelectedMovie}
      />

      <MovieSection
        title="🍿 Now Playing"
        movies={nowPlayingMovies}
        onMovieClick={setSelectedMovie}
      />

      <MovieSection
        title="⭐ Top Rated Movies"
        movies={topRatedMovies}
        onMovieClick={setSelectedMovie}
      />

      <MovieSection
        title="📺 Trending TV"
        movies={trendingTvShows}
        onMovieClick={setSelectedMovie}
      />

      <ReviewDialog
        open={showReviewModal}
        title={selectedReview ? "Update Review" : "Review Movie"}
        initialRating={selectedReview?.rating}
        initialComment={selectedReview?.comment}
        onSubmit={handleReviewSubmit}
        onSkip={handleReviewSkip}
      />

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          showActions={true}
          watched={watchedMovieIds.has(selectedMovie.id)}
          reviewed={reviewedMovieIds.has(selectedMovie.id)}
          onMarkWatched={handleMarkWatched}
          onReview={handleReviewClick}
          watchlisted={watchlistMovieIds.has(selectedMovie.id)}
          onAddToWatchlist={handleAddToWatchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
      )}

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
