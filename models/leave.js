const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    dept : {
        type : String,
        required : true
    },
    empId : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    leaveType : {
        type : String,
        required : true
    },
    mode : {
        type : String,
        required : true
    },
    issuedFrom : {
        type: String,
        required: true,
       
    },
    issuedUpto : {
        type : String,
        required: true,
    },
    status : {
        type : String,
        required: true,
        default : "Pending"
    },
    description :{
        type : String,
        
    },
    reference : {
        type : String,
        default : "N/A",
    },
    emergency : {
        type : String,
    },
    fileName: {
        type: String,
        // required: true
    },
    filePath: {
        type: String,
        // required: true
    },
    fileType: {
        type: String,
        // required: true
    },
    fileSize: {
        type: String,
        // required: true
    }
},
{
    timestamps: true

})

const leave = new mongoose.model("Leave",leaveSchema);

module.exports = leave;