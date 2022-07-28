const mongoose = require ("mongoose");

const roleSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    description : {
        type : String
    },
    no_of_employee : {
        type : Number,
        default : 0
    },
    head_of_dept : {
        type : String,
        required : true,
    }
})


const Role = mongoose.model("Role",roleSchema);
module.exports = Role;