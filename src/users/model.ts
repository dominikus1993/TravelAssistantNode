///<reference path="../../typings/index.d.ts"/>
import {Document, Schema, model}  from "mongoose"
export interface User extends Document {
    username:string;
    email:string;
    password:string;
}

const UsersSchema = new Schema({
    username: String,
    email: String,
    password: String
});

export const userModel = model("User", UsersSchema);