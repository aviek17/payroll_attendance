import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Heading from './SubComponents/Heading'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import axios from "axios";
import Swal from 'sweetalert2'

const EditUser = () => {

    const history = useHistory();
    // let navigate = useNavigate();
    // console.log(history.location.pathname)
    const {id} = useParams()

    const [values, setValues] = useState({
        fullName: '',
        email: '',
        role: '',
    });

    const [emp, setEmp] = useState({})

    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value
        })
    }

    const getEmployee = async() => {
        const response = await axios.post("http://localhost:5000/empInfo",{
            id : id
        })

        // console.log(response.data)
        setEmp(response.data)
        values.fullName = response.data.firstname + " " + response.data.lastname
        values.email = response.data.email

        // console.log(values.fullName);
    }

    useEffect(() => {
        getEmployee()
    }, [])
    

    const updateUser = async() =>{
        const response = await axios.post("http://localhost:5000/updateUserRole",{
            _id : id,
            role : values.role
        })

        if(response.data.modifiedCount == 1){
            // window.alert("Updated Successfully");
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: "Updated Successfully"

            })
           history.push("/viewuser")
        }else{
            // window.alert("Cannot be updated");
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Cannot be updated"

            })
        }
    }

    // console.log(emp);
    return (
          <>
            <div className="container mt-5 employee nempMain">
                <Heading
                    heading="Edit User"
                />

                <div className="container  mt-5 mb-5">
                    <div className="d-flex mt-3 align-items-center">
                        <h4> New User Form </h4>
                    </div>
                    <hr />
                    <div className="container mt-5" >
                        <div className="container mt-5 mb-5">
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 ps-5 text-center control-label"> Full Name: </label>
                                <div className="col-md-5 me-5">
                                    <TextField
                                        variant='outlined'
                                        // disabled
                                        label="Full Name"
                                        fullWidth
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        value={emp.firstname + " " + emp.lastname}
                                    // onChange={handleChange('fullName')}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 ps-5 text-center control-label"> Email: </label>
                                <div className="col-md-5 me-5">
                                <TextField
                                        variant='outlined'
                                        // disabled
                                        label="Email"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink:true
                                        }}
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        value={emp.email}
                                    // onChange={handleChange('fullName')}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="form-group row justify-content-center">
                                <label className="col-md-3  text-center ps-5 control-label"> Role: </label>
                                <div className="col-md-5 me-5" >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Role: </InputLabel>
                                        <Select

                                            // value={values.role}
                                            label="Select Status:"
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
                                            <MenuItem value="HR">HR Admin</MenuItem>
                                            <MenuItem value="Admin">System Administrator</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                            <div className='mt-3 justify-content-center d-flex'>
                            <Button variant='contained'  className="mb-5" onClick={updateUser}>
                                Update
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </>
    )
}

export default EditUser