import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute, { PublicRoute } from './components/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Policies from './pages/Policies'
import Claims from './pages/Claims'

// Layout
const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container-custom py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <Routes>
              {/* Landing Page */}
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Landing />
                  </AppLayout>
                }
              />

              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <AppLayout>
                      <Login />
                    </AppLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <AppLayout>
                      <Register />
                    </AppLayout>
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/policies"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Policies />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/claims"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Claims />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
