const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    streetAdd: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
    },
    marital: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    joinDate: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});




userSchema.pre('save', async function (next) {
    // console.log("Hi hello")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


// generating token

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save()
        return token;
    } catch (err) {
        //console.log(err)
    }
}


const User = mongoose.model('Registration', userSchema);

module.exports = User;
