import React, { useState, useEffect } from 'react'
import Heading from './SubComponents/Heading'
import { getAllLeaveList, getSingleLeaveDetails, getLeaveStats } from "../Apis/apis"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from "axios"
import ReactECharts from 'echarts-for-react';
import { Backdrop, Box, Modal } from '@mui/material'

const ReportLeave = () => {
    const [list, setList] = useState([])
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
    const [empList, setEmpList] = useState([])

    const getEmployees = async () => {
        const res = await axios.get("http://localhost:5000/findEmployee")
        //console.log(res)
        setEmpList(res.data)
    }

    const [lists, setLists] = useState([])
    const getLeaveList = async () => {
        const res = await getAllLeaveList();
        setList(res.data)
        //console.log(res.data);
    }

    const getStats = async () => {
        const response = await getSingleLeaveDetails(values.employee);
        setLists(response.data)
        //console.log(response.data);
    }

    useEffect(() => {
        getLeaveList();
        getEmployees()
    }, [])

    useEffect(() => {
        getStats();
    }, [values])


    const [stats, setStats] = useState([])
    const [total,setTotal] = useState(0)

    const viewStats = async (id) => {
        const response = await getLeaveStats(id);
        //console.log(response);
        setStats(response.data.stats)
        setTotal(response.data.total.length)
        setOpen(true);
    }

    const noOfDays = (dayFrom, dayTo) => {

        const day1 = new Date(dayFrom)
        const day2 = new Date(dayTo)

        //console.log(day1);
        //console.log(day2);
        var total_seconds = Math.abs(day2 - day1) / 1000;
        var days_difference = Math.floor(total_seconds / (60 * 60 * 24));

        //console.log(days_difference);
        return days_difference;
    }

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

    const statsObj = stats.map((item, index) => {
        return {
          name: item._id,
          value: item.value
        };
      });

    statsObj.push({name : "Total Leave Application", value : total})

    const leave = {

        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '10%',
          left: '25%'
        },
    
        series: [
          {
            name: 'Leave Chart',
            type: 'pie',
            radius: [50, 180],
            center: ['50%', '40%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: statsObj
          }
        ]
      };
    


    return (
        <>

            <div className="bg-light container mb-5 mt-5 nempMain">
                <Heading
                    heading="Reports"
                />
                <div className="container mt-5 mb-3">
                    <h4>Leave Reports</h4>
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
                                <th class="th-sm">Leave Type
                                </th>
                                <th class="th-sm">Days Taken
                                </th>
                                <th class="th-sm">From
                                </th>
                                <th class="th-sm">To
                                </th>
                                <th class="th-sm">Mode
                                </th>
                                <th class="th-sm">Status
                                </th>
                                <th class="th-sm">Reference Name
                                </th>
                                <th class="th-sm">Emergency Contact
                                </th>

                            </tr>
                        </thead>
                        <tbody className="mb-1">
                            {
                                (lists.length == 0) ?
                                    list.map((curr, index) => {
                                        const daysTaken = noOfDays(curr.issuedFrom, curr.issuedUpto)
                                        return (<>
                                            <tr className="text-center">
                                                <td>{curr.name}</td>
                                                <td>{curr.leaveType}</td>
                                                <td>{daysTaken}</td>
                                                <td>{curr.issuedFrom}</td>
                                                <td>{curr.issuedUpto}</td>
                                                <td>{curr.mode}</td>
                                                <td>{curr.status}</td>
                                                <td>{curr.reference}</td>
                                                <td>{curr.emergency}</td>
                                            </tr>
                                        </>)
                                    }) : lists.map((curr, index) => {
                                        const daysTaken = noOfDays(curr.issuedFrom, curr.issuedUpto)
                                        return (<>
                                            <tr className="text-center">
                                                <td className="showStats" onClick={() => { (viewStats(curr.empId)) }}>{curr.name}</td>
                                                <td>{curr.leaveType}</td>
                                                <td>{daysTaken}</td>
                                                <td>{curr.issuedFrom}</td>
                                                <td>{curr.issuedUpto}</td>
                                                <td>{curr.mode}</td>
                                                <td>{curr.status}</td>
                                                <td>{curr.reference}</td>
                                                <td>{curr.emergency}</td>
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
                            Leave Stats for {values.employee}
                        </h5>
                        <hr />
                        <ReactECharts option={leave} style={{ height: '450px', width: '100%' }} />
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ReportLeave