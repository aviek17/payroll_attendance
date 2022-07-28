import { Backdrop, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Heading from './SubComponents/Heading'
import axios from 'axios'

import Swal from 'sweetalert2'

const Payroll = () => {

    // const navigate = useNavigate()
    const [trigger, setTrigger] = useState(true)

    const [list, setList] = useState([])
    const getList = async () => {
        const res = await axios.get("http://localhost:5000/findEmployee")
        //console.log(res.data);
        setList(res.data)
    }

    useEffect(() => {
        getList();
    }, [])

    useEffect(() => {

    }, [list])


    //Input Field
    const [sal, setSal] = useState(0)


    //Refresh
    const [refSal, setRefSal] = useState(0)


    const [salBreak, setSalBreak] = useState({
        'basic': '0',
        'hra': '0',
        'splAll': '0',
        'pf': '0',
        'it': '0',
        'grat': '0',
        'medIns': '0',
    })

    const [showName, setShowName] = useState("")

    const [id, setId] = useState("")
    const [empsId, setEmpsId] = useState("")

    const [open, setOpen] = useState(false);
    const handleOpen = (id, firstName, lastName, getempId) => {
        var showNames = firstName + " " + lastName
        setOpen(true);
        //console.log("ckd")
        setShowName(showNames)
        setId(id)
        setEmpsId(getempId)
    }


    const handleClose = async (id) => {
        setOpen(false);
        setRefSal(sal);
        console.log(empsId)
        const res = await axios.post("http://localhost:5000/updateSalary", {
            id: id,
            empId : empsId,
            salary: sal
        })
        if (res.data.modifiedCount == 1) {
            // window.alert("Salary Updated")
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: "Salary Updated"

            })
            // navigate("/payroll")
            setTrigger(!trigger)
           
            // window.location.reload()
        }else{
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Salary Not  Updated"

            })
        }
    }

    useEffect(() => {
        getList();
    }, [trigger])
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '95vh',
        bgcolor: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        boxShadow: 24,
        p: 4,
        fontSize: 14,
    };

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95vw',
        height: '95vh',
        bgcolor: 'white',
        border: '2px solid rgba(0,0,0,0.2)',
        boxShadow: 24,
        p: 4,
        fontSize: 14,
    };

    //DB
    const [values, setValues] = useState({
        'empName': '',
        'role': '',
    })


    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value,
        })
    }

    const calculateSalaryBreakdown = (sal) => {
        // console.log("Check"+sal)
        var perMon = sal / 12;
        perMon = perMon.toFixed(2);
        // console.log(perMon);
        var basic = Number((0.4 * perMon).toFixed(2));
        // console.log(basic);

        var hra = Number((0.2 * perMon).toFixed(2));
        // console.log(hra);
        var splAll = Number((0.17 * perMon).toFixed(2));
        // console.log(splAll);
        var pf = Number((0.08 * perMon).toFixed(2));
        // console.log(pf);
        var it = Number((0.05 * perMon).toFixed(2));
        // console.log(it);
        var grat = Number((0.05 * perMon).toFixed(2));
        // console.log(grat);
        var medIns = Number((0.05 * perMon).toFixed(2));
        // console.log(medIns);

        var grosstot = basic + hra + splAll - pf - it;
        // console.log(grosstot);
        setSalBreak({
            ['basic']: basic,
            ['hra']: hra,
            ['splAll']: splAll,
            ['pf']: pf,
            ['it']: it,
            ['grat']: grat,
            ['medIns']: medIns,
        })
        // handleChange('basic')


    }

    useEffect(() => {
        calculateSalaryBreakdown(sal);

    }, [sal, refSal])

    // console.log(refSal);


    const getEmployeeDataDepartment = async () => {
        const res = await axios.post("http://localhost:5000/findSpecificEmployee", {
            name: values.empName,
            role: values.role
        })
        // console.log(res.data)
        if (res.data.length != 0) {
            setList(res.data)
        } else {
            // window.alert("No such data found")
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "No such data found"

            })

            setList([])
        }

    }

    return (
        <>
            <div className="container mt-5 nempMain bg-light">
                <Heading
                    heading="Payroll"
                />
                <div className="container mt-5 mb-3">
                    <h4>Employee Salary</h4>
                </div>
                <hr />
                <div className="container mt-3 mb-5">
                    <div className="ms-5 mb-5 d-flex row justify-content-center">
                        <div className="col-md-4" >
                            <TextField
                                fullWidth
                                variant='outlined'
                                label="Employee Name"
                                value={values.empName}
                                onChange={handleChange('empName')}
                            />
                        </div>
                        <div className="col-md-4" >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role: </InputLabel>
                                <Select
                                    fullWidth
                                    variant='outlined'
                                    value={values.role}
                                    label="Select Role"
                                    onChange={handleChange('role')}
                                >
                                    <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
                                    <MenuItem value="Product Manager">Product Manager</MenuItem>
                                    <MenuItem value="Chief Architect">Chief Architect</MenuItem>
                                    <MenuItem value="Software Architect">Software Architect</MenuItem>
                                    <MenuItem value="Project Manager">Project Manager</MenuItem>
                                    <MenuItem value="Technical Lead">Technical Lead</MenuItem>
                                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                    <MenuItem value="Senior Software Developer">Senior Software Developer</MenuItem>
                                    <MenuItem value="Software Developer">Software Developer</MenuItem>
                                    <MenuItem value="Junior Software Developer">Junior Software Developer</MenuItem>
                                    <MenuItem value="Intern">Intern</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <Button variant='contained' style={{ width: '180px' }} onClick={getEmployeeDataDepartment}  >Search</Button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
                        <thead className="bg-dark text-light">
                            <tr className='text-center'>
                                <th class="th-sm">Employee Name
                                </th>
                                <th class="th-sm">Employee ID
                                </th>
                                <th class="th-sm">Email
                                </th>
                                <th class="th-sm">Join Date
                                </th>
                                <th class="th-sm">Role
                                </th>
                                <th class="th-sm">Salary
                                </th>
                                <th class="th-sm">Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="mb-1">
                            {
                                list.map((curr, index) => {
                                    return (
                                        <tr className="text-center">
                                            <td>{curr.firstname} {curr.lastname}</td>
                                            <td>{curr.employeeID}</td>
                                            <td>{curr.email}</td>
                                            <td>{curr.joinDate}</td>
                                            <td>{curr.role}</td>
                                            <td>{curr.salary}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Action
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li>
                                                            <Link className="dropdown-item" onClick={() => { handleOpen(curr._id, curr.firstname, curr.lastname, curr.employeeID) }}><i className="fa fa-edit"></i> Edit</Link>

                                                        </li>
                                                        <li>
                                                            <Link className="dropdown-item" to={`payroll/payslip/${curr._id}`}><i className="fa fa-file-text-o"></i> Generate Payslip</Link>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
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
                            Update Salary
                        </h5>
                        <hr className='mb-3' />
                        <div className="row container mb-3 mt-2 " >
                            <div className="col-md-6">
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="Employee Name"
                                    disabled
                                    value={showName}
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    variant='outlined'
                                    label="Salary"
                                    fullWidth
                                    value={sal}
                                    onChange={(e) => setSal(e.target.value)}
                                />
                            </div>
                        </div>
                        <hr className='mt-4 mb-5' />

                        <div className="row container">
                            <div className="row col-md-6 leftSide">
                                <div className="col-md-12 pb-3">
                                    <TextField
                                        fullWidth
                                        label="Basic (40%)"
                                        value={salBreak.basic}
                                        variant='outlined'
                                        disabled
                                    />
                                </div>
                                <div className="col-md-12 pb-3">
                                    <TextField
                                        fullWidth
                                        label="H.R.A (20%)"
                                        value={salBreak.hra}
                                        variant='outlined'
                                        disabled
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextField
                                        fullWidth
                                        label="Special Allowance(17%)"
                                        value={salBreak.splAll}
                                        variant='outlined'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 rightSide">
                                <div className="col-md-12 pb-3">
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="PF(8%)"
                                        value={salBreak.pf}
                                        variant='outlined'
                                    />
                                </div>
                                <div className="col-md-12 pb-3">
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="IT(5%)"
                                        value={salBreak.it}
                                        variant='outlined'
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr className="mb-4" />
                        <div className="row container col-md-7">
                            <div className="col-md-12 pb-3">
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Gratuity(5%)"
                                    value={salBreak.grat}
                                    variant='outlined'
                                />
                            </div>
                            <div className="col-md-12 pb-3">
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Medical Insurance(5%)"
                                    value={salBreak.medIns}
                                    variant='outlined'
                                />
                            </div>
                        </div>
                        <div className="container mt-3 d-flex justify-content-end">
                            <Button variant='contained' style={{ width: '180px' }} onClick={() => { handleClose(id) }} >
                                Update
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Payroll