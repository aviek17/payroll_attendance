import axios from "axios"

export const getLeaveTypes = async () => {
    const res = await axios.get("http://localhost:5000/allLeaveTypes",{ withCredentials: true })
    return res;
}

export const allEmployeeList = async () => {
    const res = await axios.get("http://localhost:5000/findEmployee",{ withCredentials: true })
    return res;
}

export const getAllLeaveList = async () => {
    const res = await axios.get("http://localhost:5000/allLeaves",{ withCredentials: true })
    return res;
}

export const updateSalary = async (data) => {
    const res = await axios.get("http://localhost:5000/updateSalary",data,{ withCredentials: true })
    return res;
}

export const singleEmployeeleaveDetails = async (id) => {
    const res = await axios.post("http://localhost:5000/singleEmployeeLeave", {
        _id : id
    },{ withCredentials: true })
    return res;
}

export const updateLeaveStatuses = async (data) => {
    // console.log(12345)
    const res = await axios.post("http://localhost:5000/updateLeaveStatus", data,{ withCredentials: true });
    // console.log(res)
    return res;
}

export const viewEmployeeLeaves = async(data) => {
    // console.log(data)
    const res = await axios.post("http://localhost:5000/sendEmployeeLeaveList", { 
        empId : data
    },{ withCredentials: true } )
    // console.log(res)
    return res
}


export const getCount = async () => {
  const res = await axios.get("http://localhost:5000/getCount",{ withCredentials: true });
//   console.log(res)
  return res;
}


export const employeeLeaveCalculator = async (data) => {
    const res = await axios.post("http://localhost:5000/employeeAttendanceStats", {
        empId : data
    },{ withCredentials: true })
    return res;
}


export const getLeaveStats = async (data) => {
    const res = await axios.post("http://localhost:5000/getEachLeaveStats", {
        empId : data
    },{ withCredentials: true })
    return res;
}


export const getSingleLeaveDetails = async(data) => {
    const res = await axios.post("http://localhost:5000/getSingleEmployeeLeave",{
        name : data
    },{ withCredentials: true } )

    return res;
}


export const getDashboardCount = async () => {
    const res = await axios.get("http://localhost:5000/dashboardCount",{ withCredentials: true });
    return res;
}

export const arrayDept= [];

export const getWorkingHours = async() => {
    const res = await axios.get("http://localhost:5000/totalWorkingHours",  { withCredentials: true } );
    // console.log(res.data)
    return res;
    
}


export const getDashboardPending = async () => {
    const res = await axios.get("http://localhost:5000/totalDeptLeaves",  { withCredentials: true } );
    // console.log(res.data)
    return res;
    
}
// console.log(arrayDept)

export const getEmployeeData = async (data) => {
    // console.log(data)
    const res = await axios.post("http://localhost:5000/employeeLeaveStatus", data , { withCredentials: true })
    // console.log(res.data);
    return (res.data)
}

export const singleEmployeeAttendance = async (data) => {
    const res = await axios.post("http://localhost:5000/singleLeave", data, { withCredentials: true });
    return (res.data)
}

export const getAboutDetails = async() => {
    const res = await axios.get('http://localhost:5000/about',{ withCredentials: true })
    return res;
}

export const goLogOut = async () =>{
    const res = await axios.get("http://localhost:5000/logout", { withCredentials: true })
    return res;
}


export const updateEmployeeProfile = async (data) => {
    // console.log(data)
    const res = await axios.post("http://localhost:5000/updateEmployee", data,  { withCredentials: true })
    return res;
}

export const changePassword = async (data) =>{
    const res = await axios.post("http://localhost:5000/editPassword" , data, { withCredentials: true })
    return res;
}