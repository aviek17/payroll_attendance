import React, { useState, useEffect } from 'react'
import Heading from './SubComponents/Heading'

import { Backdrop, Box, Button, Modal, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const LeaveSettings = () => {

    const [leaveInfo, setLeaveInfo] = useState([])

    const getLeaveInfo = async () => {
        const res = await axios.get("http://localhost:5000/allLeaveTypes");
        // //console.log(res.data)
        setLeaveInfo(res.data)
    }

    useEffect(() => {
        getLeaveInfo();
    }, [])



    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        lname: '',
        ldesc: '',
        lnum: 0
    });

    const [edit, setEdit] = useState({
        descriptions: '',
        maxDays: 0,
    });
    const handleOpen = () => setOpen(true);
    const handleClose = async () => {

        setOpen(false)

    };

    const AddLeave = async () => {
        // //console.log(22545);
        const response = await axios.post("http://localhost:5000/addLeave", {
            name: values.lname,
            description: values.ldesc,
            maxDays: values.lnum
        })

        // console.log(response.status);
        if (response.status === 200) {
            // window.alert("New leave type added")
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: "New leave type added"

            })

        } else {
            // window.alert("New Leave not added")
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "New Leave not added"

            })
        }

        setValues({
            ...values,
            lname: "",
            ldesc: "",
            lnum: 0
        })
    }

    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = (id, name) => {
        setId(id)
        setName(name)
        setOpenEdit(true);
    }

    const handleCloseEdit = async (id) => {
        //console.log((values.ldesc));
        //console.log((values.lnum));

        const res = await axios.post("http://localhost:5000/updateLeaveTypes", {
            _id: id,
            description: values.ldesc,
            maxDays: values.lnum
        })

       if(res.data.modifiedCount == 1){
        // window.alert("Updated successfully")
        Swal.fire({
            icon: 'success',
            title: "Success",
            text: "Updated successfully"

        })
       }else{
        // window.alert("Failed to update")
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: "Failed to update"

        })
       }


        setValues({
            ...values,
            lname: '',
            ldesc: '',
            lnum: 0
        })
        //console.log(id);
        //console.log();

        setOpenEdit(false);
    };



    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value
        })


    }

    const handleChanges = (prop) => (e) => {

        setEdit({
            ...values,
            [prop]: e.target.value
        })
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '380px',
        borderRadius: '13px',
        bgcolor: 'background.paper',
        borderLeft: '2px solid #000',
        borderBottom: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontSize: 14,
    };


    const deleteLeave = async (id,name) => {
        const res = await axios.post("http://localhost:5000/deleteLeavetype",{
            _id : id,
            name : name
        })

       //console.log(res);
       if(res.data.deletedCount == 1){
        // window.alert("Deleted Successfully")
        Swal.fire({
            icon: 'success',
            title: "Success",
            text: "Deleted Successfully"

        })
       }else{
        // window.alert("Deletion failed")
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: "Deletion failed"

        })
       }
    }

    return (
        <>
            <div className="container nempMain bg-light mt-5 mb-5">
                <Heading
                    heading="Leave Types"
                />
                <div className="container main_div mt-5 mb-5 justify-content-center">
                    <div className="row">
                        {
                            leaveInfo.map((currEle, ind) => {
                                return (
                                    <div className="col-md-3">
                                        <div className="card mt-2 mb-2">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className=" card-title" style={{ fontSize: "22px" }}>{currEle.name}</h5>

                                                </div>

                                                <div className="row d-flex justify-content-between align-items-center">
                                                    <h5 className="  card-desc" style={{ fontSize: "18px" }}>{currEle.description}</h5>
                                                </div>

                                                <p className="card-text" style={{ fontSize: "14px" }}>Max Days allowed : {currEle.maxDays}</p>
                                                <div className="d-flex justify-content-end">

                                                    <Button variant="contained" className="me-2" onClick={() => { handleOpenEdit(currEle._id, currEle.name) }}>
                                                        <EditIcon />
                                                    </Button>
                                                    <Button variant="contained" onClick={()=>{deleteLeave(currEle._id, currEle.name)}} >
                                                        <DeleteIcon />
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className=" AddLeave" onClick={handleOpen} style={{ display: "inline-block" }}>
                    <Button variant='contained' className='mb-5' style={{ width: '180px' }}>
                        Add Leave
                    </Button>
                </div>







            </div>

            <Modal

                open={openEdit}
                onClose={handleCloseEdit}
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
                        <div className="container " >
                            <TextField
                                inputProps={
                                    { readOnly: true }
                                }
                                value={name}
                                fullWidth
                                variant='outlined'
                                label='Leave Name'
                                className="m-2"
                            />

                            <TextField
                                fullWidth
                                variant='outlined'
                                // label='Leave Description'
                                className="m-2"
                                onChange={handleChange('ldesc')}
                                value={values.ldesc}

                            />

                            <TextField
                                inputProps={
                                    { type: 'number' }
                                }
                                fullWidth
                                variant='outlined'
                                // label='Max Days Allowed'
                                className="m-2"
                                onChange={handleChange('lnum')}
                                value={values.lnum}
                            />

                        </div>
                        <div className="container mb-2 mt-2 d-flex justify-content-end">
                            <Button variant='contained' onClick={() => { handleCloseEdit(id) }} > Update </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
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
                        <div className="container " >
                            <TextField
                                fullWidth
                                inputProps={
                                    { autocomplete: "off" }
                                }
                                variant='outlined'
                                label='Leave Name'
                                className="m-2"
                                onChange={handleChange('lname')}
                                value={values.lname}
                            />

                            <TextField
                                fullWidth
                                inputProps={
                                    { autocomplete: "off" }
                                }
                                variant='outlined'
                                label='Leave Description'
                                className="m-2"
                                onChange={handleChange('ldesc')}
                                value={values.ldesc}
                            />

                            <TextField
                                inputProps={
                                    {
                                        type: 'number',
                                        autocomplete: 'off'
                                    }
                                }

                                fullWidth
                                variant='outlined'
                                label='Max Days Allowed'
                                className="m-2"
                                onChange={handleChange('lnum')}
                                value={values.lnum}
                            />

                        </div>
                        <div className="conatainer mb-2 mt-2 d-flex justify-content-end">
                            <Button variant='contained' onClick={AddLeave} > Add </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default LeaveSettings