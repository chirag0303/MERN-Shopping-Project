const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            trim: true,
        },
        address:{
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["male","female"],
        },
        role: {
            type: String,
            enum: ["user","admin","super-admin"],
            default: "user",
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const userModel = model("User",userSchema);

modeule.exports = {userModel};