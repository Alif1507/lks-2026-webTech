import React, { useEffect, useState } from 'react'
import API from '../lib/api'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Schedule = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("");
  const [items, setItems] = useState([])
  const [doctorItems, setDoctorItems] = useState([]);
  const [departmentItems, setDepartmentItems] = useState([]);
  const [doctorID, setdoctorID] = useState("");
  const [departmentID, setdepartmentID] = useState("");
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [kiriman, setKiriman] = useState([])


  const loadSchedule = async () => {
    try {
      const { data } = await API.get("/schedule")
      setItems(data?.schedules)
    } catch (err) {
      setError(err?.response?.data?.message|| "invalid fields")      
    }
  }

    const loadDepartment = async () => {
    setError("")

    try {
      const { data } = await API.get("/department")
      // console.log(data.departments);
      setDepartmentItems(data?.departments)
    } catch (error) {
      setError(error?.response?.data?.message)
    }

  }

    const loadDoctor = async () => {
    setError("");
    setLoading(true);
    setSuccess("");
    
    try {
      const { data } = await API.get("/doctor");
      const format = data?.doctors
      setDoctorItems(format);
      // console.log(data?.doctors);
      

    } catch (err) {
      setError(err?.response?.message);
    } finally {
      setLoading(false)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    try {
     const { data } = await API.post("/schedule", {
        departmentID,
        doctorID,
        date,
        startTime,
        endTime
      })
      loadSchedule()
    } catch (err) {
      console.log("Backend Validation Errors:", err?.response?.data);
      setError(err?.response?.data?.message || "Invalid Fields");
    }
    
  }

  useEffect(() => {
    loadSchedule()
    loadDepartment()
    loadDoctor()
  }, [])

  useEffect(() => {
  }, [])

  useEffect(() => {
  }, [])

  return (
    <>
    <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="card card-info">
              <div className="card-header">
                Input Doctor's Schedules
              </div>
              <div className="card-body">
                <div className="form-body">
                  <form onSubmit={submitHandler} >
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Doctor ID
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <select onChange={(e) => setdoctorID(e.target.value)} value={doctorID} className="form-control" >
                          <option value="">--select data--</option>
                        {doctorItems.map((item) => (
                          <option key={item.doctorID} value={item.doctorID}>{item.doctorID}</option>
                        ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Poliklinik ID
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <select onChange={(e) => setdepartmentID(e.target.value)} value={departmentID} className="form-control">
                          <option value="">--select data--</option>
                         {departmentItems.map((item) => (
                          <option key={item.departmentID} value={item.departmentID}>{item.departmentID}</option>
                        ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Date
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input onChange={(e) => setDate(e.target.value)} value={date} type='date' className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Start
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input onChange={(e) => setStartTime(e.target.value)} value={startTime} type='time' className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        End
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input onChange={(e) => setEndTime(e.target.value)} value={endTime} type='time' className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <div className="col-md-12">
                        <input type="submit" value="Save" className="btn btn-primary" /> 
                        <input type="reset" value="Reset" className="btn btn-danger" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="card card-default">
            <div className="card-header">
              Data
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Poliklinik</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Act</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.scheduleID}>
                    <td>{item.scheduleID}</td>
                    <td>{item.departmentName}</td>
                    <td>{item.doctorName}</td>
                    <td>{item.scheduleDate}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>
                      <button className="btn btn-danger">Delete</button> <Link to={`/schedule/${item.scheduleID}`} className="btn btn-primary">Edit</Link>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Schedule
