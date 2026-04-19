import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../lib/api';
import { Link } from 'react-router-dom';

const Doctor = () => {
  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setdoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);

  const loadDoctor = async () => {
    setError("");
    setLoading(true);
    setSuccess("");
    
    try {
      const { data } = await API.get("/doctor");
      const format = data?.doctors
      setItems(format);
      generateID(format)
      // console.log(data?.doctors);
      

    } catch (err) {
      setError(err?.response?.message);
    } finally {
      setLoading(false)
    }
  }

  const generateID = (existsingID) => {
    if (!existsingID || existsingID.length === 0) {
      setDoctorID("DOC000000000001");
      return
    }

    const maxNumber = existsingID.reduce((max, doc) => {
      const num = parseInt(doc.doctorID.replace("DOC", ""), 15)
      return num > max ? num : max;
    }, 0);

    const nextNumber = maxNumber + 1;
    const paddednumber = String(nextNumber).padStart(12, "0");

     return setDoctorID(`DOC${paddednumber}`);
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setSuccess("")

    try {
      const { data } = await API.post("/doctor", {
        doctorID: doctorID,
        name: doctorName,
        gender: gender,
        phone: phone,
        address: address,
        email: email,
        bio: bio
      });
      const message = data?.message 
      setSuccess(message)
      loadDoctor()
    } catch (err) {
      setError(err?.response?.message || "invalid fields")
    } finally {
      setLoading(false)
      console.log(success)
      
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const { data } = await API.delete(`/doctor/${id}`);
      setSuccess(data?.message);
      loadDoctor()
      console.log(data?.message);
      
    } catch (err) {
      setError(err?.response?.data?.message || "cannot delete")
    } finally {
      setLoading(false)
      console.log(error);
      
    }

  }

  useEffect(() => {
    loadDoctor()
    generateID()
    
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
                          <option value="">--Option--</option>
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
        <div className="my-4">
          <div className="card card-default">
            <div className="card-header">
              Data
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Bio</th>
                    <th>Act</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                     items.map((item) => (
                    <tr key={item.doctorID}>
                      <td>{item.doctorID}</td>
                      <td>{item.doctorName}</td>
                      <td>{item.gender === "M" ? "Male" : "Female"}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.email}</td>
                      <td>{item.bio}</td>
                      <td><button onClick={() => handleDelete(item.doctorID)} className="btn btn-danger">Delete</button> <Link to={`/doctor/${item.doctorID}`} className="btn btn-primary">Edit</Link></td>
                    </tr>))
                  ) : (<tr>
                    <td colSpan="8" className='text-center'>nodata</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Doctor
