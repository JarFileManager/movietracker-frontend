export interface ReviewModalProps {
  open: boolean;

  title?: string;

  initialRating?: number;

  initialComment?: string;

  onSubmit: (rating: number, comment: string) => Promise<void>;

  onSkip: () => void;
}
