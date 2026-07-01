import type { ApiMovieResponse } from "../types/ApiMovieResponse";

interface MovieSectionProps {
  title: string;

  movies: ApiMovieResponse[];
}

function MovieSection({
  title,

  movies,
}: MovieSectionProps) {
  return (
    <>
      <h2>{title}</h2>

      <hr />

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={movie.posterUrl} width="120" />

            <h4>{movie.title}</h4>

            <p>⭐ {movie.rating}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieSection;
