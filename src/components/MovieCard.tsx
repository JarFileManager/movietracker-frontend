import type { MovieCardProps } from "../types/MovieCardProps";
function MovieCard({ movie, onWatched }: MovieCardProps) {
  return (
    <>
      <img src={movie.posterUrl} width="200" />

      <h2>{movie.title}</h2>

      <p>{movie.overview}</p>

      <p>Release Date: {movie.releaseDate}</p>

      <p>Rating: {movie.rating}</p>

      <button onClick={() => onWatched(movie.id)}>YES</button>
    </>
  );
}

export default MovieCard;
