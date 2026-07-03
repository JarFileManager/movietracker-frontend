import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import type { ReviewResponse } from "../types/ReviewResponse";

import { getMyReviews, deleteReview, updateReview } from "../services/ReviewService";
import UpdateReviewModal from "../components/UpdateReviewModal";
import type { ApiMovieResponse } from "../types/ApiMovieResponse";
import { getMovie } from "../services/MovieService";
import MovieDetailsModal from "../components/MovieDetailsModal";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Divider,
} from "@mui/material";

function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<ApiMovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await getMyReviews();

        setReviews(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
      setSnackbarOpen(true);
      setSnackbarMessage("Review deleted successfully!");
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

async function handleUpdateReview(
  rating: number,

  comment: string,
) {
  if (selectedReview == null) {
    return;
  }

  await updateReview(
    selectedReview.id,

    rating,

    comment,

    selectedReview.movieTitle,

    selectedReview.apiMovieId,
  );

  // update state locally

  setReviews((prev) =>
    prev.map((review) => {
      if (review.id !== selectedReview.id) {
        return review;
      }

      return {
        ...review,

        rating,

        comment,
      };
    }),
  );

  setShowUpdateModal(false);
  setSnackbarMessage("Review updated successfully!");
  setSnackbarOpen(true);
}

if (loading) {
  return (
    <>
      <Navbar />

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    </>
  );
}

  return (
    <>
      <Navbar />

      <Container>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography variant="h4">My Reviews</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {reviews.length === 0 ? (
          <Typography variant="body1">
            You haven't written any reviews yet.
          </Typography>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              <Typography variant="h6">{review.movieTitle}</Typography>

              <Typography>Rating: {review.rating}</Typography>

              <Typography>Comment: {review.comment}</Typography>

              <Typography>
                Added On: {new Date(review.createdAt).toLocaleDateString()}
              </Typography>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteReview(review.id)}
              >
                Delete Review
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => {
                  setSelectedReview(review);

                  setShowUpdateModal(true);
                }}
              >
                Update Review
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleViewDetails(review.apiMovieId)}
                sx={{ ml: 2 }}
              >
                View Details
              </Button>

              <Divider sx={{ my: 2 }} />
            </div>
          ))
        )}
        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {showUpdateModal && selectedReview && (
        <UpdateReviewModal
          initialRating={selectedReview.rating}
          initialComment={selectedReview.comment}
          onSubmit={handleUpdateReview}
          onSkip={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}

export default ReviewsPage;
