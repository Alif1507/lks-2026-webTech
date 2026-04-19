import React, { useState } from 'react'
import { useAuth } from '../lib/Auth'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await login(username, password)
    } catch (err) {
      setError(err?.response?.data?.message || "Wrong Password or Username") 
    } finally {
        setError("")
    }
  }
  return (
    <>
     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container">
          <a className="navbar-brand" href="home.html"><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header text-center" style={{ backgroundColor: "#e3f2fd" }}>
                <h1><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</h1>
              </div>
              <form className="card-body" onSubmit={handleLogin}>
                <h5 className="card-title mb-4">Login Form</h5>
                { error && <div className='btn btn-xs btn-danger'>{error}</div> }
                <div className="form-group mb-4">
                  <label htmlFor="inputEmail" className="sr-only">username</label>
                  <input onChange={(e) => setUsername(e.target.value)} value={username} type="text"  id="inputEmail" className="form-control" placeholder="username" required />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputPassword" className="sr-only">Password</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                </div>
                <div className="checkbox mb-4">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me 
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-xs btn-primary" type="submit">Sign in</button>
                </div>
              </form>
              <div className="card-footer text-body-secondary text-center">
                Copyright &copy; 2025
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Login
