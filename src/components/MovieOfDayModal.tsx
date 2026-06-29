import type { ApiMovieResponse } from "../types/ApiMovieResponse";

interface MovieOfDayModalProps {
  movie: ApiMovieResponse;

  onYes: (movieId: number, movieTitle: string) => Promise<void>;

  onNo: () => Promise<void>;

  onSkip: () => void;
}

function MovieOfDayModal({ movie, onYes, onNo, onSkip }: MovieOfDayModalProps) {
  return (
    <>
      <h2>🎬 Movie Of The Day</h2>

      <img src={movie.posterUrl} width="200" />

      <h3>{movie.title}</h3>

      <p>{movie.overview}</p>

      <button onClick={() => onYes(movie.id, movie.title)}>YES</button>

      <button onClick={onNo}>NO</button>

      <button onClick={onSkip}>SKIP</button>
    </>
  );
}

export default MovieOfDayModal;
