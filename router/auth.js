const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


require("../DB/connection")

const User = require("../models/user")
const Attendance = require("../models/attendance");
const Leave = require("../models/leave");
const Salary = require("../models/salary")
const Admin = require("../models/admin.js");
const Role = require("../models/department")
const LeaveType = require("../models/leaveTypes")
const LeaveCount = require("../models/leaveCount")
const { upload } = require("../helpers/filehelper");

const { connections } = require('mongoose');
const authenticate = require("../middleware/authenticate")

router.get('/any', (req, res) => {
    res.cookie("test", 'hello')
    res.send("router First Page");

})

// all Employees
router.get("/findEmployee", async (req, res) => {
    const Employee = await User.find({})
    res.send(Employee)
})

// find selected employee
router.post("/findSpecificEmployee", async (req, res) => {
    const { name, role } = req.body
    const first = name.split(" ")[0];
    const last = name.split(" ")[1];

    try {
        if (role == "") {
            const respond = await User.find({
                firstname: first,
                lastname: last
            })
            // //console.log(1)
            // //console.log(respond);
            res.send(respond)
        } else if (name == "") {
            const respond = await User.find({
                role: role
            })
            // //console.log(2)
            // //console.log(respond)
            res.send(respond)
        } else {
            const respond = await User.find({
                firstname: first,
                lastname: last,
                role: role
            })
            // //console.log(3)
            // //console.log(respond);
            res.send(respond)
        }
    } catch (error) {
        //console.log(error)
    }
})


// new Employee

router.post("/addEmployee", async (req, res) => {
    console.log('add emp')
    try {
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Noveber', 'December']
        const { firstname, lastname, streetAdd, city, state, zip, gender, birthday,
            email, mobile, phone, marital, education, employeeID,
            role, joinDate, employmentType, salary } = req.body;
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        let salaryMonth = monthArray[month] + "-" + year

        console.log(salaryMonth)

        //console.log(req.body)

        if (!firstname || !lastname || !streetAdd || !city || !state || !zip || !gender || !birthday ||
            !email || !mobile || !marital || !education || !employeeID ||
            !role || !joinDate || !employmentType) {
            return (res.json({ error: "Field here Required" }));
        }
        const response = await User.findOne({ employeeID: employeeID });
        if (response) {
            return (res.json({ error: "Employee ID must be different" }));
        }
        else {
            const password = "Password@123"
            // const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                firstname, lastname, streetAdd, city, state, zip, gender, birthday,
                email, mobile, phone, marital, education, employeeID,
                role, joinDate, employmentType, password, salary: salary
            })

            var perMon = salary / 12;
            perMon = perMon.toFixed(2);
            // console.log(perMon);
            var basic = Number((0.4 * perMon).toFixed(2));
            // console.log(basic);

            var hra = Number((0.2 * perMon).toFixed(2));
            // console.log(hra);
            var splAll = Number((0.17 * perMon).toFixed(2));
            // console.log(splAll);
            var pf = Number((0.08 * perMon).toFixed(2));
            // console.log(pf);
            var it = Number((0.05 * perMon).toFixed(2));
            // console.log(it);
            var grat = Number((0.05 * perMon).toFixed(2));
            // console.log(grat);
            var medIns = Number((0.05 * perMon).toFixed(2));
            // console.log(medIns);

            var grosstot = basic + hra + splAll - pf - it;

            const salaryAdd = new Salary({
                empId: employeeID,
                name: firstname + " " + lastname,
                dept: role,
                joinDate: joinDate,
                record: [
                    {
                        month: salaryMonth,
                        netSalary: salary,
                        monthlySalary: perMon,
                        basicSalary: basic,
                        hra: hra,
                        special: splAll,
                        pf: pf,
                        pt: it,
                        gratuity: grat,
                        medicalIns: medIns,
                        gross: grosstot
                    }
                ]

            })
            console.log(salaryAdd)

            const userSave = await user.save()
            const salaryResponse = await salaryAdd.save()


            const roleEdit = await Role.updateOne({ name: role }, {
                $inc: {
                    no_of_employee: 1
                }
            })
            const getLeaveTypes = await LeaveType.find({})
            //console.log(getLeaveTypes);
            const addEmployeeCount = new LeaveCount({
                empId: employeeID,
                counts: getLeaveTypes
            })

            const show = await addEmployeeCount.save();


            //console.log("response ", show);

            if (userSave && roleEdit && salaryResponse) {
                return res.status(201).json({ message: "Added Successfully" })
            } else {
                return res.json({ error: "Failed to register" })
            }
        }

    } catch (error) {
        console.log(error)
    }
})

// new admin
router.post("/addAdmin", async (req, res) => {
    try {
        const { name, email, id, role, password, conpassword } = req.body;
        //console.log(req.body)
        if (password !== conpassword) {
            return res.json({ message: "Password and Confirm Password must be same" })
        } else {
            const response = new Admin({
                name: name, email: email, adminId: id,
                role: role, password: password
            });
            //console.log("3",response)
            const admin = await response.save();
            //console.log("2",admin);
            if (admin) {
                return res.status(201).json({ message: "Added Successfully" })
            } else {
                return res.json({ message: "Failed to register" })
            }
        }
    } catch (err) {

    }
})

// single employee

router.post("/empInfo", async (req, res) => {
    const { id } = req.body;
    try {
        const response = await User.findOne({ _id: id })
        res.send(response)
    } catch (error) {
        //console.log(error)
    }
})


// login

router.post("/login", async (req, res) => {

    try {
        const { type, employeeId, password } = req.body;


        console.log(req.body)
        if (!employeeId || !password) {
            return (res.json({ error: "Field Required" }));
        }

        if (type === "Employee") {
            //console.log(450000000);
            const response = await User.findOne({ employeeID: employeeId });

            if (response) {
                const isMatch = await bcrypt.compare(password, response.password);

                if (isMatch) {
                    const token = await response.generateAuthToken();
                    //console.log(token);
                    res.cookie("lmstoken", token, {
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true
                    })
                    return res.status(201).json({ message: "success", response: response })
                } else {
                    //console.log(1234)
                    return (res.json({ error: "Invalid Details1" }));   //.status(422)
                    // return res.status(201).json({ message: " success" })    
                }
            } else {
                return (res.json({ error: "Invalid Details1" }));
            }

        } else if (type === "Admin") {
            console.log(1000000000);
            if (employeeId == "Ad71502") {
                if (password == "Anamika@123") {
                    const response = { name: 'Anamika Sen', adminId: 'Ad71502', role: 'system admin' }
                    return res.status(201).json({ message: "success", response: response })
                } else {
                    return (res.json({ error: "Invalid Details1" }));
                }
            } else {
                const response = await Admin.findOne({ adminId: employeeId });
                console.log(response);

                if (response) {
                    const isMatch = await bcrypt.compare(password, response.password);

                    if (isMatch) {
                        const token = await response.generateAuthToken();
                        console.log("here token", token);
                        res.cookie("lmstoken", token, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                        })
                        return res.status(201).json({ message: "success", response: response })

                    } else {
                        console.log(1234)
                        return (res.json({ error: "Invalid Details1" }));   //.status(422)
                        // return res.status(201).json({ message: " success" })    
                    }
                } else {
                    return (res.json({ error: "Invalid Details1" }));
                }
            }
        }


    } catch (err) {
        console.log(err)
    }
})

// update Employee

router.post("/updateEmployee", async (req, res) => {
    try {
        const {
            _id, email, mobile, phone, marital, education, } = req.body;
        //console.log(req.body);

        const respond = await User.updateOne({ _id: _id },
            {
                $set: {
                    email: email,
                    mobile: mobile,
                    phone: phone,
                    marital: marital,
                    education: education,

                }
            })

        res.send(respond);

    } catch (err) {
        //console.log(err)
    }
})


// update role
router.post("/updateAdminRole", async (req, res) => {
    try {
        const { _id, name, email, role } = req.body;
        const respond = await Admin.updateOne({ _id: _id }, {
            $set: {
                role: role
            }
        })
        res.send(respond);

    } catch (err) {
        //console.log(err)
    }
})

router.post("/updateUserRole", async (req, res) => {
    //console.log(req.body);
    try {
        const { _id, role } = req.body;
        const respond = await User.updateOne({ _id: _id }, {
            $set: {
                role: role
            }
        })
        //console.log(respond);
        res.send(respond);
        // //console.log(req.body);

    } catch (err) {
        //console.log(err)
    }
})

// delete employee
router.post("/deleteUser", async (req, res) => {
    const { _id } = req.body;
    //console.log(_id);
    const respond = await User.deleteOne({ _id: _id })
    //console.log(respond);
    res.send(respond)
})


// add attendance

const dayIndex = new Date().getUTCDay()
//console.log(dayIndex);
const getDayName = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

router.post("/addAttendance", async (req, res) => {
    const { name, date, time_in, time_out } = req.body;
    console.log(req.body);
    try {
        //console.log(time_in);
        //console.log(time_out);
        if (!time_in || !time_out || time_in == 'null' || time_out == 'null') {
            return res.status(202).json({ message: "Cannot add attendance" })
        }
        else {
            const [hoursin, minutein] = time_in.split(':');
            const [hoursout, minuteout] = time_out.split(':');

            const findEmployee = await Attendance.findOne({ name: name });
            //console.log(findEmployee)
            if (!findEmployee) {
                console.log(21456);
                const hours = hoursout - hoursin
                const minute = minuteout - minutein
                const workingHour = hours + " hours " + minute + " minutes"
                const dayName = getDayName(dayIndex)
                //console.log(dayName);
                const response = await new Attendance({
                    name: name,
                    dept: req.body.dept,
                    empId: req.body.empId,
                    records: [
                        {

                            day: dayName,
                            date: date,
                            time_in: time_in,
                            time_out: time_out,
                            workingHours: workingHour
                        }
                    ]
                });
                const attendance = await response.save();

                if (attendance) {
                    return res.status(201).json({ message: "Attendance Recorded Successfully" })
                } else {
                    return res.send({ message: "Attendance failed to record" })
                }
            } else {
                console.log(5555)
                const hours = hoursout - hoursin
                //console.log(hours);
                const minute = minuteout - minutein
                //console.log(minute);
                const workingHour = hours + " hours " + minute + " minutes"
                const dayName = getDayName(dayIndex)
                //console.log(dayName);
                var data = {

                    day: dayName,
                    date: date,
                    time_in: time_in,
                    time_out: time_out,
                    workingHours: workingHour
                }

                const response = await findEmployee.newAttendance(data)
                //console.log(response);
                if (response) {
                    return res.status(201).json({ message: "Attendance Recorded Successfully" })
                }

            }

        }

    } catch (err) {
        console.log(err);
    }

})

// employee list for Attendance

router.get("/viewAttendanceList", async (req, res) => {
    Attendance.find({}, (error, response) => {
        if (error) {
            //console.log(error)
        }
        // //console.log({name : response.name, records : response.records});
        res.send(response)
    })
})



// add role
router.post("/addRole", async (req, res) => {
    const { name, description, head } = req.body;
    // //console.log(req.body);
    try {
        //console.log(25);
        const response = new Role({
            name: name,
            description: description,
            no_of_employee: 0,
            head_of_dept: head

        })
        //console.log(28);
        //console.log(response);

        const role = await response.save();
        //console.log(29);
        //console.log(role);

        if (role) {
            return res.json({ message: "New role added" })
        } else {
            return res.json({ error: "Role cannot be added" })
        }

    } catch (error) {

    }
})

// edit Role


router.post("/editRole", async (req, res) => {
    const { name, description, head } = req.body;

    try {
        if (description && head) {
            const response = await Role.updateOne({ name: name }, {
                $set: {
                    description: description,
                    head_of_dept: head
                }
            })
            res.send(response)
        } else if (!head && description) {
            const response = await Role.updateOne({ name: name }, {
                $set: {
                    description: description,

                }
            })
            res.send(response)
        } else if (!description && head) {
            const response = await Role.updateOne({ name: name }, {
                $set: {

                    head_of_dept: head
                }
            })
            res.send(response)
        } else {
            res.send({ message: "Nothing Updated" })
        }

    } catch (error) {
        //console.log(error)
    }
})


// get all roles
router.get("/getAllRoles", async (req, res) => {
    try {
        const response = await Role.find({});
        //console.log(548);
        //console.log(response)
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// dept employee name
router.post("/getRoleEmployeeName", async (req, res) => {
    try {
        const { name } = req.body;
        const response = await User.find({ role: name })
        res.send(response);
    } catch (error) {
        //console.log(error);
    }
})

// employee attendance

router.post("/viewEmployeeAttendance", async (req, res) => {
    const { name } = req.body;
    //console.log(556);
    //console.log(name);

    Attendance.find({ name: name }, (error, response) => {
        if (error) {
            //console.log(error)
        }
        res.send(response)
    })
})


// update salary

router.post("/updateSalary", async (req, res) => {

    try {
        const { id, empId, salary } = req.body;
        console.log(req.body)
        const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Noveber', 'December']
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        let salaryMonth = monthArray[month] + "-" + year

        var perMon = salary / 12;
        perMon = perMon.toFixed(2);
        // console.log(perMon);
        var basic = Number((0.4 * perMon).toFixed(2));
        // console.log(basic);

        var hra = Number((0.2 * perMon).toFixed(2));
        // console.log(hra);
        var splAll = Number((0.17 * perMon).toFixed(2));
        // console.log(splAll);
        var pf = Number((0.08 * perMon).toFixed(2));
        // console.log(pf);
        var it = Number((0.05 * perMon).toFixed(2));
        // console.log(it);
        var grat = Number((0.05 * perMon).toFixed(2));
        // console.log(grat);
        var medIns = Number((0.05 * perMon).toFixed(2));
        // console.log(medIns);

        var grosstot = basic + hra + splAll - pf - it;
        const findEmp = await Salary.findOne({ empId: empId })
        var record = {
            month: salaryMonth,
            netSalary: salary,
            monthlySalary: perMon,
            basicSalary: basic,
            hra: hra,
            special: splAll,
            pf: pf,
            pt: it,
            gratuity: grat,
            medicalIns: medIns,
            gross: grosstot
        }
        console.log(findEmp.record)
        let check = false
        findEmp.record.map((curr) => {
            if (curr.month == salaryMonth) {
                check = true
            }
        })
        let response;
        if (check == false) {
            response = await findEmp.newSalary(record)
        } else {
            response = await Salary.updateMany({ empId: empId, "record.month": salaryMonth },
                {
                    $set: {
                        "record.$.netSalary": salary,
                        "record.$.monthlySalary": perMon,
                        "record.$.basicSalary": basic,
                        "record.$.hra": hra,
                        "record.$.special": splAll,
                        "record.$.pf": pf,
                        "record.$.pt": it,
                        "record.$.gratuity": grat,
                        "record.$.medicalIns": medIns,
                        "record.$.gross": grosstot
                    }
                })
        }

        const respond = await User.updateOne({ _id: id }, {
            $set: {
                salary: salary
            }
        })
        if (respond && response) {
            res.send(respond)
        }
    } catch (error) {
        console.log(error);
    }

})

// const upateLeaveCount = await LeaveCount.updateMany({ empId: req.body.empId, "counts.name": req.body.leaveType },
// {
//     $set: {
//         "counts.$.daysTaken": dataValue[0].daysTaken + noOFDays
//     }
// })


// new leave

router.post("/addLeave", async (req, res) => {
    const { name, description, maxDays } = req.body;
    //console.log(req.body);
    try {
        const response = new LeaveType({
            name: name,
            description: description,
            maxDays: maxDays
        })

        const responseData = await response.save();
        //console.log(responseData);
        res.send(responseData)
        const updateResponse = await LeaveCount.updateMany({}, {
            $push: {
                count: responseData
            }
        })
        //console.log(updateResponse);

    } catch (err) {

    }
})



// update leaveTypes

router.post("/updateLeaveTypes", async (req, res) => {
    try {
        const { _id, description, maxDays } = req.body;
        //console.log(req.body);
        const response = await LeaveType.updateOne({ _id: _id }, {
            $set: {
                description: description,
                maxDays: maxDays
            }
        })
        res.send(response)

    } catch (err) {

    }
})


// delete leave types

router.post("/deleteLeavetype", async (req, res) => {
    try {
        const { _id, name } = req.body;
        const response = await LeaveType.deleteOne({ _id: _id })
        res.send(response)
        const deleteLeaveCount = await LeaveCount.updateMany({}, {
            $pull: {
                count: {
                    name: name
                }
            }
        })
        //console.log(deleteLeaveCount);
    } catch (error) {
        //console.log(error);
    }
})


// find all leaves

router.get("/allLeaveTypes", async (req, res) => {
    const response = await LeaveType.find({})
    res.send(response)
})


// Employee Leave Application
const noOfDays = (a, b) => {

    const day1 = new Date(a)
    const day2 = new Date(b)

    //console.log(day1);
    //console.log(day2);
    var total_seconds = Math.abs(day2 - day1) / 1000;
    var days_difference = Math.floor(total_seconds / (60 * 60 * 24));

    //console.log(days_difference);
    return days_difference;
}

// New Leave Applications
router.post("/addNewLeave", upload.single("file"), async (req, res, next) => {

    try {
        // //console.log(req.body);
        // //console.log(req.file);
        const date = new Date()
        //console.log(date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate())

        if (req.file) {
            data = {
                date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
                name: req.body.name,
                leaveType: req.body.leaveType,
                dept: req.body.dept,
                mode: req.body.mode,
                issuedFrom: req.body.startDate,
                issuedUpto: req.body.endDate,
                empId: req.body.empId,
                description: req.body.reason,
                reference: req.body.reference,
                emergency: req.body.emergency,
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
            }
        } else {
            data = {
                date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
                name: req.body.name,
                leaveType: req.body.leaveType,
                dept: req.body.dept,
                mode: req.body.mode,
                empId: req.body.empId,
                issuedFrom: (req.body.startDate).substring(0, 10),
                issuedUpto: (req.body.endDate).substring(0, 10),
                description: req.body.reason,
                reference: req.body.reference,
                emergency: req.body.emergency,
            }
        }

        const noOFDays = noOfDays(req.body.startDate, req.body.endDate)
        const leaveNo = await LeaveCount.findOne({ empId: req.body.empId })
        //console.log("here", leaveNo.counts);
        const dataValue = leaveNo.counts.filter(obj => { return obj.name === req.body.leaveType })
        //console.log("give me ", dataValue[0].daysTaken);
        const upateLeaveCount = await LeaveCount.updateMany({ empId: req.body.empId, "counts.name": req.body.leaveType },
            {
                $set: {
                    "counts.$.daysTaken": dataValue[0].daysTaken + noOFDays
                }
            })


        const response = new Leave(data);
        const saveRes = await response.save();

        //console.log("here", upateLeaveCount);

        res.send({ message: "Applied for leave" })

        // //console.log(saveRes);

    } catch (err) {
        //console.log(254);
        //console.log(err);
    }
})


//File Size
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

// Single Employee Leave
router.post("/singleEmployeeLeave", async (req, res) => {
    try {
        const { _id } = req.body;
        const response = await Leave.find({ _id: _id })
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// update leave status
router.post("/updateLeaveStatus", async (req, res) => {
    try {
        const { _id, status } = req.body;
        const response = await Leave.updateOne({ _id: _id }, {
            $set: {
                status: status
            }
        })
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// All Leaves
router.get("/allLeaves", async (req, res) => {
    const response = await Leave.find({})
    //console.log(response);
    res.send(response)
})


// single employee leave list

router.post("/sendEmployeeLeaveList", async (req, res) => {
    const { empId } = req.body;
    try {
        const response = await Leave.find({ empId: empId });
        //console.log(response);
        res.send(response);
    } catch (error) {
        //console.log(error);
    }
})

// Count all fields
router.get("/getCount", async (req, res) => {
    const employeeInDept = await User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ])

    const statusLeaves = await Leave.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ])

    const totalLeaveApplication = await Leave.find({}).count()

    //console.log(totalLeaveApplication);
    res.json({ value: totalLeaveApplication, employeeInDept: employeeInDept, statusLeaves: statusLeaves })
})




router.post("/employeeAttendanceStats", async (req, res) => {
    try {
        // const response = await Attendance.findOne({_id : '62ae21c06743c3baf3fadcfc'})
        const response = await Attendance.aggregate([
            { $match: { empId: req.body.empId } },
            { $unwind: "$records" },
            { $group: { "_id": "$records.day", "value": { $sum: 1 } } }
        ])
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})


// get single employee leave informations
router.post("/getSingleEmployeeLeave", async (req, res) => {
    try {
        const response = await Leave.find({ name: req.body.name })
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// get single Leave stats
router.post("/getEachLeaveStats", async (req, res) => {
    try {
        const response = await Leave.aggregate([
            { $match: { empId: req.body.empId } },
            { $group: { "_id": "$status", "value": { $sum: 1 } } }
        ])

        const totalCount = await Leave.aggregate([
            { $match: { empId: req.body.empId } }
        ])
        //console.log(response);
        res.json({ stats: response, total: totalCount })
    } catch (error) {
        console.log(error);
    }
})


router.post("/getSingleEmployeeLeave", async (req, res) => {
    try {
        const response = await Leave.find({ name: req.body.name })
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})


router.get("/dashboardCount", async (req, res) => {
    try {
        const totalEmployee = await User.find({}).count()
        const totalDept = await Role.find({}).count()
        const totalPending = await Leave.find({ status: "Pending" }).count()
        //console.log(totalEmployee);
        res.json({ employeeCount: totalEmployee, totalDept: totalDept, totalPending: totalPending })
    } catch (error) {
        //console.log(error);
    }
})


// group working hours
router.get("/totalWorkingHours", async (req, res) => {
    try {
        const response = await Attendance.aggregate([
            { $group: { _id: "$dept", total: { $sum: 1 }, rounds: { $push: "$records" } } }
        ])
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// get dept wise leaves
router.get("/totalDeptLeaves", async (req, res) => {
    try {
        const response = await Leave.aggregate([
            { $group: { _id: "$dept", total: { $sum: 1 }, rounds: { $push: "$status" } } }
        ])
        //console.log(response);
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})


router.post("/employeeLeaveStatus", async (req, res) => {
    //console.log(req.body);
    try {
        const response = await Leave.find({ empId: req.body.empId })
        const responseBalance = await Leave.aggregate([
            { $match: { empId: req.body.empId } },
            { $group: { "_id": "$status", "value": { $sum: 1 } } }
        ])
        const balanceStatus = await LeaveCount.find({ empId: req.body.empId })
        res.json({ employeeLeave: response, leftBalance: responseBalance, balanceStats: balanceStatus })

    } catch (error) {
        //console.log(error);
    }
})

router.post("/singleLeave", async (req, res) => {
    try {
        const response = await Attendance.findOne({ empId: req.body.empId });
        res.send(response)
    } catch (error) {
        //console.log(error);
    }
})

// change password
router.post("/editPassword", async (req, res) => {
    try {
        const { _id, password, type } = req.body;
        // type = 'Employee'
        if (type === "Employee") {
            const hashedPassword = await bcrypt.hash(password, 12);
            const response = await User.updateOne({ _id: _id }, {
                $set: {
                    password: hashedPassword
                }
            })
            //console.log(response);
            res.send(response)
        } else if (type === "Admin") {
            const hashedPassword = await bcrypt.hash(password, 12);
            const response = await Admin.updateOne({ _id: _id }, {
                $set: {
                    password: hashedPassword
                }
            })
            //console.log(response);
            res.send(response)
        }
    } catch (error) {
        //console.log(error);
    }
})


// about us 
router.get("/about", authenticate, async (req, res) => {
    res.send(req.rootUser)
})


router.get("/logout", (req, res) => {
    res.clearCookie("lmstoken", { path: '/' })
    res.send({ message: "Logged out Successfully" })
})

module.exports = router;