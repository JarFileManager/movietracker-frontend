import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { login } from "../services/AuthService";

import type { LoginRequest } from "../types/LoginRequest";

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

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function handleLogin() {
    const request: LoginRequest = {
      email,
      password,
    };

    setLoading(true);

    try {
      const response = await login(request);

      localStorage.setItem("token", response.token);

      localStorage.setItem("username", response.username);

      navigate("/home");
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Invalid email or password.");

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
            mt: 10,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" sx={{
                textAlign: "center",
              }}>
              🎬 MovieTracker
            </Typography>

            <Typography variant="body1" sx={{
                textAlign: "center",
              }}>
              Discover • Watch • Review
            </Typography>

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

            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Box sx={{
                textAlign: "center",
              }}>
              <Typography variant="body2">Don't have an account?</Typography>

              <Button component={Link} to="/signup">
                Sign Up
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

export default LoginPage;
