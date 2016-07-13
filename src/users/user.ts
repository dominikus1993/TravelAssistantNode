///<reference path="../../typings/index.d.ts"/>
import * as mongoose from "mongoose"

export interface User extends mongoose.Document {
    id?: string;
    username:string;
    email:string;
    password:string;
}
