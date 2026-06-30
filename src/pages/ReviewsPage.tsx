import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import type { ReviewResponse } from "../types/ReviewResponse";

import { getMyReviews, deleteReview } from "../services/ReviewService";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getMovie } from "../services/MovieService";
import MovieDetailsModal from "../components/MovieDetailsModal";

function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ApiMovieResponse | null>(null);

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

const handleViewDetails = async (apiMovieId: number) => {
  try {
    const movie = await getMovie(apiMovieId);

    setSelectedMovie(movie);
  } catch (error) {
    console.error(error);
  }
};

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
            <h3>{review.movieTitle}</h3>

            <p>Rating: {review.rating}</p>

            <p>Comment: {review.comment}</p>

            <p>Added On: {new Date(review.createdAt).toLocaleDateString()}</p>

            <button onClick={() => handleDeleteReview(review.id)}>
              Delete Review
            </button>

            <button onClick={() => handleViewDetails(review.apiMovieId)}>
              {" "}
              View Details{" "}
            </button>

            <hr />
          </div>
        ))
      )}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default ReviewsPage;
