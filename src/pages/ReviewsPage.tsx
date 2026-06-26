import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import type { ReviewResponse } from "../types/ReviewResponse";

import { getMyReviews, deleteReview } from "../services/ReviewService";

function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await getMyReviews();

        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Call the delete review service function here
      await deleteReview(reviewId);

      // Update the reviews state after deletion
        setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
}

  return (
    <>
      <Navbar />

      <h1>My Reviews</h1>

      <hr />

      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <h3>Movie Id: {review.apiMovieId}</h3>

            <p>Rating: {review.rating}</p>

            <p>Comment: {review.comment}</p>
            
            <p>Added On: {review.createdAt}</p>

            <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>

            <hr />
          </div>
        ))
      )}
    </>
  );
}

export default ReviewsPage;
