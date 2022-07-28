const mongoose = require('mongoose');

const salary = mongoose.Schema({
    empId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    joinDate: {
        type: String,
        required: true,
    },
    record: [
        {
            month: {
                type: String,
                required: true,
            },
            netSalary: {
                type: Number,
                required: true,
            },
            monthlySalary: {
                type: Number,
                required: true,
            },
            basicSalary: {
                type: Number,
                required: true,
            },
            hra: {
                type: Number,
                required: true,
            },
            special: {
                type: Number,
                required: true,
            },
            pf: {
                type: Number,
                required: true,
            },
            pt: {
                type: Number,
                required: true,
            },
            gratuity: {
                type: Number,
                required: true,
            },
            medicalIns: {
                type: Number,
                required: true,
            },
            gross: {
                type: Number,
                required: true,
            }
        }
    ]
},
{
    timestamps: true

})


salary.methods.newSalary = async function(data){
    //console.log(data);
   try {
        this.record = this.record.concat(data)
        await this.save();
        //console.log(this.records);
        return data;
   } catch (error) {
        console.log(error)
   }
}



const salaryInfo = new mongoose.model("Salary", salary);

module.exports = salaryInfo;