import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signup } from "../services/AuthService";
import type { SignupRequest } from "../types/SignupRequest";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function handleSignup() {
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setSnackbarMessage("Please fill all fields.");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarOpen(true);
      return;
    }

    const request: SignupRequest = {
      username,
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await signup(request);

      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);

      navigate("/home");
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Unable to create account.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
              }}
            >
              🎬 MovieTracker
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              Create your account
            </Typography>

            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleSignup}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="body2">Already have an account?</Typography>

              <Button component={Link} to="/login">
                Login
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignupPage;
