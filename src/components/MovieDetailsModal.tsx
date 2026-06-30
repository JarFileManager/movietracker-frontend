import type { ApiMovieResponse } from "../types/ApiMovieResponse";

interface MovieDetailsModalProps {
  movie: ApiMovieResponse;

  onClose: () => void;
}

function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
  return (
    <>
      <hr />

      <h2>{movie.title}</h2>

      <img src={movie.posterUrl} width="200" />

      <p>{movie.overview}</p>

      <p>Rating: {movie.rating}</p>

      <p>Release Date: {movie.releaseDate}</p>

      <button onClick={onClose}>Close</button>

      <hr />
    </>
  );
}

export default MovieDetailsModal;
