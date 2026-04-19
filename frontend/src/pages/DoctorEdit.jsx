import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../lib/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DoctorEdit = () => {
  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setdoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams()
  const navigate = useNavigate()
  const loadDoctor = async () => {
    setError("");
    setLoading(true);
    setSuccess("");
    
    try {
      const { data } = await API.get(`/doctor/${id}`);
      const format = data?.data
      setDoctorID(format?.doctor_id);
      setdoctorName(format?.name);
      setGender(format?.gender);
      setPhone(format?.phone_number);
      setAddress(format?.address);
      setEmail(format?.email);
      setBio(format?.bio)      
    } catch (err) {
      setError(err?.response?.message);
    } finally {
      setLoading(false)
    }
  }

  

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setSuccess("")

    try {
      const { data } = await API.put(`/doctor/${id}`, {
        name: doctorName,
        gender: gender,
        phone: phone,
        address: address,
        email: email,
        bio: bio
      });
      loadDoctor()
      navigate("/doctor")
    } catch (err) {
      setError(err?.response?.message || "invalid fields")
    } finally {
      setLoading(false)
      console.log(success)
      
    }
  }


  useEffect(() => {
    loadDoctor()
    
  }, [])
  

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="card card-info">
              <div className="card-header">
                Input Doctor
              </div>
              <div className="card-body">
                <div className="form-body">
                  <form onSubmit={submitHandler} >
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Doctor ID
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input value={doctorID} disabled placeholder='Auto Generated' className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Name
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input onChange={(e) => setdoctorName(e.target.value)} value={doctorName} className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Gender
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <select onChange={(e) => setGender(e.target.value)} value={gender} className="form-control">
                          <option value={gender}>{gender}</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Phone
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Address
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Email
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Bio
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <textarea className="form-control" onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <div className="col-md-12">
                        { loading === true ? <input type="submit" value="Save" className="btn btn-primary opacity-50" disabled /> : <input type="submit" value="Save" className="btn btn-primary" />  }
                        <input type="reset" value="Reset" className="btn btn-danger" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorEdit
