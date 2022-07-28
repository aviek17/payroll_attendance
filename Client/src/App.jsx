import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginImage from "./Images/login-page.svg"
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import ViewEmployee from './Components/ViewEmployee';
import NewEmployee from './Components/NewEmployee';
import ManualAttendance from './Components/ManualAttendance';
import NewUser from './Components/NewUser';
import ViewUser from './Components/ViewUser';
import EditUser from './Components/EditUser';
import ReportAttendance from './Components/ReportAttendance';
import ViewAttendance from './Components/ViewAttendance';
import ViewLeave from './Components/ViewLeave';
import ReportLeave from './Components/ReportLeave';
import AddRole from './Components/AddRole';
import ViewRole from './Components/ViewRole';
import Payroll from './Components/Payroll';
import EmployeeProfile from './Components/EmployeeProfile';
import ProfileEdit from './Components/ProfileEdit';
import Login from './Components/LogIn';
import Logout from './Components/LogOut';
import Payslip from './Components/Payslip';
import EmployeeSidebar from './Components/EmployeeSidebar';
import EmployeeDashboard from './Components/EmployeeDashboard';
import LeaveApplication from './Components/LeaveApplication';
import EmployeeViewAttendance from './Components/EmployeeViewAttendance';
import EmployeeEditAttendance from './Components/EmployeeEditAttendance';
import LeaveSettings from './Components/LeaveSettings'
import EmployeePayroll from "./Components/EmployeePayroll"
import EmployeeViewLeaves from './Components/EmployeeViewLeaves'
import { goLogOut } from "./Apis/apis"
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  // const history = useHistory();

  const [sets, setSets] = useState(false)
  const [localstore, setLocalStore] = useState("")

  // setSets(window.localStorage.getItem("loggedState"))

  // console.log(localstore)
  // console.log(sets)




  // login
  const history = useHistory();
  let name, value

  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    type: "Employee",
    showPassword: false,
  })


  const handleInputs = (props) => (event) => {
    
    setUserLog({ ...userLog, [props]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setUserLog({
      ...userLog,
      showPassword: !userLog.showPassword,
    });
  };


  const PostData = async (event) => {
    event.preventDefault()
    const { email, password, type } = userLog;
    // console.log(userLog)
    // const res = await axios.post("http://localhost:5000/login",{
    //   email:email, password:password
    // })

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employeeId: email, password: password, type: type
      })
    })

    // console.log(res);
    const data = await res.json()
    // console.log(data);
    // console.log(data.message)
    // console.log(data.response.role);

    if (data.message == "success") {
      // toast.error("Successfully logged in")
      toast.success('Successfully Logged In', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // window.alert("Success")
      // window.localStorage.setItem("loggedState", true)
      // window.location.reload()
      setSets(true)
      setLocalStore(data.response.role)
      history.push("/")
      window.localStorage.setItem('name',data.response.name)

    } else {
      // window.alert("Not Success")
      toast.error('Log In Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  const response = async () => {
    const res = await goLogOut();
    // console.log(res)
    // window.localStorage.setItem("loggedState", false)
    setSets(false)
    setLocalStore("")
    setUserLog({
      email: "",
      password: "",
      type: "Employee"
    })
    if(res.data.message == "Logged out Successfully"){
      window.localStorage.clear();
      toast.success('Logged Out', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
      toast.error('Cannot logged out', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // history.push("/login")
  }

  useEffect(() => {
    // console.log(sets)
  }, [sets])


  return (

    <>
      {

        (sets === true) ?
          <>
            <Switch>
              <div>
                {
                  (localstore === "system admin") ?
                    <div>
                      <Sidebar response={response} />
                      <Switch>
                        <Route exact path='/' component={Dashboard} />
                        {/* ---------------- VIEW EMPLOYEE ----------------- */}
                        <Route exact path='/viewemployee' component={ViewEmployee} />
                        {/* ------------------- VIEW EMPLOYEE ---> PROFILE ------------------ */}
                        <Route exact path='/viewemployee/profile/:id' component={EmployeeProfile} />
                        {/* ------------------ NEW EMPLOYEE ------------------ */}
                        <Route exact path='/newemployee' component={NewEmployee} />

                        {/* -------------- MANUAL ATTENDANCE ----------------- */}
                        <Route exact path='/attendance' component={ManualAttendance} />

                        {/* -------------------- PAYROLL --------------------- */}
                        <Route exact path='/payroll' component={Payroll} />

                        {/* ---------------- ADD NEW USER -------------------    */}
                        <Route exact path='/adduser' component={NewUser} />

                        {/* -------------------- ADD ROLE -----------------------  */}
                        <Route exact path='/addrole' component={AddRole} />

                        {/* ------------------ VIEW USER -------------------- */}
                        <Route exact path='/viewuser' component={ViewUser} />

                        {/* -------------------- VIEW ROLE --------------------  */}
                        <Route exact path='/viewrole' component={ViewRole} />

                        {/* ------------------------- VIEW ATTENDANCE ----------------------- */}
                        <Route exact path='/viewattendance' component={ViewAttendance} />
                        {/* ------------------------ VIEW LEAVE ---------------------- */}
                        <Route exact path='/viewleave' component={ViewLeave} />
                        <Route exact path='/leavesetting' component={LeaveSettings} />
                        <Route exact path='/viewuser/edituser/:id' component={EditUser} />
                        <Route exact path='/reportattendance' component={ReportAttendance} />

                        {/* --------------------- REPORT -----> LEAVES ---------------------- */}
                        <Route exact path='/reportleaves' component={ReportLeave} />
                        <Route exact path='/payroll/payslip/:id' component={Payslip} />
                        <Route exact path='/employee/payroll/payslip/:id' component={Payslip} />
                        {/* <Route exact path='/viewemployee/edit/:id' component={ProfileEdit} /> */}
                      </Switch>

                    </div>
                    :
                    <div>
                      <EmployeeSidebar response={response} />
                      <Switch>
                        <Route exact path='/' component={EmployeeDashboard} />
                        <Route exact path='/adduser' component={NewUser} />
                        <Route exact path='/leaveapplication' component={LeaveApplication} />
                        <Route exact path='/employee/payroll/:id' component={Payslip} />
                        <Route exact path='/employeeviewattendance' component={EmployeeViewAttendance} />
                        <Route exact path='/employeeviewattendance/edit' component={EmployeeEditAttendance} />
                        <Route exact path='/employeeviewleaves' component={EmployeeViewLeaves} />
                        {/* ---------------------- VIEW EMPLOYEE ---> EDIT PROFILE ------------------ */}
                        <Route exact path='/viewemployee/edit/:id' component={ProfileEdit} />
                        {/* -------------- MANUAL ATTENDANCE ----------------- */}
                        <Route exact path='/attendance' component={ManualAttendance} />
                        <Route exact path='/logout' component={Logout} />
                      </Switch>
                    </div>
                }

              </div>
            </Switch>

          </>

          :

          <div>

            {


              <div className="logInDiv">

                <div className="row ">
                  <div className="col-md-6  logLeftSide">

                    <div className="content container d-flex flex-column align-items-center justify-content-center">
                      <h2 className="display-5 mb-5" style={{ textShadow: '1px 1px 10px rgba(0,0,0,0.8)' }}>
                        Login Here
                      </h2>
                      <div className="container d-flex justify-content-center mt-2 mb-4">
                        <ToggleButtonGroup
                          color="primary"
                          value={userLog.type}
                          exclusive
                          name="type"
                          onChange={handleInputs('type')}
                        >
                          <ToggleButton value="Employee">Employee</ToggleButton>
                          <ToggleButton value="Admin">Admin</ToggleButton>
                        </ToggleButtonGroup>
                      </div>

                      <div className="row mt-4 form-group w-100 justify-content-center d-flex">
                        <label className="col-md-3 text-center mt-2  control-label"> User ID : </label>
                        <TextField
                          variant="outlined"
                          label="User ID"
                          value={userLog.email}
                          name="email"
                          onChange={handleInputs('email')}
                          className="form-control col-md-9" style={{ width: '35ch' }} />
                      </div>
                      <div className="row mt-4 form-group w-100 justify-content-center d-flex">
                        <label className="col-md-3 text-center mt-2  control-label"> Password : </label>
                        <FormControl className="col-md-9" sx={{ width: '35ch' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            style={{ background: "white" }}
                            id="outlined-adornment-password"
                            type={userLog.showPassword ? 'text' : 'password'}
                            value={userLog.password}
                            onChange={handleInputs('password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {userLog.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            fullWidth
                            label="Password"
                          />
                        </FormControl>
                      </div>
                      <div className="container d-flex justify-content-center mt-5 ">
                        <Button name="register" id='register' className="form-submit" sx={{ width: '30ch' }} variant="contained" onClick={PostData} startIcon={<LoginIcon fontSize='inherit' />} > Log In </Button>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6 logRightSide">
                    <img src={LoginImage} alt="img" />
                  </div>
                </div>


                {/* <ToastContainer /> */}


              </div>

            }

          </div>}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App;