import { useState } from "react";
import type { ReviewModalProps } from "../types/ReviewModalProps";

function ReviewModal({ onSubmit, onSkip }: ReviewModalProps) {
  const [rating, setRating] = useState(1);

  const [comment, setComment] = useState("");
  return (
    <>
      <h2>Add Review</h2>

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

export default ReviewModal;
