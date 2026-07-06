import { useEffect, useState } from "react";

import { getPreferences, savePreferences } from "../services/PreferenceService";

import Navbar from "../components/Navbar";

import Chip from "@mui/material/Chip";

import { GENRES } from "../constants/Genres";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Slider,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

function PreferencesPage() {

  const [years, setYears] = useState<number[]>([1990, 2025]);

  const [minimumRating, setMinimumRating] = useState(7);

  const [includeAdult, setIncludeAdult] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

useEffect(() => {
  async function loadPreferences() {
    try {
      const pref = await getPreferences();

      setYears([pref.fromYear, pref.toYear]);

      setMinimumRating(pref.minimumRating);

      setIncludeAdult(pref.includeAdult);

      setSelectedGenres(pref.genreIds);
    } catch (error) {
      console.error(error);
    }
  }

  loadPreferences();
}, []);

  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">Movie Preferences</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography gutterBottom>Genres</Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 4,
          }}
        >
          {GENRES.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              clickable
              color={selectedGenres.includes(genre.id) ? "primary" : "default"}
              onClick={() => {
                if (selectedGenres.includes(genre.id)) {
                  setSelectedGenres((prev) =>
                    prev.filter((id) => id !== genre.id),
                  );
                } else {
                  setSelectedGenres((prev) => [...prev, genre.id]);
                }
              }}
            />
          ))}
        </Box>

        <Typography gutterBottom>Release Year</Typography>

        <Slider
          value={years}
          min={1950}
          max={2025}
          valueLabelDisplay="auto"
          onChange={(_, value) => setYears(value as number[])}
        />

        <Typography>
          {years[0]} - {years[1]}
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Typography gutterBottom>Minimum Rating</Typography>

          <Slider
            value={minimumRating}
            min={0}
            max={10}
            step={0.5}
            valueLabelDisplay="auto"
            onChange={(_, value) => setMinimumRating(value as number)}
          />

          <Typography>{minimumRating} ⭐</Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
              />
            }
            label="Include Adult Movies"
          />
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={async () => {
            try {
              await savePreferences({
                genreIds: selectedGenres,
                fromYear: years[0],
                toYear: years[1],
                minimumRating,
                includeAdult,
              });

              setSnackbarMessage("Preferences saved successfully!");

              setSnackbarOpen(true);
            } catch (error) {
              console.error(error);

              setSnackbarMessage("Failed to save preferences.");

              setSnackbarOpen(true);
            }
          }}
        >
          Save Preferences
        </Button>
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
    </>
  );
}

export default PreferencesPage;