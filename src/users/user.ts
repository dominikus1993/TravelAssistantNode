///<reference path="../../typings/index.d.ts"/>

import * as mongoose from "mongoose"

export interface User extends mongoose.Document {
    username:string;
    email:string;
    password:string;
}
