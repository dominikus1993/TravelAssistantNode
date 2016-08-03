import {User} from "../users/model";
import {Document, Schema, model}  from "mongoose";

export interface Travel extends Document {
    from: string;
    to: string;
    date: Date;
    owner: string | User;
    placeLimit: number;
}

const TravelSchema = new Schema({
    date: {required: true, type: Date},
    from: {required: true, type: String},
    owner: {ref: "User", required: true, type: Schema.Types.ObjectId},
    placeLimit: {required: true, type: Number},
    to: {required: true, type: String},
});

export const travelModel = model<Travel>("Travel", TravelSchema);
