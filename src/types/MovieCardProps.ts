import type { ApiMovieResponse } from "../types/ApiMovieResponse";

export interface MovieCardProps {
  movie: ApiMovieResponse;
  onWatched: (movieId: number) => Promise<void>;
}
