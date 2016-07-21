import {Document, Schema, model}  from "mongoose";
import {Model} from "~mongoose/index";
import {User} from "../users/model";
import Promise = require("~mongoose~mpromise/index");




export interface Travel extends Document {
    from: string;
    to: string;
    date: Date;
    owner: User;
    passengers: Reservation[];
    placeLimit: number;
}

export interface Reservation extends Document {
    user: User;
    date: Date;
    travelType: ReservationType;
}

export type ReservationType = "IN" | "OUT"

const TravelSchema = new Schema({
    date: Date,
    from: String,
    owner: {ref: "User", type: Schema.Types.ObjectId},
    passengers: [{ref: "Reservation", type: Schema.Types.ObjectId}],
    placeLimit: Number,
    to: String,
});

const ReservationSchema = new Schema({
    date: Date,
    travelType: {enum: ["IN", "OUT"], type: String},
    user: [{ref: "User", type: Schema.Types.ObjectId}],
});

export const travelModel = model<Travel>("Travel", TravelSchema);

