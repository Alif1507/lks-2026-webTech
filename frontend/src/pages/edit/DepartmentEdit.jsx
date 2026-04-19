import React, { useEffect, useState } from 'react'
import API from '../../lib/api';
import Navbar from '../../components/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DepartmentEdit = () => {
  const [error, setError] = useState("");
  const [succses, setSuccses] = useState("");
  const [loading, setLoading] = useState(false);
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDesc, setDepartmentDesc] = useState("");
  const { id } = useParams()
  const navigate  = useNavigate()

  const loadDepartment = async () => {
    setError("")

    try {
      const { data } = await API.get(`/department/${id}`)
      setDepartmentID(data?.department?.department_id)
      setDepartmentName(data?.department?.department_name)
      setDepartmentDesc(data?.department?.department_description)
      
    } catch (error) {
      setError(error?.response?.data?.message)
    }

  }

  const reset = () => {
    setDepartmentName("")
    setDepartmentDesc("")
  }  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccses("")
    setLoading(true)
    
    try {
      const { data } = await API.put(`/department/${id}`, {
        name: departmentName,
        description: departmentDesc
      })
      setSuccses(data?.message)
      loadDepartment()
      console.log(succses);
      
    } catch (err) {
      setError(err?.data || "invalid fields")
    } finally {
      setLoading(false)
      navigate("/department")
    }
    
    
  }

  

  useEffect(() => {
    loadDepartment()
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
                        <input onClick={reset} type="reset" value="Reset" className="btn btn-danger" />
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

export default DepartmentEdit;
