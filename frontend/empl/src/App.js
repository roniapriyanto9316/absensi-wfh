import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { CContainer, CSpinner } from "@coreui/react"

import AppHeader from "./components/AppHeader"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
import Profile from "./pages/Profile"

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="d-flex">
                <div className="wrapper flex-grow-1">
                  <AppHeader />
                  <CContainer fluid className="p-4">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<p>404 Page Not Found</p>} />
                    </Routes>
                  </CContainer>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App;