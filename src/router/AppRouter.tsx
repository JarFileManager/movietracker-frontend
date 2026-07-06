import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";

import SearchPage from "../pages/SearchPage";
import WatchedPage from "../pages/WatchedPage";
import ReviewsPage from "../pages/ReviewsPage";
import PreferencesPage from "../pages/PreferencesPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watched"
          element={
            <ProtectedRoute>
              <WatchedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <ReviewsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
