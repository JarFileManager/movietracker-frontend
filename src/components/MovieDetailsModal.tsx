import type { ApiMovieResponse } from "../types/ApiMovieResponse";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CardMedia, Rating, Stack } from "@mui/material";

interface MovieDetailsModalProps {
  movie: ApiMovieResponse;

  onClose: () => void;

  showActions?: boolean;

  watched?: boolean;

  reviewed?: boolean;

  onMarkWatched?: () => void;

  onReview?: () => void;

  watchlisted?: boolean;

  onAddToWatchlist?: () => void;

  onRemoveFromWatchlist?: () => void;
}

function MovieDetailsModal({ movie, onClose, showActions = false, watched = false, reviewed = false, watchlisted = false, onMarkWatched, onReview, onAddToWatchlist, onRemoveFromWatchlist }: MovieDetailsModalProps) {

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{movie.title}</DialogTitle>
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
            <Typography>{movie.overview}</Typography>

            <Typography>
              Release Date:
              {movie.releaseDate}
            </Typography>

            <Rating value={movie.rating / 2} precision={0.5} readOnly />
            <Typography variant="body2">
              TMDB Rating: {movie.rating.toFixed(1)} / 10
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          py: 2,
        }}
      >
        {showActions && (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" disabled={watched} onClick={onMarkWatched}>
              {watched ? "✓ Watched" : "Mark Watched"}
            </Button>

            <Button variant="outlined" onClick={onReview}>
              {reviewed ? "Update Review" : "Review"}
            </Button>

            <Button
              variant="outlined"
              color={watchlisted ? "error" : "primary"}
              onClick={
                watchlisted
                  ? onRemoveFromWatchlist
                  : onAddToWatchlist
              }
            >
              {watchlisted
                ? "❤️ Remove from Watchlist"
                : "🤍 Add to Watchlist"}
            </Button>
            
          </Stack>
        )}

        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieDetailsModal;
