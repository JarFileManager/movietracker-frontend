import type { ApiMovieResponse } from "../types/ApiMovieResponse";

import { Box, Card, CardMedia, CardContent, Typography, Rating } from "@mui/material";

interface MovieSectionProps {
  title: string;

  movies: ApiMovieResponse[];

  onMovieClick: (movie: ApiMovieResponse) => void;
}

function MovieSection({
  title,

  movies,

  onMovieClick
}: MovieSectionProps) {

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",

          gap: 2,

          overflowX: "auto",

          pb: 2,
        }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            sx={{
              minWidth: 220,

              maxWidth: 220,

              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              height="330"
              image={movie.posterUrl}
              alt={movie.title}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => onMovieClick(movie)}
            />

            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>

              <Rating value={movie.rating / 2} precision={0.5} readOnly />
              <Typography variant="body2">
                TMDB Rating: {movie.rating.toFixed(1)} / 10
              </Typography>

              <Typography variant="body2">{movie.releaseDate}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default MovieSection;
