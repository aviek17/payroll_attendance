const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    }, 
    maxDays : {
        type : Number,
        required : true
    },
    daysTaken : {
        type : Number,
        required : true,
        default : 0
    }
},
{
    timestamps: true

})

const leavetype = new mongoose.model("LeaveType",leaveSchema);

module.exports = leavetype;