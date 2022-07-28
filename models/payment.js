const mongoose = require('mongoose');

const leaveSettingSchema = mongoose.Schema({
   leaveType : { 
       type : String,
       max_days : Number
   }
},
{
    timestamps: true

})

const leave = new mongoose.model("Leave Setting",leaveSettingSchema);

module.exports = leave;