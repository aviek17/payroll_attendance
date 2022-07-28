import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Heading from './SubComponents/Heading'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useHistory } from 'react-router-dom'
import axios from "axios"

import Swal from 'sweetalert2'

const NewUser = () => {

    const history = useHistory()

    const Id = "Ad" + Math.trunc(performance.now())

    const [values, setValues] = useState({
        fullName: '',
        email: '',
        role: '',

        password: '',
        confirmPassword: '',
        showPassword: false,
        showConPassword: false
    });

    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value
        })
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleClickShowConPassword = () => {
        setValues({
            ...values,
            showConPassword: !values.showConPassword,
        });
    };

    const addAdmin = async () => {
        const res = await axios.post("http://localhost:5000/addAdmin", {
            //    name, email, role, password, conpassword
            name: values.fullName,
            email: values.email,
            role: values.role,
            id: Id,
            password: values.password,
            conpassword: values.confirmPassword
        })

        // window.alert(res.data.message)
        if(res.status == 201){
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: res.data.message

            })
            history.push("/")
        }else{
            Swal.fire({
                icon: 'error',
                title:"Error",
                text: res.data.message

            })
        }
    }

    return (
        <>
            <div className="container bg-light mt-5 nempMain">
                <Heading
                    heading="Add User"
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
                                        required
                                        label="Full Name"
                                        fullWidth
                                        onChange={handleChange('fullName')}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 ps-5 text-center control-label"> Email: </label>
                                <div className="col-md-5 me-5">
                                    <TextField
                                        variant='outlined'
                                        required
                                        label="Email"
                                        fullWidth
                                        onChange={handleChange('email')}
                                    // value={values.email}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 ps-5 text-center control-label"> Admin Id: </label>
                                <div className="col-md-5 me-5">
                                    <TextField
                                        variant='outlined'
                                        required
                                        fullWidth
                                        label="Admin Id:"
                                        value={Id}
                                        inputProps={
                                            { readOnly: true, }
                                        }
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
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            // value={values.role}
                                            label="Select Status:"
                                            onChange={handleChange('role')}
                                        >
                                            <MenuItem value={"system admin"}>System Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                            {/* -------------------- PassWord -------------------- */}
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 text-center ps-5 control-label"> Password </label>
                                <div className="col-md-5 me-5">

                                    <FormControl sx={{ width: '50ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput

                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            fullWidth
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                            <div className="row form-group justify-content-center d-flex">
                                <label className="col-md-3 text-center ps-5 control-label">Confirm Password </label>
                                <div className="col-md-5 me-5">

                                    <FormControl sx={{ width: '50ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showConPassword ? 'text' : 'password'}
                                            value={values.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConPassword}
                                                        edge="end"
                                                    >
                                                        {values.showConPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            fullWidth
                                            label="Confirm Password"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                            <div className='mt-3 justify-content-center d-flex'>
                                <Button variant='contained' style={{ width: '180px' }} className="mb-5" onClick={addAdmin}>
                                    Register
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

export default NewUser