import React, { useState, useEffect } from 'react'
import Cards from './SubComponents/Cards';
import { Backdrop, Box, Modal } from '@mui/material'
import ReactECharts from 'echarts-for-react';
import { getCount } from "../Apis/apis"
import { getDashboardCount, getWorkingHours, getDashboardPending, changePassword, getAboutDetails } from "../Apis/apis"
import {Button, FormControl, InputLabel, InputAdornment, OutlinedInput, TextField, IconButton } from '@mui/material';
import Swal from 'sweetalert2'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Dashboard = () => {

  const [data, setData] = useState({})
  const [work, setWork] = useState([])
  const [openMM, setOpenMM] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const handleClose = () => {
    setOpen(false)
    setOpens(false)
    setOpenMM(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '550px',
    borderRadius: '13px',
    bgcolor: 'background.paper',
    borderLeft: '2px solid #000',
    borderBottom: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 14,
  };


  const styles = {
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


  const getDasboardTotal = async () => {
    const res = await getDashboardCount();
    // console.log(res.data);
    setData(res.data)
    const response = await getWorkingHours();
    // console.log(typeof(response.data));
    // console.log(response.data);
    setWork(response.data)

  }


  const arrayDept = work.map((curr, index) => {
    return {
      name: curr._id, records: curr.rounds[0], key: index
    }
  })
  let arrWorkHour = []
  // console.log(arrayDept)
  arrayDept.map((curr, index) => {

    var time = 0;
    curr.records.map((val, index) => {
      const data = val.workingHours.split(" ");
      const hours = data[0] * 60;
      const minutes = data[2];
      const total = parseInt(hours) + parseInt(minutes);
      time = time + total

    })
    // console.log(time);
    const obj = { name: curr.name, time: time / 60 + time % 60 }
    // console.log(obj);
    arrWorkHour.push(obj)

  })

  var name = []
  var values = []
  console.log(arrWorkHour);
  const colorPalette = ['#198754', '#dc3545', '#ffc107', '#0d6efd', '#f2ac08', '#f20866', '#08d7f2', '#93f208', '#f20856b8', '#7dc2a2', '#24c799']  // green red yellow blue

  arrWorkHour.map((curr, index) => {
    name.push(curr.name)
    values.push({
      value: curr.time,
      itemStyle: {
        color: colorPalette[index]
      }
    })
  })
  const clickNothing = () => {

  }

  const openWorkingHours = () => {
    console.log(120321);
    setOpen(true)
  }
  const openDeptLeave = () => {
    setOpens(true)
  }


  const DashboardCard = [
    {
      id: '1',
      num: data.employeeCount,
      heading: "Employees",
      para: "Total employees in the organisation",
      icon: "fa fa-users",
      click: clickNothing

    },
    {
      id: '2',
      num: data.totalDept,
      heading: "Department",
      para: "Total Department in the organisation",
      icon: "fa fa-building-o",
      click: openWorkingHours
    },
    {
      id: '3',
      num: data.totalPending,
      heading: "Pending Leave",
      para: "Leave applications pending for approval",
      icon: "fa fa-check-square-o",
      click: openDeptLeave
    },

  ]



  const [dept, setDept] = useState([]);
  const [leaveStat, setLeaveStat] = useState([]);
  const [totalLeave, setTotalLeave] = useState(0);


  const getCounts = async () => {
    const res = await getCount();
    setDept(res.data.employeeInDept)
    // console.log(res.data.statusLeaves);
    setLeaveStat(res.data.statusLeaves)
    setTotalLeave(res.data.value)

  }



  const deptObj = dept.map((item, index) => {
    return {
      name: item._id,
      value: item.count
    };
  });

  const leaveObj = leaveStat.map(item => {
    return {
      name: item._id,
      value: item.count
    };
  });

  leaveObj.push({ name: 'Total Leaves', value: totalLeave })

  // console.log(leaveObj);



  var x = [];
  var y = [];

  leaveObj.map((curr, i) => {
    x.push(curr.name)
    if (curr.name == "Accepted") {
      y.push({
        value: curr.value,
        itemStyle: {
          color: colorPalette[0]
        }
      })
    }
    else if (curr.name == "Rejected") {
      y.push({
        value: curr.value,
        itemStyle: {
          color: colorPalette[1]
        }
      })
    }
    else if (curr.name == "Pending") {
      y.push({
        value: curr.value,
        itemStyle: {
          color: colorPalette[2]
        }
      })
    }
    else {
      y.push({
        value: curr.value,
        itemStyle: {
          color: colorPalette[3]
        }
      })
    }
  })





  const leave = {
    legend: {
      bottom: '10%',
      left: '15%'
    },
    color: ['#00DDFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#00000'
        },
        animation: true
      }
    },
    xAxis: {
      type: 'category',
      data: x,
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        fontStyle: 'oblique',
        fontWeight: 500
      }
    },
    series: [
      {
        // name: 'Leave Chart',
        data: y,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };



  const department = {

    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '10%',
      left: '27%'
    },

    series: [
      {
        name: 'Department Chart',
        type: 'pie',
        radius: [50, 180],
        center: ['60%', '40%'],
        // roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: deptObj
      }
    ]
  };

  const dashWH = {
    legend: {
      bottom: '10%',
      left: '15%'
    },
    color: ['#00DDFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#00000'
        },
        animation: true
      }
    },
    xAxis: {
      type: 'category',
      data: name,
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        fontStyle: 'oblique',
        fontWeight: 500
      }
    },
    series: [
      {
        // name: 'Leave Chart',
        data: values,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  const [dashPending, setDashPending] = useState([])
  const getDashPending = async () => {
    const res = await getDashboardPending();
    console.log(res.data);
    setDashPending(res.data)
  }

  const dashPendingMap = dashPending.map((curr, index) => {
    var count = 0;
    // console.log(curr);
    curr.rounds.map((val, i) => {
      if (val === 'Pending') {
        count = count + 1;
      }
    })
    // console.log(curr);
    // console.log(curr._id);
    // console.log(count);
    return {
      name: curr._id,
      value: count
    }
  })

  var names = []
  var valuessMM = []

  dashPendingMap.map((curr, index) => {
    names.push(curr.name);
    valuessMM.push({
      value: curr.value,
      itemStyle: {
        color: colorPalette[index + 1]
      }
    })
  })

  const dashesPending = {
    legend: {
      bottom: '10%',
      left: '15%'
    },
    color: ['#00DDFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#00000'
        },
        animation: true
      }
    },
    xAxis: {
      type: 'category',
      data: names,
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        fontStyle: 'oblique',
        fontWeight: 500
      }
    },
    series: [
      {
        // name: 'Leave Chart',
        data: valuessMM,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };


  console.log(dashPendingMap);

  
  const handleOpen = () => setOpenMM(true);
  const [valMM, setvalMM] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConPassword: false
});
  
  const handleChange = (prop) => (e) => {
    setvalMM({
        ...valMM,
        [prop]: e.target.value
    })
}

const handleClickShowPassword = () => {
  setvalMM({
        ...valMM,
        showPassword: !valMM.showPassword,
    });
};
const handleClickShowConPassword = () => {
  setvalMM({
        ...valMM,
        showConPassword: !valMM.showConPassword,
    });
};

const [list, setList] = useState({})

const changeEmployeePassword = async () => {
  const res = await getAboutDetails();
  console.log(res.data);
  setList(res.data)
  console.log(54647);
  console.log('====================================');
  console.log(valMM.password);
  console.log(valMM.confirmPassword);
  console.log('====================================');
  if (valMM.password != valMM.confirmPassword) {
      Swal.fire({
          icon: 'error',
          title: "Error",
          text: "Password and Confirm password must be same"

      })
  }else if(valMM.password == '' || valMM.confirmPassword == ''){
    Swal.fire({
      icon: 'error',
      title: "Error",
      text: "Password and Confirm password cannot be empty"
  })
  }
   else {
      const data = {
          password: valMM.password,
          type: "Admin",
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

  setvalMM({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConPassword: false
});
  setOpenMM(false)
}

  useEffect(() => {
    getCounts();
    getDasboardTotal();
    getDashPending();
    // calculateWorkingHours();
  }, []);

  return (
    <>
      <div className="container main_div mt-5 nempMain justify-content-center" >

        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="dashTitle">
                  <span className="wel">Welcome,</span> <h3>{window.localStorage.getItem('name')}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <button className="changePass" onClick={handleOpen}>Change Password</button>
          </div>
        </div>


        <div className="row">

          {
            DashboardCard.map((currEle, ind) => {
              return (
                <div className="col-md-4">
                  <div className="card mt-2 mb-2" onClick={currEle.click} >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between">
                        <h2 className="card-title" style={{ fontSize: '50px' }} >{currEle.num}</h2>
                        <i className={currEle.icon} style={{ fontSize: '48px' }} ></i>
                      </div>
                      <h5 className="card-title">{currEle.heading}</h5>
                      <p className="card-text" style={{ fontSize: '12px' }}>{currEle.para}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="stopScroll mt-5">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <h2 className="moveRight">No of employees per department</h2>
          </div>
          <div className="col-sm-6 col-md-6">
            <h2 className="moveRights">Leave Statistics</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <ReactECharts option={department} style={{ height: '600px', width: '95%' }} />
          </div>
          <div className="col-sm-6 col-md-6">
            <ReactECharts option={leave} style={{ height: '500px', width: '95%' }} />
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
              Working Hours for department
            </h5>
            <hr />
            <ReactECharts option={dashWH} style={{ height: '450px', width: '100%' }} />
          </div>
        </Box>
      </Modal>
      <Modal
        open={opens}
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
              Working Hours for department
            </h5>
            <hr />
            <ReactECharts option={dashesPending} style={{ height: '450px', width: '100%' }} />
          </div>
        </Box>
      </Modal>

      <Modal
        open={openMM}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <div className="row mt-2 form-group justify-content-center d-flex">
            <label className="col-md-5 text-center mt-2  control-label"> Password : </label>
            <div className="col-md-7 ">

              <FormControl sx={{ width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput

                  id="outlined-adornment-password"
                  type={valMM.showPassword ? 'text' : 'password'}
                  value={valMM.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {valMM.showPassword ? <VisibilityOff /> : <Visibility />}
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
                  type={valMM.showConPassword ? 'text' : 'password'}
                  value={valMM.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConPassword}
                        edge="end"
                      >
                        {valMM.showConPassword ? <VisibilityOff /> : <Visibility />}
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

export default Dashboard;