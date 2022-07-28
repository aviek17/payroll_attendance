import { Backdrop, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material'
import React, { useState,useEffect } from 'react'
import Heading from './SubComponents/Heading'
import { viewEmployeeLeaves,singleEmployeeleaveDetails, getAboutDetails } from "../Apis/apis"
import pdfImg from "../Images/file-pdf-solid-24.png"



const EmployeeViewLeaves = () => {

    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [showLeaveDetails, setShowLeaveDetails] = useState([])
    const [toggle, setToggle] = useState(false)

    const handleOpen = async (id) => {
        // console.log(id);
        const res = await singleEmployeeleaveDetails(id);
        // console.log(res.data);
        setShowLeaveDetails(res.data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
        setOpens(false)
    };

    const noOfDays = (dayFrom, dayTo) => {

        const day1 = new Date(dayFrom)
        const day2 = new Date(dayTo)

        // console.log(day1);
        // console.log(day2);
        var total_seconds = Math.abs(day2 - day1) / 1000;
        var days_difference = Math.floor(total_seconds / (60 * 60 * 24));

        // console.log(days_difference);
        return days_difference;
    }

    const [id, setId] = useState('')
    const updateLeaveStatus = async (id) => {
        setOpens(true);
        setId(id);
    }

    const [status, setStatus] = useState();
    const handleChange = (e) => setStatus(e.target.value)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '380px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontSize: 14,
    };
    const styles = {
        position: 'absolute',
        top: '58%',
        left: '50%',
        transform: 'translate(-50%, -58%)',
        width: '540px',
        height: '270px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontSize: 14,
    };

    const [leaveStatus, setLeaveStatus] = useState("Pending")
    const onChange = (e) => {
        setLeaveStatus(e.target.value)
    }

    const [change,setChange] = useState("")
    const aboutInfo = async ()=>{
        const res = await getAboutDetails();
        // console.log(res.data);
        setChange(res.data.employeeID)
      }


    const [filePath, setFilePath] = useState([])
    let images = []
    const getLeaveList = async () => {
        // console.log(change);
        const res = await viewEmployeeLeaves(window.localStorage.getItem("e"));
        setFilePath(res.data)
        // console.log(res.data);
    }



    useEffect(() => {
        getLeaveList();
        aboutInfo();
    }, [])

    useEffect(() => {
        getLeaveList();
    }, [toggle])



    return (
        <>

            <div className="container mt-5 mb-5 nempMain bg-light">
                <Heading
                    heading="Leaves"
                />

                <div className="container mb-3 mt-5">
                    <h4>Leave Applications</h4>
                </div>
                <hr />
                <div className="container">
                    <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
                        <thead className="bg-dark text-light">
                            <tr className='text-center'>
                                <th class="th-sm">Date
                                </th>
                                <th class="th-sm">Name
                                </th>
                                <th class="th-sm"> Leave Type
                                </th>
                                <th class="th-sm">From
                                </th>
                                <th class="th-sm">To
                                </th>
                                <th class="th-sm">Status
                                </th>
                                <th class="th-sm">Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="mb-1">

                            {
                                filePath.map((curr, index) => {
                                    if (curr.status == "Pending") {
                                        return (
                                            <>
                                                <tr className="text-center">
                                                    <td>{curr.date}</td>
                                                    <td>{curr.name}</td>
                                                    <td>{curr.leaveType}</td>
                                                    <td>{curr.issuedFrom}</td>
                                                    <td>{curr.issuedUpto}</td>
                                                    <td className="statusLeave">
                                                        <div className="bg-warningdropdown">
                                                            Pending
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => { handleOpen(curr._id) }} variant="contained" >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    } else if (curr.status == "Accepted") {
                                        return (
                                            <>
                                                <tr className="text-center">
                                                    <td>{curr.date}</td>
                                                    <td>{curr.name}</td>
                                                    <td>{curr.leaveType}</td>
                                                    <td>{curr.issuedFrom}</td>
                                                    <td>{curr.issuedUpto}</td>
                                                    <td className="statusLeave">
                                                        <span className="bg-acceptdropdown"> {curr.status}</span>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => { handleOpen(curr._id) }} variant="contained" >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <tr className="text-center">
                                                    <td>{curr.date}</td>
                                                    <td>{curr.name}</td>
                                                    <td>{curr.leaveType}</td>
                                                    <td>{curr.issuedFrom}</td>
                                                    <td>{curr.issuedUpto}</td>
                                                    <td className="statusLeave">
                                                        <span className="bg-rejectdropdown"> {curr.status}</span>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => { handleOpen(curr._id) }} variant="contained" >
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }

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
                            Leave Details
                        </h5>
                        <hr />
                        <div className="row container detailedLeave">
                            {
                                showLeaveDetails.map((curr, index) => {
                                    let noDays = noOfDays(curr.issuedFrom, curr.issuedUpto)
                                    return (<>
                                        <div className="col-sm-6 col-md-6">
                                            <p><b>Name:</b> {curr.name} </p>
                                            <p><b>Date:</b> {curr.date}</p>
                                            <p><b>Status:</b> {curr.status}</p>
                                            {/* <p><b>Description:</b></p> */}
                                            <p><b>File:</b> <a href={`http://localhost:5000/${curr.filePath}`}><img src={pdfImg} alt="" /></a> </p>
                                            <p style={{ overflowY: "scroll", height: "60px" }}><b>Reason:</b>  {curr.description} </p>

                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <p><b>Mode:</b> {curr.mode}</p>
                                            <p><b>From:</b> {curr.issuedFrom}</p>
                                            <p><b>To:</b> {curr.issuedUpto}</p>
                                            <p><b>Reference:</b>{curr.reference}</p>
                                            <p><b>Leave Type :</b> {curr.leaveType}</p>
                                            <p><b>Number of Days:</b>{noDays}</p>
                                        </div>
                                    </>)
                                })
                            }
                        </div>
                        <div className="conatainer mb-2 d-flex justify-content-end">
                            <Button variant='contained' onClick={handleClose} > Close </Button>
                        </div>
                    </div>
                </Box>
            </Modal>

            
        </>
    )
}

export default EmployeeViewLeaves