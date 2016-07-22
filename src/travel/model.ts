import {User} from "../users/model";
import {Document, Schema, model}  from "mongoose";

export interface Travel extends Document {
    from: string;
    to: string;
    date: Date;
    owner: User;
    placeLimit: number;
}

const TravelSchema = new Schema({
    date: Date,
    from: String,
    owner: {ref: "User", type: Schema.Types.ObjectId},
    placeLimit: Number,
    to: String,
});

export const travelModel = model<Travel>("Travel", TravelSchema);
