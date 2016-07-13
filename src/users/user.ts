///<reference path="../../typings/index.d.ts"/>
import {Document, Schema}  from "mongoose"
export interface User extends Document {
    username:string;
    email:string;
    password:string;
}

export const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});
