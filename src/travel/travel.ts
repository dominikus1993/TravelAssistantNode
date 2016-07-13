///<reference path="../../typings/index.d.ts"/>

import {Document, Schema}  from "mongoose"
import {User} from "../users/user";


export interface Travel extends Document {
    from:string;
    to:string;
    date:Date;
    owner:User;
    passengers:Reservation[];
    placeLimit:number;
}

export interface Reservation extends Document {
    id?:string;
    user:User;
    date:Date;
    travelType:ReservationType;
}

export type ReservationType = "IN" | "OUT"

export const TravelSchema = new Schema({
    from: String,
    to: String,
    date: Date,
    owner: User,
    passengers: [{type: Schema.Types.ObjectId, ref: "Reservation"}],
    placeLimit: Number,
});

export const ReservationSchema = new Schema({
    id: String,
    user: [{type: Schema.Types.ObjectId, ref: "User"}],
    date: Date,
    travelType: {type: String, enum: ["IN", "OUT"]}
});
