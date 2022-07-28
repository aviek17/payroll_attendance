import Button from '@mui/material/Button';
import React, { useState, useEffect, } from 'react'
import Heading from './SubComponents/Heading';
import axios from "axios"
import { useHistory } from "react-router-dom"
import {getAboutDetails} from "../Apis/apis"

import Swal from 'sweetalert2'

const ManualAttendance = () => {
  
  const [list, setList] = useState({})
  const aboutInfo = async ()=>{
    const res = await getAboutDetails();
    setList(res.data)
  }


  const history = useHistory();

  


  const [values, setValues] = useState({
    date: Date.now(),
    intime: '',
    outtime: '',
  });

  const handleChange = (prop) => (e) => {
    setValues({
      ...values,
      [prop]: e.target.value
    })
  }


  // window.localStorage.setItem('In', '00:00')
  // window.localStorage.setItem('out', '00:00')



  const [date, setDate] = useState('')
  const [timeIn, setTimeIn] = useState(window.localStorage.getItem("In"))
  const [timeOut, setTimeOut] = useState(window.localStorage.getItem("out"))
  const [disable, setDisable] = useState(false)
  const [disables, setDisables] = useState(false)
  const [disabling, setDisabling] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const getTime = async () => {
    const date = new Date();
    setDate(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate())
    //console.log(date.getHours());
    //console.log(date.getMinutes());
  }


  const settimesIn = () => {
    //console.log(123456);
    const date = new Date();
    const store = date.getHours()
    if (store < 11 && store > 8) {
      setTimeIn(date.getHours() + ":" + date.getMinutes())
      setDisable(true)
    }
    else {
      setDisable(false);
      // window.alert("Time In cannot be before 8 a.m. and after 11 a.m.")
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Time In cannot be before 8 a.m. and after 11 a.m."

    })
    }
    setTrigger(!trigger)
  }


  const settimesOut = () => {
    //console.log(123456);
    const date = new Date();
    const store = date.getHours()
    //console.log(date.getHours())
    if (store > 16 && store < 22) {
      setTimeOut(date.getHours() + ":" + date.getMinutes())
      setDisables(true)
      setDisabling(false)
    } else {
      setDisables(false)
      setDisabling(false)
      // window.alert("Time out cannot be before 5 p.m. and after 10p.m.")
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Time out cannot be before 5 p.m. and after 10p.m."

    })
    }
    setTrigger(!trigger)
  }


  useEffect(() => {
    window.localStorage.setItem('In', timeIn)
    window.localStorage.setItem('out', timeOut)
  }, [trigger])

  useEffect(() => {
    aboutInfo();
  }, [])
  
 


  const addAttendance = async (event) => {
    const res = await axios.post("http://localhost:5000/addAttendance", {
      // name, date, time_in, time_out
      name: list.firstname + " " + list.lastname,
      empId: list.employeeID,
      dept : list.role,
      date: date,
      time_in: window.localStorage.getItem("In"),
      time_out: window.localStorage.getItem("out"),

    })
    //console.log(res);
    if (res.status === 201) {
      // window.alert(res.data.message)
      Swal.fire({
        icon: 'success',
        title: "Success",
        text: res.data.message

    })
      history.push("/employeeviewattendance")
    } else {
      // window.alert(res.data.message)
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: res.data.message

    })
    }
    window.localStorage.removeItem("In")
    window.localStorage.removeItem("out")
  }

  useEffect(() => {
    getTime();
    setDisable(false);
    setDisable(false)
  }, [])



  return (
    <>

      <div className="container bg-light mt-5 nempMain">
        <Heading
          heading="Attendance"
        />

        <div className="container  mt-5 mb-4">
          <h4 className="mt-5 mb-3">Manual Entry</h4>
        </div>
        <hr />
        <div className="container mt-5 mb-5 attMain ">
          <div className="row form-group justify-content-center d-flex">
            <label className="col-md-1 control-label"> Date: </label>
            <div className="col-md-5">
              <input className="form-control" type="text" readOnly={true} value={date} />
            </div>
          </div>
          <br />
          <div className="row form-group justify-content-center d-flex ">
            <label className="col-md-1 control-label"> Time In: </label>
            <div className="col-md-3">
              <input className="form-control" type="text" value={timeIn} readOnly={true} />
            </div>
            <div className="col-md-2 ">
              <button className="btnClickHeres" onClick={settimesIn} disabled={disable} >Click Here</button>
            </div>
          </div>
          <br />
          <div className="row form-group justify-content-center d-flex">
            <label className="col-md-1 control-label"> Time Out: </label>
            <div className="col-md-3">
              <input className="form-control" type="text" value={timeOut} readOnly={true} />
            </div>
            <div className="col-md-2 ">
              <button className="btnClickHeress" onClick={settimesOut} disabled={disables} >Click Here</button>
            </div>
          </div>
          <br />
          <div className='mt-3 justify-content-center d-flex'>
            <Button variant='contained' style={{ width: '180px' }} disabled={disabling} className="mb-5" onClick={addAttendance}>
              Submit
            </Button>
          </div>
        </div>


      </div>

    </>
  )
}

export default ManualAttendance;