///<reference path="../../typings/index.d.ts"/>
import {Document, Schema, model}  from "mongoose"
import {Model} from "~mongoose/index";

export interface User extends Document {
    username:string;
    email:string;
    password:string;
}

export interface LoginData extends Document {
    username:string;
    date:Date;
}

const UsersSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: false, index: {unique: true}},
    password: {type: String, required: true}
});

const SignInSchema = new Schema({
    username: String,
    date: Date,
    expirationDate : Date
});

export const userModel = model<User>("User", UsersSchema);
export const loginDataModel = model<LoginData>("LoginData", SignInSchema);