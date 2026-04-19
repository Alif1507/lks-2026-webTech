import React, { useEffect, useState } from 'react'
import API from '../lib/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Department = () => {
  const [error, setError] = useState("");
  const [succses, setSuccses] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([])
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDesc, setDepartmentDesc] = useState("");
  
  const loadDepartment = async () => {
    setError("")

    try {
      const { data } = await API.get("/department")
      // console.log(data.departments);
      setItems(data?.departments)
      generatedDepartmentID(data?.departments)
    } catch (error) {
      setError(error?.response?.data?.message)
    }

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccses("")
    setLoading(true)
    
    try {
      const { data } = await API.post("/department", {
        departmentID: departmentID,
        name: departmentName,
        description: departmentDesc
      })
      setDepartmentID("")
      setDepartmentName("")
      setDepartmentDesc("")
      setSuccses(data?.message)
      generatedDepartmentID()
      loadDepartment()
      console.log(succses);
      
    } catch (err) {
      setError(err?.data || "invalid fields")
    } finally {
      setLoading(false)
    }
    
    
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("yakin mau delete?");
    if(!confirm) return
    setError("")
    setLoading(false)

    try {
     await API.delete(`/department/${id}`)
    } catch (err) { 
      setError("cannot Delete");
    } finally {
      loadDepartment()
    }

  }
  
 const generatedDepartmentID = (exsitingDepartmentID) => {
  if (!exsitingDepartmentID || exsitingDepartmentID.length === 0) {
    setDepartmentID("DEPT000001");
    return;
  }

  const maxNumber = exsitingDepartmentID.reduce((max, dept) => {
    const num = parseInt(dept.departmentID.replace("DEPT", ""), 10)
    return num > max ? num : max;
  }, 0)

  const nextNumber = maxNumber + 1
  const paddedNumber = String(nextNumber).padStart(6, "0")

  return setDepartmentID(`DEPT${paddedNumber}`);
 }
  useEffect(() => {
    loadDepartment()
    generatedDepartmentID()
  }, [])
  

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="card card-info">
              <div className="card-header">
                Input Poliklinik
              </div>
              <div className="card-body">
                <div className="form-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Poliklinik ID
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input className="form-control" value={departmentID} disabled placeholder='Auto Generated' />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Poliklinik Name
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <input onChange={(e) => setDepartmentName(e.target.value)} value={departmentName} className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-md-4 col-sm-12 col-xs-12">
                        Description
                      </label>
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <textarea value={departmentDesc} onChange={(e) => setDepartmentDesc(e.target.value)} className="form-control"></textarea>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      { }
                      {succses && <div className='alert alert-primary'>{succses}</div>}
                      {error && <div className='alert alert-danger'>{error}</div>}
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Act</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item) => (
                    <tr key={item.departmentID}>
                      <td>{item.departmentID}</td>
                      <td>{item.departmentName}</td>
                      <td><button onClick={() => handleDelete(item.departmentID)} className="btn btn-danger">Delete</button> <Link to={`/department/${item.departmentID}`} className="btn btn-primary">Edit</Link></td>
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan="4" className='text-center'>
                        no data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Department
