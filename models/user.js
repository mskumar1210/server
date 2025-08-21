const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type: String,
        default: "student"
    }

})

const UserModel = mongoose.model('user',UserSchema)   // (collection name , schema)
module.exports = UserModel