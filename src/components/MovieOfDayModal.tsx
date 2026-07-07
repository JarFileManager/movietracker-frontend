import { useState } from "react";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";

import {
  Button,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

interface MovieOfDayModalProps {
  movie: ApiMovieResponse;

  onYes: (movieId: number, movieTitle: string) => Promise<void>;

  onNo: () => Promise<void>;

  onSkip: () => void;
}

function MovieOfDayModal({ movie, onYes, onNo, onSkip }: MovieOfDayModalProps) {
  const [loadingNextMovie, setLoadingNextMovie] = useState(false);

  const [loadingYes, setLoadingYes] = useState(false);

  return (
    <Dialog open={true} maxWidth="md" fullWidth onClose={onSkip}>
      <DialogTitle>🎬 Movie of the Day</DialogTitle>

      <DialogContent>
        <Stack direction="row" spacing={3}>
          <CardMedia
            component="img"
            image={movie.posterUrl}
            sx={{
              width: 220,
              borderRadius: 2,
            }}
          />

          <Stack spacing={2}>
            <Typography variant="h5">{movie.title}</Typography>

            <Typography>{movie.overview}</Typography>

            <Typography>Release Date: {movie.releaseDate}</Typography>

            <Rating value={movie.rating / 2} precision={0.5} readOnly />

            <Typography variant="body2">
              TMDB Rating: {movie.rating.toFixed(1)} / 10
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Have you watched this movie?
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          disabled={loadingNextMovie || loadingYes}
          onClick={onSkip}
        >
          Maybe Later
        </Button>

        <Button
          color="error"
          variant="outlined"
          disabled={loadingNextMovie || loadingYes}
          onClick={async () => {
            setLoadingNextMovie(true);

            try {
              await onNo();
            } finally {
              setLoadingNextMovie(false);
            }
          }}
        >
          {loadingNextMovie ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "No"
          )}
        </Button>

        <Button
          variant="contained"
          disabled={loadingNextMovie || loadingYes}
          onClick={async () => {
            setLoadingYes(true);

            try {
              await onYes(movie.id, movie.title);
            } finally {
              setLoadingYes(false);
            }
          }}
        >
          {loadingYes ? <CircularProgress size={20} color="inherit" /> : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieOfDayModal;
