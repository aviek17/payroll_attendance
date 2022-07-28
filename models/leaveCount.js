const mongoose = require('mongoose');

const leaveCount = mongoose.Schema({
   empId : {
    type : String,
    required : true,
   }, 
   counts : []
},
{
    timestamps: true

})

const leaveCounts = new mongoose.model("LeaveCount",leaveCount);

module.exports = leaveCounts;