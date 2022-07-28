import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Heading from './SubComponents/Heading'
import axios from "axios"
import { employeeLeaveCalculator } from "../Apis/apis"
import ReactECharts from 'echarts-for-react';
import { Backdrop, Box, Modal } from '@mui/material'

const ReportAttendance = () => {

  const [empList, setEmpList] = useState([])

  const getEmployees = async () => {
    const res = await axios.get("http://localhost:5000/findEmployee")
    //console.log(res)
    setEmpList(res.data)
  }

  const [list, setList] = useState([])

  const getAttendance = async () => {
    const res = await axios.get("http://localhost:5000/viewAttendanceList")
    // //console.log(res.data);
    setList(res.data)
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  }

  const [values, setValues] = useState({
    employee: '',
    department: '',
  })

  const handleChange = (prop) => (e) => {
    setValues({
      ...values,
      [prop]: e.target.value
    })
  }

  const [lists, setLists] = useState([])

  //console.log(values.employee)
  const getEmployeeAttendance = async (event) => {

    const res = await axios.post("http://localhost:5000/viewEmployeeAttendance", {
      name: values.employee
    })

    //console.log(res);
    setLists(res.data)
  }


  useEffect(() => {
    getEmployees()
    getAttendance()
  }, [])

  const colorPalette = ['#20c997', '#dc3545', '#ffc107', '#0d6efd', '#0dcaf0', '#6610f2', '#cd6ae2']
  useEffect(() => {
    getEmployeeAttendance();
  }, [values])

  const [stats, setStats] = useState([])

  const showStats = async (id) => {
    const res = await employeeLeaveCalculator(id);
    //console.log(res);
    setStats(res.data)
    setOpen(true)
  }

  var x = [];
  var y = [];

  stats.map((curr, i) => {
    x.push(curr._id)
    y.push({
      value: curr.value,
      itemStyle: {
        color: colorPalette[i]
      }
    })
  })

  const leave = {
    legend: {
      bottom: '10%',
      left: '15%'
    },
    color: ['#00DDFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#00000'
        },
        animation: true
      }
    },
    xAxis: {
      type: 'category',
      data: x,
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        fontStyle: 'oblique',
        fontWeight: 500
      }
    },
    series: [
      {
        // name: 'Leave Chart',
        data: y,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '550px',
    borderRadius: '13px',
    bgcolor: 'background.paper',
    borderLeft: '2px solid #000',
    borderBottom: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 14,
  };




  return (
    <>
      <div className="container mt-5 bg-light nempMain">
        <Heading
          heading="Reports"
        />

        <div className="container mt-5 mb-5">
          <h4>Employee Attendance</h4>
        </div>
        <hr />
        <div className="container mt-3 mb-5">
          <div className="form-group row justify-content-around">
            <div className="col-md-4" >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Employee: </InputLabel>
                <Select

                  value={values.employee}
                  label="Select Employee:"
                  onChange={handleChange('employee')}
                // onClick={getEmployeeAttendance}
                >
                  {
                    empList.map((curr, index) => {
                      return (
                        <MenuItem key={index}
                          value={curr.firstname + " " + curr.lastname}
                        >
                          {curr.firstname} {curr.lastname}
                        </MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4" >
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Department: </InputLabel>
                <Select

                  value={values.department}
                  label="Select Department:"
                  onChange={handleChange('department')}
                >
                  <MenuItem value={"Staff"}>Staff</MenuItem>
                  <MenuItem value={"HR Staff"}>HR Staff</MenuItem>
                  <MenuItem value={"HR Admin"}>HR Admin</MenuItem>
                  <MenuItem value={"System Administrator"}>System Administrator</MenuItem>
                </Select>
              </FormControl> */}
            </div>
          </div>
        </div>


        <div className="container">
          <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
            <thead className="bg-dark text-light">
              <tr className='text-center'>
                <th class="th-sm">Name
                </th>

              </tr>
            </thead>
            <tbody className="mb-1">
              {
                (lists.length == 0) ?
                  list.map((curr, index) => {

                    return (<>
                      <tr className="text-center">
                        <td className="attendanceNameHeading" data-bs-toggle="tooltip" data-bs-placement="bottom"
                          data-bs-custom-class="custom-tooltip" title="Click to check stats" onClick={() => { (showStats(curr.empId)) }}>{curr.name}</td>
                        <table className="mb-5 table table-hover table-responsive " >
                          <thead className="bg-dark text-light">
                            <tr className='text-center'>

                              <th class="th-sm">Day
                              </th>
                              <th class="th-sm">Date
                              </th>
                              <th class="th-sm">Time In
                              </th>
                              <th class="th-sm">Time Out
                              </th>
                              <th class="th-sm">Working Hours
                              </th>
                            </tr>
                          </thead>
                          <tbody className="mb-1">
                            {
                              curr.records.map((val, index) => {
                                return (
                                  <>
                                    <tr className="text-center">
                                      <td>{val.day}</td>
                                      <td>{val.date}</td>
                                      <td>{val.time_in}</td>
                                      <td>{val.time_out}</td>
                                      <td>{val.workingHours}</td>
                                    </tr>

                                  </>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </tr>
                    </>)
                  }) : lists.map((curr, index) => {

                    return (<>
                      <tr className="text-center">
                        <td className="attendanceNameHeading" onClick={() => { (showStats(curr.empId)) }}>{curr.name}</td>
                        <table className="mb-5 table table-hover table-responsive " >
                          <thead className="bg-dark text-light">
                            <tr className='text-center'>

                              <th class="th-sm">Day
                              </th>
                              <th class="th-sm">Date
                              </th>
                              <th class="th-sm">Time In
                              </th>
                              <th class="th-sm">Time Out
                              </th>
                              <th class="th-sm">Working Hours
                              </th>
                            </tr>
                          </thead>
                          <tbody className="mb-1">
                            {
                              curr.records.map((val, index) => {
                                return (
                                  <>
                                    <tr className="text-center">
                                      <td>{val.day}</td>
                                      <td>{val.date}</td>
                                      <td>{val.time_in}</td>
                                      <td>{val.time_out}</td>
                                      <td>{val.workingHours}</td>
                                    </tr>

                                  </>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </tr>
                    </>)
                  })
              }

            </tbody>

          </table>
          <div className='pagination'>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>
      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>

          <div className="container">
            <h5>
              Attendance day wise
            </h5>
            <hr />
            <ReactECharts option={leave} style={{ height: '450px', width: '100%' }} />
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ReportAttendance