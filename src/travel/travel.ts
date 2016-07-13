///<reference path="../../typings/index.d.ts"/>

import * as mongoose from "mongoose"
import {User} from "../users/user";

export interface Travel extends mongoose.Document {
    from:string;
    to:string;
    date:Date;
    owner:User;
    passengers:Reservation[];
    placeLimit:number;
}

export interface Reservation extends mongoose.Document {
    user:User;
    date:Date;
    type:ReservationType;
}

export enum ReservationType{
    In,
    Out
}
