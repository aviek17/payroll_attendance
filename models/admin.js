const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
 
const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    adminId : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

adminSchema.pre('save', async function (next) {

    // console.log("Hi hello")
    if (this.isModified('password')) {
        // console.log("first")
        this.password = await bcrypt.hash(this.password, 12);
        // console.log(this.password);
    }
    // console.log("object");
    next();
})


// generating token

adminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save()
        return token;
    } catch (err) {
        console.log(err)
    }
}


const Admin = mongoose.model("AdminList",adminSchema);
module.exports = Admin;