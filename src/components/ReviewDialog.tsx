import { useEffect, useState } from "react";

import type { ReviewModalProps } from "../types/ReviewModalProps";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
} from "@mui/material";

function ReviewDialog({
  open,
  title = "Add Review",
  initialRating = 3,
  initialComment = "",
  onSubmit,
  onSkip,
}: ReviewModalProps) {
  const [rating, setRating] = useState(initialRating);

  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setRating(initialRating);

    setComment(initialComment);
  }, [open, initialRating, initialComment]);

  return (
    <Dialog
      open={open}
      onClose={onSkip}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Rating
            value={rating}
            onChange={(_, value) =>
              setRating(value ?? 1)
            }
          />

          <TextField
            label="Comment"

            multiline

            rows={4}

            value={comment}

            onChange={(e) =>
              setComment(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onSkip}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            onSubmit(rating, comment)
          }
        >
          Save Review
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewDialog;