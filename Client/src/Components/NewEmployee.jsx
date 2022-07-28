import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import {pink} from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// import Datepicker from './SubComponents/Heading';
import { Button } from '@mui/material';
import Heading from './SubComponents/Heading'
import axios from "axios"

import Swal from 'sweetalert2'



const NewEmployee = () => {

    const history = useHistory();
    //--------------------- STEP 1: ---------------------

    const [marStatus, setMarStatus] = useState('');

    const handleMarStatus = (event) => {
        setMarStatus(event.target.value);

    };


    const [eduStatus, setEduStatus] = useState('');

    const handleEduStatus = (event) => {
        setEduStatus(event.target.value);
    };


    const [selectedDate, setSelectedDate] = useState('0000-00-00');
    const [age, setAge] = useState();

    const changeDate = (e) => {
        setSelectedDate(e.target.value);
    }

    const findAge = (dob) => {
        let date = new Date();
        // //console.log(date);
        let yr = date.getFullYear();
        let mm = date.getMonth() + 1;
        // //console.log(yr + " " + mm );
        let selDate = dob;
        let selDateArr = selDate.split("-");
        // //console.log(selDateArr);
        let age = 0;
        if (dob === '0000-00-00') {
            age = 0;
        } else if (mm >= selDateArr[1] && selDateArr[0] != yr) {
            age = yr - selDateArr[0];
        } else if (mm <= selDateArr[1] && selDateArr[0] != yr) {
            age = yr - selDateArr[0] - 1;
        }
        // //console.log(age);

        setAge(age);
    }


    //---------------- STEP 2: --------------------

    
    const [role, setRole] = useState('');

    const handleRole = (event) => {
        setRole(event.target.value);
        //console.log(role);
    };
    const [empType, setEmpType] = useState('');

    const handleEmpType = (event) => {
        setEmpType(event.target.value);
        //console.log(empType);
    };

    const [stat, setStat] = useState('');

    const handleStat = (event) => {
        setStat(event.target.value);
        //console.log(stat);
    };
    const [perPos, setPerPos] = useState('');

    const handlePerPos = (event) => {
        setPerPos(event.target.value);
        //console.log(perPos);
    };

    const [dateJoin, setDateJoin] = useState();

    const dateOfJoining = (e) => {
        setDateJoin(e.target.value)
        //console.log(dateJoin);
    }


    // Main Page
    // const history = useHistory();

    //console.log(selectedDate)


    // USE EFFECT
    useEffect(() => {
        findAge(selectedDate);
    }, [selectedDate])



    let name, value

    // Name
    const [sname, setName] = useState({
        fullname: "",
        middlename: "",
        lastname: ""
    })

    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: ""
    })

    const [contact, setContact] = useState({
        email: "",
        mobile: "",
        phone: ""
    })
    const [gender, setGender] = useState("")
    const [salary, setSalary] = useState(0)

    const salaryFunc = (event) => {
        setSalary(event.target.value)
    }

    const genderFunc = (event) => {
        setGender(event.target.value)
    }

    const handleInputs = (event) => {
        name = event.target.name
        value = event.target.value

        setName({ ...sname, [name]: value })
        setAddress({ ...address, [name]: value })
        setContact({ ...contact, [name]: value })
    }

    const empId = Math.trunc( performance.now()+Math.random())
   ;
   //console.log(performance.now());



    // sending to backend

    const addEmployee = async () => {
        // firstname, lastname, streetAdd, city, state, zip, gender, birthday,
        //     email, phone, marital, education, employeeID,
        //     role, joinDate, employmentType

        const res = await axios.post("http://localhost:5000/addEmployee",{
            firstname : sname.fullname,
            middlename : sname.middlename,
            lastname : sname.lastname,
            streetAdd : address.street,
            city : address.city,
            state : address.state,
            zip : address.zip,
            gender : gender,
            birthday : selectedDate,
            email : contact.email, 
            mobile : contact.mobile,
            phone : contact.phone,
            marital : marStatus,
            education : eduStatus,
            employeeID : empId,
            role : role, 
            joinDate : dateJoin,
            employmentType : empType,
            salary : salary

        })

       if(res.status===201){
        //    window.alert("Employee added successfully")
        Swal.fire({
            icon: 'success',
            title: "Success",
            text: "Employee added successfully"

        })
           history.push("/viewemployee");
       }else{
        // window.alert("Failed to add")
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: "Failed to add"

        })
       }
    }



    return (
        <>
            <div className="container bg-light mb-5 mt-5 nempMain">

                {/* --------------Step 1------------------ */}

                <Heading
                    heading="Add Employees"
                />

                <div className="container mt-5 mb-5">
                    <div className="d-flex mt-3 align-items-center">
                        <h4>Step 1 : <span className="empHead"> Personal details </span> </h4>
                    </div>
                    <hr />
                    <div className="container mt-5" >

                        {/* ---------------- Full Name ----------------- */}

                        <div className="form-group row justify-content-center">
                            <label className="col-md-2 control-label"> Full Name: </label>
                            <div className="col-md-3" >
                                <TextField id="outlined" label="First Name" name="fullname" required fullWidth value={sname.fullname} onChange={handleInputs} />
                            </div>
                            <div className="col-md-3">
                                <TextField id="outlined" label="Middle Name" name="middlename" fullWidth value={sname.middlename} onChange={handleInputs} />
                            </div>
                            <div className="col-md-3">
                                <TextField id="outlined" label="Last Name" name="lastname" fullWidth required value={sname.lastname} onChange={handleInputs} />
                            </div>
                        </div>
                        <br />


                        {/* ------------------- Address ----------------------  */}
                        <div className="form-group row justify-content-around">
                            <label className="col-md-1 control-label"> Address: </label>
                            <div className="col-md-9" >
                                <TextField id="outlined" label=" Street Address" name="street" fullWidth required value={address.street} onChange={handleInputs} />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row justify-content-around me-4 ps-2 pe-3 ms-4">
                            <div className="col-md-4">
                                <TextField id="outlined" fullWidth label="City" name="city" required value={address.city} onChange={handleInputs} />
                            </div>
                            <div className="col-md-4">
                                <TextField id="outlined" fullWidth label="State" name="state" required value={address.state} onChange={handleInputs} />
                            </div>
                            <div className="col-md-4">
                                <TextField type="number" id="outlined" fullWidth label="Zip Code" name="zip" required value={address.zip} onChange={handleInputs} />
                            </div>
                        </div>
                        <br />

                        {/* ----------------------- Gender & Birthday ---------------------- */}

                        <div className="form-group row justify-content-between me-4 ps-2 pe-3 ms-4">
                            <label className="col-md-1 control-label"> Gender:  </label>
                            <div className="col-md-3">
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={gender}
                                    label="Select Status:"
                                    onChange={genderFunc }

                                >
                                    <FormControlLabel value="Female" color="success" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </div>
                            <label className="col-md-1">  Birthday:  </label>
                            <div className="col-md-3 ">
                                <input type="date" className="form-control " onChange={changeDate} />
                            </div>
                            <label className="col-md-1 control-label">Age: </label>
                            <div className="col-md-3">
                                <input type="text" value={age} className="form-control text-center" id="age" disabled placeholder="Age" />
                            </div>
                        </div>
                        <br />

                        {/* ---------------------- Contact ---------------------- */}

                        <div className="form-group row justify-content-center">
                            <label className="col-md-2 control-label"> Contact: </label>
                            <div className="col-md-3" >
                                <TextField id="outlined" label="Email" type="email" required fullWidth name="email" value={contact.email} onChange={handleInputs} />
                            </div>
                            <div className="col-md-3">
                                <TextField id="outlined" label="Mobile" type="number" fullWidth name="mobile" value={contact.mobile} onChange={handleInputs} />
                            </div>
                            <div className="col-md-3">
                                <TextField id="outlined" label="Telephone" type="number" fullWidth name="phone" value={contact.phone} onChange={handleInputs} />
                            </div>
                        </div>
                        <br />

                        {/* --------------------------Maritial Status & Education Level----------------------- */}

                        <div className="form-group row justify-content-around">
                            <label className="col-md-1 control-label"> Maritial Status: </label>
                            <div className="col-md-4" >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Status: </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={marStatus}
                                        label="Select Status:"
                                        onChange={handleMarStatus}
                                    >
                                        <MenuItem value={"Single"}>Single</MenuItem>
                                        <MenuItem value={"Married"}>Married</MenuItem>
                                        <MenuItem value={"Divorced"}>Divorced</MenuItem>
                                        <MenuItem value={"Widowed"}>Widowed</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <label className="col-md-1 control-label">Select Education Level: </label>
                            <div className="col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Education Level: </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={eduStatus}
                                        label="Select Education Level:"
                                        onChange={handleEduStatus}
                                    >
                                        <MenuItem value={"Associate Degree"}>Associate Degree</MenuItem>
                                        <MenuItem value={"Bachelors Degree"}>Bachelor's Degree</MenuItem>
                                        <MenuItem value={"Masters Degree"}>Master's Degree</MenuItem>
                                        <MenuItem value={"Doctoral Degree"}>Doctoral Degree</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <br />
                    <hr />

                    {/*------------------------- Step 2 ------------------------*/}

                    <div className="d-flex mt-5 mb-3 align-items-center">
                        <h4>Step 2 : <span className="empHead"> Employment details </span> </h4>
                    </div>
                    <hr />
                    <div className="container mb-5 mt-5">

                        {/* ----------------------- Employee ID & Permanent Status --------------------- */}

                        <div className="form-group row justify-content-around">
                            <label className="col-md-1 control-label"> Employee ID: </label>
                            <div className="col-md-4" >
                                <TextField id="outlined" label="Employee ID" disabled required fullWidth value={empId} readOnly={true} />
                            </div>
                            <label className="col-md-1 control-label"> Permanent: </label>
                            <div className="col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Permanent Position: </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={perPos}
                                        label="Permanent Position"
                                        onChange={handlePerPos}
                                    >
                                        <MenuItem value={"No"}>No</MenuItem>
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <br />
                        {/* ------------------ Date of Joining && Role -------------------------- */}

                        <div className="form-group row justify-content-around">
                            <label className="col-md-1 control-label"> Date of Joining </label>
                            <div className="col-md-4" >
                                <input type="date" className="form-control" onChange={dateOfJoining} />
                            </div>
                            <label className="col-md-1 control-label"> Role: </label>
                            <div className="col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Select Department"
                                        onChange={handleRole}
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
                        </div>
                        <br />


                        {/* ----------------------------- Employment Type & Salary --------------------------- */}


                        <div className="form-group row justify-content-around">
                            <label className="col-md-1 control-label"> Employment Type: </label>
                            <div className="col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Employment Type: </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={empType}
                                        label="Select Employment Typr"
                                        onChange={handleEmpType}
                                    >
                                        <MenuItem value={"Full Time"}>Full Time</MenuItem>
                                        <MenuItem value={"Part Time"}>Part Time</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <label className="col-md-1 control-label"> Salary: </label>
                            <div className="col-md-4">
                                <TextField id="outlined" label="Salary" required fullWidth name="salary" value={salary} onChange={salaryFunc} />
                            </div>
                        </div>
                        <br />



                    </div>
                </div>
                <br />




                {/* ---------------- Submit Button ------------- */}

                <div className='me-5  empSubDiv '>
                   <button class="newwEmplSubmit" onClick={addEmployee}>
                        Submit
                   </button>
                </div>


            </div>
        </>
    )
}

export default NewEmployee;