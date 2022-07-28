const mongoose = require('mongoose');


const attendanceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    empId : {
        type: String,
        required: true,
        
    },
    dept : {
        type: String,
        required: true,
    },
    records : [
        {
            day :{
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true,
            },
            time_in: {
                type: String,
                required: true
            },
            time_out: {
                type: String,
                required:true
            },
            workingHours : {
                type: String,
                required:true
            }
        }
    ]
},
{
    timestamps: true

});


attendanceSchema.methods.newAttendance = async function(data){
    //console.log(data);
   try {
        this.records = this.records.concat(data)
        await this.save();
        //console.log(this.records);
        return data;
   } catch (error) {
        //console.log(error)
   }
}

const Attendance = mongoose.model('Attendance',attendanceSchema);


module.exports = Attendance;