import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Heading from './SubComponents/Heading'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios'

const EmployeeProfile = () => {
    const {id} = useParams();
    const [list,setList] = useState({})

    const getInfo = async ()=>{
        const res = await axios.post("http://localhost:5000/empInfo",{
            id : id
        })

        // console.log(res.data);
        setList(res.data)
    }

    useEffect(() => {
        getInfo();
    }, [])
    

  return (
    <>
        <div className="container mt-5 mb-5 nempMain bg-light">
            <Heading
                heading="Profile"
            />
            <div className="mt-5 mb-3 container">
                <h4>Employee Profile</h4>
            </div>
            <hr />
            <div className="container mt-5 row">
                
                {/* ----------------- LEFT SIDE ------------------- */}
                
                <div className="left col-md-5">
                    <h5 className="mb-2 pt-2"> <PersonRoundedIcon /> {list.firstname} {list.lastname}</h5>
                     <h5 className="mt-3 pt-2"> <BadgeIcon /> {list.employeeID} </h5> 
                     <h5 className="mt-3 pt-2"> <WorkIcon /> {list.role} </h5>
                     {/* <Button variant="contained" href="edit?id=21" startIcon={<EditIcon fontSize='inherit' />} > Edit </Button>    */}
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
                                        <TextField disabled variant="standard" value={list.gender} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                           BirthDay:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.birthday} fullWidth hiddenLabel size="small"  />
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
                                        <TextField disabled variant="standard" value={list.email} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Mobile Number:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.mobile} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Telephone:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.phone} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Maritial Status:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.marital} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Education Level:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.education} fullWidth hiddenLabel size="small"  />
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
                                        <TextField disabled variant="standard" value={list.role} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                           Employment Type:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.employmentType} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                {/* <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Tenure:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value="2" fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div> */}
                                {/* <br /> */}
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                            Salary(Rs):
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.salary} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <label className="control-label col-md-5"> 
                                           Date of Joining:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.joinDate} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div>
                                <br />
                                {/* <div className="row">
                                    <label className="control-label col-md-5"> 
                                           Role:
                                    </label>
                                    <div className="col-md-7">
                                        <TextField disabled variant="standard" value={list.role} fullWidth hiddenLabel size="small"  />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}

export default EmployeeProfile