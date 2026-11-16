import './App.css'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'

import Home from './pages/Home'
import Notices from './pages/Notices'
import Events from './pages/Events'
import StudentHub from './pages/StudentHub'
import Login from './pages/Login'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <div className="app">

        <nav className="navbar">
          <h2>CampusConnect<span>.</span></h2>

          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/notices" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Notices
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Events
            </NavLink>
            <NavLink to="/student-hub" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Student Hub
            </NavLink>
          </div>

          {isLoggedIn ? (
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('student')
                setIsLoggedIn(false)
                window.location.href = '/login'
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login / Register
            </Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/events" element={<Events />} />
          <Route
            path="/student-hub"
            element={isLoggedIn ? <StudentHub /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>CampusConnect<span>.</span></h3>
              <p>Your digital campus companion.</p>
              <p>Learn, participate and connect with your student community.</p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/notices">Notices</Link>
              <Link to="/events">Events</Link>
              <Link to="/student-hub">Student Hub</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 CampusConnect. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  )
}

export default App