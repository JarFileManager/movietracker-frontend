import { useState } from "react";

import Navbar from "../components/Navbar";
import ReviewModal from "../components/ReviewModal";

import type { ApiMovieResponse } from "../types/ApiMovieResponse";

import { searchMovies } from "../services/MovieService";
import { markMovieAsWatched, getWatchedMovies } from "../services/WatchedService";
import { addReview, getMyReviews } from "../services/ReviewService";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

function SearchPage() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState<ApiMovieResponse[]>([]);

  const [loading, setLoading] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string | null>(
    null
  );

  const [watchedMovieIds, setWatchedMovieIds] = useState<Set<number>>(new Set());

  const [reviewedMovieIds, setReviewedMovieIds] = useState<Set<number>>(new Set());

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function handleSearch() {
    if (query.trim() === "") {
      return;
    }

    setLoading(true);

    try {
      const [searchResponse, watchedResponse, reviewResponse] =
        await Promise.all([
          searchMovies(query),

          getWatchedMovies(),

          getMyReviews(),
        ]);

      setMovies(searchResponse);
      setWatchedMovieIds(new Set(watchedResponse.map((movie) => movie.apiMovieId)));
      setReviewedMovieIds(new Set(reviewResponse.map((review) => review.apiMovieId)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleWatched(movieId: number, movieTitle: string) {
    try {
      await markMovieAsWatched(movieId, movieTitle);

      setWatchedMovieIds((prev) => {
        const updated = new Set(prev);

        updated.add(movieId);

        return updated;
      });

      setSnackbarMessage("Movie marked as watched!");

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleReviewSubmit(rating: number, comment: string) {
    if (selectedMovieId === null || selectedMovieTitle === null) {
      return;
    }

    try {
      await addReview(
        selectedMovieId,
        rating,
        comment,
        selectedMovieTitle
      );

      setSnackbarMessage("Review saved successfully!");

      setSnackbarOpen(true);

      setShowReviewModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleReviewSkip() {
    setShowReviewModal(false);
  }

  return (
    <>
      <Navbar />

      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">Search Movies</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            label="Search Movie"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          movies.map((movie) => (
            <Box key={movie.id}>
              <Typography variant="h5">{movie.title}</Typography>

              <img src={movie.posterUrl} width="150" />

              <Typography sx={{ mt: 2 }}>{movie.overview}</Typography>

              <Box sx={{ mt: 2 }}>
                {watchedMovieIds.has(movie.id) ? (
                  <Button variant="contained" color="success" disabled>
                    ✓ Watched
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleWatched(movie.id, movie.title)}
                  >
                    Mark Watched
                  </Button>
                )}

                {reviewedMovieIds.has(movie.id) ? (
                  <Button variant="outlined">Update Review</Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedMovieId(movie.id);

                      setSelectedMovieTitle(movie.title);

                      setShowReviewModal(true);
                    }}
                  >
                    Review Movie
                  </Button>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />
            </Box>
          ))
        )}

        {showReviewModal && selectedMovieId !== null && (
          <ReviewModal
            movieId={selectedMovieId}
            onSubmit={handleReviewSubmit}
            onSkip={handleReviewSkip}
          />
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SearchPage;