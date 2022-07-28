import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import Heading from './SubComponents/Heading';

import Swal from 'sweetalert2'



const EmployeeEditAttendance = () => {
  const name = "Anil Roy"

  const [values, setValues] = useState({
    date: '',
    intime: '',
    outtime: '',
  });

  const handleChange = (prop) => (e) => {
    setValues({
      ...values,
      [prop]: e.target.value
    })
  }


  const addAttendance = async (event) => {
    const res = await axios.post("http://localhost:5000/addAttendance", {
      // name, date, time_in, time_out
      name: name,
      date: values.date,
      time_in: values.intime,
      time_out: values.outtime

    })
    // console.log(res);
    if (res.status === 201) {
      // window.alert(res.data.message)
      Swal.fire({
        icon: 'success',
        title: "Success",
        text: res.data.message

      })

    } else {
      // window.alert(res.data.message)
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: res.data.message

      })
    }
  }


  return (
    <>

      <div className="container bg-light mt-5 nempMain">
        <Heading
          heading="Edit Attendance"
        />

        {/* <div className="container  mt-5 mb-4">
            <h4 className="mt-5 mb-3">Manual Entry</h4>
          </div> */}
        <hr />
        <div className="container mt-5 mb-5 attMain ">
          <div className="row form-group justify-content-center d-flex">
            <label className="col-md-1 control-label"> Date: </label>
            <div className="col-md-4">
              <input className="form-control" type="date" onChange={handleChange('date')} />
            </div>
          </div>
          <br />
          <div className="row form-group justify-content-center d-flex ">
            <label className="col-md-1 control-label"> Time In: </label>
            <div className="col-md-4">
              <input className="form-control" type="time" value='08:30AM' onChange={handleChange('intime')} />
            </div>
          </div>
          <br />
          <div className="row form-group justify-content-center d-flex">
            <label className="col-md-1 control-label"> Time Out: </label>
            <div className="col-md-4">
              <input className="form-control" type="time" onChange={handleChange('outtime')} />
            </div>
          </div>
          <br />
          <div className='mt-3 justify-content-center d-flex'>
            <Button variant='contained' style={{ width: '180px' }} className="mb-5">
              Update
            </Button>
          </div>
        </div>


      </div>

    </>
  )
}

export default EmployeeEditAttendance