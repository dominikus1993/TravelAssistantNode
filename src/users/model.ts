///<reference path="../../typings/index.d.ts"/>
import {Model} from "~mongoose/index";
import {Document, Schema, model}  from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
}

export interface LoginData extends Document {
    user: string;
    date: Date;
    expirationDate: Date;
}

const UsersSchema = new Schema({
    email: {index: {unique: true}, required: false, type: String},
    password: { required: true, type: String},
    username: { index: {unique: true}, required: true, type: String},
});

const SignInSchema = new Schema({
    date: Date,
    expirationDate : Date,
    user : {ref: "User", type: Schema.Types.ObjectId},
});

export const userModel = model<User>("User", UsersSchema);
export const loginDataModel = model<LoginData>("LoginData", SignInSchema);
