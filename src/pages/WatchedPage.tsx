import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import type { WatchedMovieResponse } from "../types/WatchedMovieResponse";
import { getWatchedMovies, unwatchTheMovie } from "../services/WatchedService";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getMovie } from "../services/MovieService";
import MovieDetailsModal from "../components/MovieDetailsModal";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";

function WatchedPage() {
  const [movies, setMovies] = useState<WatchedMovieResponse[]>([]);
  const [selectedMovie, setSelectedMovie] =
    useState<ApiMovieResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await getWatchedMovies();

        setMovies(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const handleUnwatch = async (apiMovieId: number) => {
    try {
      await unwatchTheMovie(apiMovieId);

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.apiMovieId !== apiMovieId)
      );

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = async (apiMovieId: number) => {
    try {
      const movie = await getMovie(apiMovieId);

      setSelectedMovie(movie);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 8,
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography variant="h4">My Watched Movies</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {movies.length === 0 ? (
          <Typography variant="body1">
            You haven't watched any movies yet.
          </Typography>
        ) : (
          movies.map((movie) => (
            <div key={movie.id}>
              <Typography variant="h6">{movie.movieTitle}</Typography>

              <Typography>
                Added On: {new Date(movie.createdAt).toLocaleDateString()}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUnwatch(movie.apiMovieId)}
                >
                  Unwatch
                </Button>

                <Button
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={() => handleViewDetails(movie.apiMovieId)}
                >
                  View Details
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />
            </div>
          ))
        )}

        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Movie removed successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default WatchedPage;