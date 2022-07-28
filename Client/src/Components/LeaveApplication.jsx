import React, { useState, useEffect, useRef } from 'react'
import Heading from './SubComponents/Heading'
import { LeaveDetails } from '../Data/DashboardCard'
import { Link, useHistory } from "react-router-dom"
import Cards from './SubComponents/Cards'
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material'
import { getLeaveTypes, allEmployeeList, getEmployeeData, getAboutDetails } from "../Apis/apis"
import axios from "axios"
import Swal from 'sweetalert2'



const LeaveApplication = () => {

    const [change, setChange] = useState({})
    const aboutInfo = async () => {
        const res = await getAboutDetails();
        // console.log(res.data);
        setChange(res.data)
        // window.localStorage.setItem("e",res.data.employeeID)
    }

    const [values, setValues] = useState({
        leaveType: '',
        leaveMode: '',
        startDate: '00/00/0000',
        endDate: new Date(),
        reason: '',
        file: '',
        reference: '',
        emergency: ''
    })

    let history = useHistory()
    const ref = useRef();

    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value
        })
    }

    const [file, setFile] = useState({})

    const showFile = async (event) => {
        // console.log(event.target.files[0]);
        setFile(event.target.files[0])
    }
   


    const applyLeave = async () => {
        // console.log(file);
        const formData = new FormData();
        formData.append("file", file)

        const res = await axios.post("http://localhost:5000/addNewLeave", {
            name: change.firstname + " " + change.lastname,
            empId: change.employeeID,
            dept: change.role,
            leaveType: values.leaveType,
            mode: values.leaveMode,
            startDate: values.startDate,
            endDate: values.endDate,
            reason: values.reason,
            reference: values.reference,
            emergency: values.emergency,
            file: formData.get('file')
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // console.log(res);
        // window.alert(res.data.message)
        if (res.status == 200) {
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: res.data.message

            })

        } else {
            Swal.fire({
                icon: 'error',
                title: "Server Error!",
                text: "Cannot apply for leave"

            })

        }
        setFile();
        setValues({
            ...values,
            leaveType: '',
            leaveMode: '',
            startDate: '00/00/0000',
            endDate: new Date(),
            reason: '',
        })
        ref.current.value = "";
        setTrigger(!trigger)
        history.push("/employeeviewleaves")

    }

    // all leave types
    const [allLeaveType, setAllLeaveType] = useState([]);
    const allLeaveTypes = async () => {
        const res = await getLeaveTypes();
        setAllLeaveType(res.data);
    }


    const LeaveStatusCard = [
        {
            id: 0,
            name: "Requested",
            balance: 0
        },
        {
            id: 1,
            name: "Requested",
            balance: 0
        },
        {
            id: 2,
            name: "Requested",
            balance: 0
        },
        {
            id: 2,
            name: "Requested",
            balance: 0
        }
    ]

    const [allEmployee, setAllEmployee] = useState([])

    const getAllEmployeeList = async () => {
        const res = await allEmployeeList();
        setAllEmployee(res.data)
    }

    const [requested, setRequested] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [rejected, setRejected] = useState(0)
    const [pending, setPending] = useState(0)

    const [employeeLeave, setemployeeLeave] = useState([])
    const [leftBalance, setLeftBalance] = useState([])
    const [balanceStats, setBalanceStats] = useState([])
    const [trigger, setTrigger] = useState(false)

    const balance = async () => {
        const data = {
            empId: window.localStorage.getItem("e")
        }
        const response = await getEmployeeData(data)
        // console.log(response.balanceStats);

        setemployeeLeave(response.employeeLeave)
        setLeftBalance(response.leftBalance)
        setBalanceStats(response.balanceStats[0].counts)
        (setTrigger(!trigger))
    }

    // console.l/

    // console.log(leftBalance);

    const leftBalanceFunc = () => {
        // console.log(8888888888);
        var total = 0
        // console.log(leftBalance);
        leftBalance.map((curr, i) => {
            if (curr._id === 'Pending') {
                setPending(curr.value)
            }
            else if (curr._id === 'Accepted') {
                setAccepted(curr.value)
            }
            else if (curr._id === 'Rejected') {
                setRejected(curr.value)
            }
            total = total + curr.value
        })

        setRequested(total)
        // setTrigger(!trigger)
        // console.log(rejected);
    }

    // 


    useEffect(() => {
       
        allLeaveTypes();
        getAllEmployeeList();
        balance();
        aboutInfo();
        // leftBalanceFunc()
        // setTrigger(!trigger)
    }, [])

    useEffect(() => {
        aboutInfo ();
        leftBalanceFunc();
    }, [trigger])



    return (
        <>
            <div className="container nempMain mt-5 mb-5 bg-light">
                {/* <a href={imgFile}>I am file</a> */}
                {/* <Link to="../upload/2022-06-20T15-32-59.551Z-form.pdf" target="_blank"> here </Link> */}
                <Heading
                    heading="Leave Application"
                />


                <div className="container main_div mt-5 mb-5 justify-content-center">
                    <div className="row">
                        <div className="col-sm-5 col-md-5">
                            <h4>Leave Status</h4>
                        </div>
                        <div className="col-sm-7 col-md-7">
                            <div className="leaveBalanceTitle">
                                <h4>Leave Balance</h4>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-sm-5 col-md-5">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card  leaveCard leaveCardRequested" >
                                        <div className="card-body leaveStatusCard">
                                            <div className="d-flex">
                                                <h2 className="card-title statusName"  >Requested</h2>

                                            </div>
                                            <hr className="seperators" />

                                            <p className="card-text statusNumbers">{requested}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card leaveCard leaveCardAccepted" >
                                        <div className="card-body leaveStatusCard">
                                            <div className="d-flex">
                                                <h2 className="card-title statusName"  >Accepted</h2>

                                            </div>
                                            <hr className="seperators" />
                                            <p className="card-text statusNumbers">{accepted}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card leaveCard leaveCardPending" >
                                        <div className="card-body leaveStatusCard">
                                            <div className="d-flex">
                                                <h2 className="card-title statusName statusName"  >Pending</h2>

                                            </div>
                                            <hr className="seperator" />
                                            <p className="card-text statusNumber">{pending}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card leaveCard leaveCardRejected" >
                                        <div className="card-body leaveStatusCard">
                                            <div className="d-flex">
                                                <h2 className="card-title statusName"  >Rejected</h2>

                                            </div>
                                            <hr className="seperator" />
                                            <p className="card-text statusNumber">{rejected}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7 col-md-7 leaveBalanaceScrollable">
                            <div className="designStatus">
                                {
                                    balanceStats.map((curr, index) => {
                                        return (<>
                                            <div className="">
                                                <div className="col-sm-3 col-md-3">
                                                    <div className="leaveBalance">
                                                        <div className="leaveName">
                                                            {curr.name}
                                                        </div>
                                                        <hr className="seperator" />
                                                        <div className="leaveLeft">
                                                            {curr.daysTaken} / {curr.maxDays}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-5 container">
                    <h4>Application</h4>
                </div>
                <hr />
                <div className="row container ">
                    <div className="col-md-12 mt-3 mb-5">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Leave Type  </label>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Leave Type </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.leaveType}
                                        label="Leave Type:"
                                        onChange={handleChange('leaveType')}
                                    >
                                        {
                                            allLeaveType.map((curr, index) => {
                                                return (
                                                    <MenuItem value={curr.name}>{curr.name}</MenuItem>
                                                )
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Leave Mode </label>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Leave Mode </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.leaveMode}
                                        label="Leave Mode:"
                                        onChange={handleChange('leaveMode')}
                                    >
                                        <MenuItem value={"Full Day"}>Full Day</MenuItem>
                                        <MenuItem value={"Half Day"}>Half Day</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Reference Name </label>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Reference Name </InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.reference}
                                        label="Reference Name"
                                        onChange={handleChange('reference')}
                                    >
                                        {
                                            allEmployee.map((curr, index) => {
                                                return (
                                                    <MenuItem value={curr.firstname + " " + curr.lastname} key={index}>{curr.firstname} {curr.lastname}</MenuItem>
                                                )
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Emergency Contact </label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Reference Name </InputLabel> */}
                                    <TextField id="outlined" label="Emergency Contact"
                                        name="Reference" fullWidth
                                        type="number"
                                        value={values.emergency}
                                        onChange={handleChange('emergency')} />
                                </FormControl>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Start Date </label>
                                <TextField
                                    label="Start Date"
                                    // autoFocus
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={values.startDate}
                                    varient="outlined"
                                    fullWidth
                                    onChange={handleChange('startDate')}
                                    type="date"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> End Date </label>
                                <TextField
                                    label="End Date"
                                    // autoFocus
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={values.endDate}
                                    varient="outlined"
                                    fullWidth
                                    onChange={handleChange('endDate')}
                                    type="date"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Reason </label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Description </InputLabel> */}
                                    <TextField id="outlined" label="Reason"
                                        name="description" fullWidth
                                        value={values.reason}
                                        onChange={handleChange('reason')} />
                                </FormControl>
                            </div>
                            <div className="col-md-3">
                                <label className="control-label mb-3"> Upload Documents </label>
                                <TextField
                                    label="Upload Documents"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    type="file"
                                    ref={ref}
                                    onChange={showFile}
                                    onClick={e => (e.target.value = null)}
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="footerBtn">
                    <button className="btn btn-primary submitButton" onClick={applyLeave}>Apply</button>
                </div>
            </div>
        </>
    )
}

export default LeaveApplication