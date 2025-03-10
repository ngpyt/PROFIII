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
import ExcursionsPage from "./components/excursions/ExcursionsPage";
import EmployerProfile from "./components/employer/EmployerProfile";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <div>
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
            <Route
              path="/excursions"
              element={
                <ProtectedRoute>
                  <ExcursionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer-profile"
              element={
                <ProtectedRoute>
                  <EmployerProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </div>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
