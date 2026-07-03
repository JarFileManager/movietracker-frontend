import { useState } from "react";
import type { UpdateReviewModalProps } from "../types/UpdateReviewModalProps";

function UpdateReviewModal({ initialRating, initialComment, onSubmit, onSkip }: UpdateReviewModalProps) {
  const [rating, setRating] = useState(initialRating);

  const [comment, setComment] = useState(initialComment);
  return (
    <>
      <h2>Update Review</h2>

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />

      <br />

      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

      <br />

      <button onClick={() => onSubmit(rating, comment)}>Submit</button>

      <button onClick={onSkip}>Maybe Later</button>
    </>
  );
}

export default UpdateReviewModal;
