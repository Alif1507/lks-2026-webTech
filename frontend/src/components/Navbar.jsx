import React from 'react'
import { useAuth } from '../lib/Auth'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();
  const { navigate } = useNavigate()

  const handleLogout = () => {
    try {
      logout()
    } catch (_) {
      //
    } finally {
      navigate("/")
    }
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#e3f2fd" }}>
        <div className="container">
          <a className="navbar-brand" href="home.html"><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home"><i className="fa-solid fa-xs fa-house"></i> Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/schedule" className="nav-link" ><i className="fa-solid fa-xs fa-calendar-days"></i> Schedules</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-xs fa-rectangle-list"></i> Master
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/doctor"  className="dropdown-item"><i className="fa-solid fa-xs fa-user-doctor"></i> Doctors</Link></li>
                  <li><Link to="/department" className="dropdown-item" ><i className="fa-solid fa-xs fa-building"></i> Poliklinik</Link></li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text">
              <button onClick={handleLogout} className="nav-link active" aria-current="page" href="login.html"><i className="fa-solid fa-xs fa-sign-out"></i> Logout</button>
            </span>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
