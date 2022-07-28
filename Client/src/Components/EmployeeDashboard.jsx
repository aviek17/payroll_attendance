import React, { useState, useEffect } from 'react'
import Heading from './SubComponents/Heading'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Button, FormControl, InputLabel, InputAdornment, Modal, OutlinedInput, TextField, IconButton } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import PasswordIcon from '@mui/icons-material/Password';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import { Link } from 'react-router-dom';
import { getAboutDetails, changePassword } from "../Apis/apis";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2'

// import Cookies from 'js-cookie'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderLeft: '2px solid #000',
    borderBottom: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',

};


const EmployeeDashboard = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = useState({
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

    const [list, setList] = useState({})




    // console.log(Cookies.get('lmstoken'))
    const [value, setValue] = useState({})
    const getInfo = async () => {
        const res = await getAboutDetails();
        // console.log(res.data);
        setValue(res.data)
        setList(res.data)
        window.localStorage.setItem("e",res.data.employeeID)
    }

    // console.log(value);

    window.localStorage.setItem("role", value.role)
    window.localStorage.setItem("id", value._id)

    useEffect(() => {
        getInfo();
    }, [])


    const changeEmployeePassword = async () => {
        // console.log(54647);
        if (values.password != values.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Password and Confirm password must be same"

            })
        } else {
            const data = {
                password: values.password,
                type: "Employee",
                _id: list._id
            }
            const response = await changePassword(data);
            if (response.data.modifiedCount == 1) {
                Swal.fire({
                    icon: 'success',
                    title: "Success",
                    text: "Password Changed"

                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Password cannot be changed"

                })
            }
        }
        setOpen(false)
    }


    return (
        <>
            <div className="container mt-5 mb-5 nempMain bg-light">

                <div className="mt-4 pt-5 mb-3 container d-flex justify-content-between">
                    <h4 className="display-6">Employee Dashboard</h4>
                    <div className="mt-1">
                        <Button variant="contained" className="me-3" startIcon={<EditIcon fontSize='inherit' />} > <Link className="editLink" to={`/viewemployee/edit/${window.localStorage.getItem("id")}`}>Edit</Link>  </Button>
                        <Button variant="contained" onClick={handleOpen} startIcon={<PasswordIcon fontSize='inherit' />} > Change Password </Button>

                    </div>
                </div>
                <hr />
                <div className="container mt-5 row">

                    {/* ----------------- LEFT SIDE ------------------- */}

                    <div className="left col-md-5">
                        <h5 className="mb-2"> <PersonRoundedIcon /> {value.firstname} {value.lastname}</h5>
                        <p> <LocationOnIcon /> {list.city} {value.state}  </p>
                        <p> <WorkIcon /> {value.role} </p>

                    </div>

                    {/* ---------------------- RIGHT SIDE ----------------------- */}

                    <div className="right col-md-7">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal Details</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#employment" type="button" role="tab" aria-controls="employment" aria-selected="false">Employment Details</button>
                            </li>

                        </ul>

                        {/* ----------------  CONTENT --------------------- */}

                        <div class="tab-content" id="myTabContent">

                            {/* ----------------- PERSONAL DETAILS -------------  */}

                            <div class="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                                <div className="container mt-3">
                                    <h6> <PersonIcon /> Personal Details</h6>
                                </div>
                                <hr />
                                <div className="container mt-2 mb-5">
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Gender:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.gender} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            BirthDay:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.birthday} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    {/* <div className="row">
                                        <label className="control-label col-md-5"> 
                                                Age:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value="23" fullWidth hiddenLabel size="small"  />
                                        </div>
                                    </div>
                                    <br /> */}
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Email:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.email} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Mobile Number:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.mobile} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Telephone:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.phone} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Maritial Status:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.marital} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Education Level:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.education} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>

                            {/* ----------------- EMPLOYMENT DETAILS --------------  */}

                            <div class="tab-pane fade" id="employment" role="tabpanel" aria-labelledby="employment-tab">
                                <div className="container mt-3">
                                    <h6> <WorkRoundedIcon /> Employment Details</h6>
                                </div>
                                <hr />
                                <div className="container mt-2 mb-5">
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Department:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.role} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Employment Type:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.employmentType} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Salary(Rs):
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={"Rs. " + list.salary} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <label className="control-label col-md-5">
                                            Date of Joining:
                                        </label>
                                        <div className="col-md-7">
                                            <TextField disabled variant="standard" value={list.joinDate} fullWidth hiddenLabel size="small" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="row mt-2 form-group justify-content-center d-flex">
                        <label className="col-md-5 text-center mt-2  control-label"> Password : </label>
                        <div className="col-md-7 ">

                            <FormControl sx={{ width: '30ch' }} variant="outlined">
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
                        <label className="col-md-5 text-center control-label">Confirm Password : </label>
                        <div className="col-md-7">

                            <FormControl sx={{ width: '30ch' }} variant="outlined">
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
                    <div className="d-flex justify-content-end me-5 pe-3">
                        <Button variant="contained" onClick={changeEmployeePassword} > Update </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EmployeeDashboard