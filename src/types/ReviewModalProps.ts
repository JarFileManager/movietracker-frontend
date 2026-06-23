export interface ReviewModalProps {
  movieId: number;

  onSubmit: (rating: number, comment: string) => Promise<void>;

  onSkip: () => void;
}
