import React, { useEffect, useState } from 'react'
import Heading from './SubComponents/Heading'
import { Link, useHistory } from 'react-router-dom'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { getAboutDetails, updateEmployeeProfile } from '../Apis/apis'
import Swal from 'sweetalert2'

const ProfileEdit = () => {
    // const history = useHistory()
    const [values, setValues] = useState({})

    const getProfileInfo = async () => {
        const res = await getAboutDetails();
        //console.log(res);
        setValues(res.data);
    }

    useEffect(() => {
        getProfileInfo();

    }, [])

    //console.log(values);

    const [change, setChange] = useState({
        mobile: values.mobile,
        telephone: values.phone,
        email: values.email,
        marital: values.marital,
        education: values.education
    });


    const handleChange = (prop) => (e) => {
        setChange({
            ...change,
            [prop]: e.target.value
        })
    }

    const updateProfile = async () => {
        const {mobile,telephone,email,marital,education} = change;
       if(mobile == 0){
        mobile = values.mobile
       }
       if(telephone == 0){
        telephone = values.phone
       }
       if(email == ""){
        email = values.email
       }
       if(marital == ""){
        marital = values.marital
       }
       if(education == ""){
        education = values.education
       }

       const data = {
        _id : values._id,
        mobile : mobile,
        phone : telephone,
        email : email,
        marital : marital,
        education : education
       }
       const response = await updateEmployeeProfile(data);
       //console.log(response);
       if(response.data.modifiedCount == 1){
        Swal.fire({
            icon: 'success',
            title: "Success",
            text: "Updated Successfully"

        })
        history.push("/")

       }else{
        Swal.fire({
            icon: 'error',
            title: "Server Error",
            text: "Cannot Update"

        })

       }
    }


    const history = useHistory();

    return (
        <>
            <div className="container bg-light nempMain mt-5 mb-5">
                <Heading
                    heading="Edit Employee Details  "
                />

                <div className="container mt-3 mb-3">
                    <h4> <Link onClick={() => { history.push('/viewemployee') }} className="homeBtn" > <ReplayRoundedIcon fontSize="small" />  Return </Link>  </h4>
                </div>
                <hr />
                <div className="container">


                    {/* ----------------- PERSONAL DETAILS ------------------ */}

                    <div class="tab-pane fade show active" id="edit-personal" role="tabpanel" aria-labelledby="edit-personal-tab">
                        <div className="container mt-4 mb-5 ">
                            <div className="row justify-content-center">
                                <label className="control-label d-flex text-right align-items-center col-md-2">
                                    First Name:
                                </label>
                                <div className="col-md-7">
                                    <TextField inputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} variant="standard" value={values.firstname} fullWidth label="First Name" size="small" />
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Last Name:
                                </label>
                                <div className="col-md-7">
                                    <TextField inputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} variant="standard" value={values.lastname} label="Last Name" fullWidth size="small" />
                                </div>
                            </div>

                            <br />

                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Birthday:
                                </label>
                                <div className="col-md-7">
                                    <TextField type="date" value={values.birthday} label="Birthday" InputLabelProps={{ shrink: true }} variant="standard" fullWidth size="small" />
                                </div>
                            </div>
                            <br />

                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Email:
                                </label>
                                <div className="col-md-7">
                                    <TextField label="Email" InputLabelProps={{ shrink: true }} value={change.email} variant="standard" fullWidth size="small" onChange={handleChange("email")} />
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Mobile Number:
                                </label>
                                <div className="col-md-7">
                                    <TextField label="Mobile Number" value={change.mobile} InputLabelProps={{ shrink: true }} variant="standard" fullWidth size="small" onChange={handleChange("mobile")} />
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Telephone Number:
                                </label>
                                <div className="col-md-7">
                                    <TextField label="Mobile Number" value={change.telephone} InputLabelProps={{ shrink: true }} variant="standard" fullWidth size="small" onChange={handleChange("telephone")} />
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Maritial Status:
                                </label>
                                <div className="col-md-7">
                                    <FormControl fullWidth variant="standard"  >
                                        <InputLabel id="demo-simple-select-label">Maritial Status </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={change.marital}
                                            label="Marital Status"
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange("marital")}
                                        >
                                            <MenuItem value={"Single"}>Single</MenuItem>
                                            <MenuItem value={"Married"}>Married</MenuItem>
                                            <MenuItem value={"Divorced"}>Divorced</MenuItem>
                                            <MenuItem value={"Widowed"}>Widowed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <label className="control-label d-flex align-items-center text-right col-md-2">
                                    Education Level:
                                </label>
                                <div className="col-md-7">
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Education Level </InputLabel>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={change.education}
                                            label="Education Level"
                                            onChange={handleChange("education")}
                                        >
                                            <MenuItem value={"Under Graduate"}>Under Graduate</MenuItem>
                                            <MenuItem value={'Bachelors Degree'}>Bachelors Degree</MenuItem>
                                            <MenuItem value={"Post Graduate"}>Post Graduate</MenuItem>
                                            <MenuItem value={"Associate"}>Associate</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <br />
                        </div>
                        <hr />
                        <div className="container d-flex mb-3 me-5 justify-content-end">
                            <Button variant="contained" style={{ width: "180px" }} onClick={updateProfile} > Update </Button>
                        </div>
                        <br />
                    </div>
                </div>




            </div>
        </>
    )
}

export default ProfileEdit