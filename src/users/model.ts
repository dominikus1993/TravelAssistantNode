///<reference path="../../typings/index.d.ts"/>
import {Document, Schema, model}  from "mongoose"
export interface User extends Document {
    username:string;
    email:string;
    password:string;
}

export interface LoginData extends Document{
    username : string;
    date : Date;
}

const UsersSchema = new Schema({
    username: String,
    email: String,
    password: String
});

const SignInSchema = new Schema({
   username : String,
   date : Date
});

export const userModel = model<User>("User", UsersSchema);
export const loginDataModel = model<LoginData>("LoginData", SignInSchema);