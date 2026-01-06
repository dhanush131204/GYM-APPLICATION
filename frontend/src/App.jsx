import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Pages
import Landing from "./pages/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Diet from "./pages/Diet";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import ExerciseDetail from "./pages/ExerciseDetail";
import MemberPlans from "./components/dashboard/MemberPlans";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// 🔐 Private Route
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};


const AppRoutes = () => {
  const { user, loading } = useAuth();


  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <PrivateRoute>
            <Workouts />
          </PrivateRoute>
        }
      />
      <Route
        path="/diet"
        element={
          <PrivateRoute>
            <Diet />
          </PrivateRoute>
        }
      />
      <Route
        path="/community"
        element={
          <PrivateRoute>
            <Community />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/exercises"
        element={
          <PrivateRoute>
            <ExerciseLibrary />
          </PrivateRoute>
        }
      />
      <Route
        path="/exercises/:id"
        element={
          <PrivateRoute>
            <ExerciseDetail />
          </PrivateRoute>
        }
      />


      <Route
        path="/plans"
        element={
          <PrivateRoute>
            <MemberPlans />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#0F172A',
                    color: '#fff',
                    border: '1px solid #1e293b',
                    padding: '16px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  },
                  success: {
                    iconTheme: {
                      primary: '#8b5cf6',
                      secondary: '#fff',
                    },
                    style: {
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }
                  },
                  error: {
                    iconTheme: {
                      primary: '#f59e0b',
                      secondary: '#fff',
                    },
                    style: {
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      color: '#fcd34d'
                    }
                  },
                }}
              />
            </div>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
