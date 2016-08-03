import {Travel} from "../travel/model";
import {User} from "../users/model";
import {Document, Schema, model}  from "mongoose";

export interface Reservation extends Document {
    date: Date;
    travel: string | Travel;
    travelType: ReservationType;
    user: string | User;
}

export type ReservationType = "IN" | "OUT"

const ReservationSchema = new Schema({
    date: Date,
    travel: { ref: "Travel", type: Schema.Types.ObjectId },
    travelType: { enum: ["IN", "OUT"], type: String },
    user: { ref: "User", type: Schema.Types.ObjectId },
});

export const reservationModel = model<Reservation>("Reservation", ReservationSchema);
