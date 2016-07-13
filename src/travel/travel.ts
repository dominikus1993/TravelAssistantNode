///<reference path="../../typings/index.d.ts"/>

import {Document, Schema, model}  from "mongoose"
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
    user:User;
    date:Date;
    travelType:ReservationType;
}

export type ReservationType = "IN" | "OUT"

const TravelSchema = new Schema({
    from: String,
    to: String,
    date: Date,
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    passengers: [{type: Schema.Types.ObjectId, ref: "Reservation"}],
    placeLimit: Number,
});

const ReservationSchema = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: "User"}],
    date: Date,
    travelType: {type: String, enum: ["IN", "OUT"]}
});

const UsersSchema = new Schema({
    username: String,
    email: String,
    password: String
});

const travelModel = model("Travel", ReservationSchema);

export class TravelRepository{

}
