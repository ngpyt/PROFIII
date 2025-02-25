import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import BackgroundAnimation from "./components/BackgroundAnimation";
import CareerRoadmap from "./components/CareerRoadmap";
import TestLayout from "./components/test/TestLayout";
import routes from "tempo-routes";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import CareerSelection from "./components/career/CareerSelection";
import JobsPage from "./components/jobs/JobsPage";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <BackgroundAnimation />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <TestLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career-paths"
              element={
                <ProtectedRoute>
                  <CareerSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career-roadmap"
              element={
                <ProtectedRoute>
                  <CareerRoadmap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
